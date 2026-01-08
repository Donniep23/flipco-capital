import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get Resend instance
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
}

const EMAIL_CONFIG = {
  fromEmail: process.env.FROM_EMAIL || 'noreply@flipcocapital.com',
};

// GET - Fetch all investor applications
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('investor_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error: any) {
    console.error('Error fetching investors:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT - Update investor status (approve/reject)
export async function PUT(request: NextRequest) {
  try {
    const { investor_id, status, send_notification } = await request.json();

    if (!investor_id || !status) {
      return NextResponse.json(
        { success: false, error: "Investor ID and status are required" },
        { status: 400 }
      );
    }

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get investor details first
    const { data: investor, error: fetchError } = await supabase
      .from('investor_users')
      .select('*')
      .eq('investor_id', investor_id)
      .single();

    if (fetchError || !investor) {
      return NextResponse.json(
        { success: false, error: "Investor not found" },
        { status: 404 }
      );
    }

    // Update status
    const { error: updateError } = await supabase
      .from('investor_users')
      .update({
        status: status,
        updated_at: new Date().toISOString()
      })
      .eq('investor_id', investor_id);

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    // Send notification email if requested
    if (send_notification && investor.email) {
      try {
        const isApproved = status === 'approved';
        const emailHtml = isApproved ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Flipco Capital Account is Approved!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Welcome to Flipco Capital!</h1>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear ${investor.name},</p>
    <p>Great news! Your investor account has been <strong style="color: #16a34a;">approved</strong>.</p>
    <p>You can now log in to your investor dashboard to:</p>
    <ul>
      <li>View current investment opportunities</li>
      <li>Track your portfolio performance</li>
      <li>Access project updates and reports</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://same-zbf9n8rlt2m-latest.netlify.app/login"
         style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
        Login to Your Dashboard
      </a>
    </div>
    <p>If you have any questions, please don't hesitate to reach out to our team.</p>
    <p>Best regards,<br>The Flipco Capital Team</p>
  </div>
</body>
</html>
        ` : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Flipco Capital Application Update</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #64748b; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Application Update</h1>
  </div>
  <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Dear ${investor.name},</p>
    <p>Thank you for your interest in Flipco Capital.</p>
    <p>After careful review, we regret to inform you that we are unable to approve your investor application at this time.</p>
    <p>This decision may be based on various factors including investment criteria alignment or current capacity constraints.</p>
    <p>If you believe this decision was made in error or would like to discuss further, please contact us at invest@flipcocapital.com.</p>
    <p>Best regards,<br>The Flipco Capital Team</p>
  </div>
</body>
</html>
        `;

        await getResendClient().emails.send({
          from: EMAIL_CONFIG.fromEmail,
          to: investor.email,
          subject: isApproved
            ? '✅ Your Flipco Capital Account is Approved!'
            : 'Flipco Capital Application Update',
          html: emailHtml,
        });

        console.log(`📧 ${status} notification sent to ${investor.email}`);
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: `Investor ${status} successfully`,
      investor_id: investor_id,
      new_status: status
    });

  } catch (error: any) {
    console.error('Error updating investor:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
