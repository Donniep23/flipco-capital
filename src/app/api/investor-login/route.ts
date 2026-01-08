import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Look up investor by email
    const { data: investor, error } = await supabase
      .from('investor_users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (error || !investor) {
      return NextResponse.json({
        success: false,
        error: "No account found with this email address. Please register first.",
        status: "not_found"
      }, { status: 401 });
    }

    // Check password (simple base64 comparison for demo - use proper hashing in production)
    const storedPassword = investor.password_hash ? Buffer.from(investor.password_hash, 'base64').toString() : '';
    if (storedPassword !== password) {
      return NextResponse.json({
        success: false,
        error: "Invalid password. Please try again.",
        status: "invalid_password"
      }, { status: 401 });
    }

    // Check approval status
    if (investor.status === 'pending') {
      return NextResponse.json({
        success: false,
        error: "Your application is still under review. You'll receive an email once approved.",
        status: "pending",
        details: {
          name: investor.name,
          email: investor.email,
          appliedDate: investor.created_at
        }
      }, { status: 403 });
    }

    if (investor.status === 'rejected') {
      return NextResponse.json({
        success: false,
        error: "Your application was not approved. Please contact us for more information.",
        status: "rejected"
      }, { status: 403 });
    }

    if (investor.status !== 'approved') {
      return NextResponse.json({
        success: false,
        error: "Your account status is unknown. Please contact support.",
        status: "unknown"
      }, { status: 403 });
    }

    // Approved! Return success with investor data
    return NextResponse.json({
      success: true,
      message: "Login successful",
      status: "approved",
      investor: {
        id: investor.investor_id,
        name: investor.name,
        email: investor.email,
        company: investor.company,
        investmentAmount: investor.investment_amount
      }
    });

  } catch (error) {
    console.error("Investor login error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}
