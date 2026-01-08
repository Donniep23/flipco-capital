import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
export async function POST(request: NextRequest) {
  // Initialize Resend inside the function to avoid build-time errors
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
  try {
    const { contractor, credentials } = await request.json();
    // Validate input
    if (!contractor || !credentials) {
      return NextResponse.json(
        { success: false, error: "Missing contractor or credentials data" },
        { status: 400 }
      );
    }
    // Determine contact method (email or SMS simulation)
    const hasEmail = contractor.email && contractor.email.trim() !== "";
    if (hasEmail) {
      // Send email with credentials
      const emailResult = await sendCredentialsEmail(contractor, credentials);
      if (emailResult.success) {
        console.log(`📧 Contractor credentials sent via email to ${contractor.firstName} ${contractor.lastName}`);
        return NextResponse.json({
          success: true,
          method: "email",
          message: "Credentials sent via email successfully",
          details: {
            contractorName: `${contractor.firstName} ${contractor.lastName}`,
            email: contractor.email,
            credentials: credentials,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        throw new Error("Email sending failed");
      }
    } else {
      // Log for SMS/phone follow-up (in real app, you'd integrate with SMS service)
      console.log(`📱 SMS/Phone follow-up needed for ${contractor.firstName} ${contractor.lastName} at ${contractor.phone}`);
      console.log(`Credentials: ${credentials.username} / ${credentials.password}`);
      return NextResponse.json({
        success: true,
        method: "phone",
        message: "No email provided - phone follow-up required",
        details: {
          contractorName: `${contractor.firstName} ${contractor.lastName}`,
          phone: contractor.phone,
          credentials: credentials,
          timestamp: new Date().toISOString(),
          action: "Call or text contractor with login details"
        }
      });
    }
  } catch (error) {
    console.error("❌ Error sending contractor credentials:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send credentials",
        details: {
          timestamp: new Date().toISOString(),
          errorType: error instanceof Error ? error.name : 'Unknown'
        }
      },
      { status: 500 }
    );
  }
}
interface ContractorInfo {
  firstName: string;
  lastName: string;
  email: string;
  idVerified: boolean;
}
interface CredentialsInfo {
  username: string;
  tempPassword: string;
}
async function sendCredentialsEmail(contractor: ContractorInfo, credentials: CredentialsInfo) {
  // Initialize Resend client for this function
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

  try {
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Flipco Capital Team</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 40px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
    .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 16px; }
    .content { padding: 40px 30px; }
    .credentials-box { background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center; }
    .credentials-box h3 { color: #065f46; margin-top: 0; font-size: 20px; }
    .credential-item { background: white; border: 2px solid #10b981; border-radius: 6px; padding: 15px; margin: 15px 0; }
    .credential-label { font-weight: bold; color: #047857; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .credential-value { font-size: 18px; font-weight: bold; color: #065f46; font-family: monospace; }
    .next-steps { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 25px; margin: 30px 0; }
    .step { display: flex; align-items: flex-start; margin-bottom: 15px; }
    .step-number { background: #059669; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; margin-right: 15px; flex-shrink: 0; }
    .important-note { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 20px; margin: 25px 0; }
    .footer { background: #1e293b; color: white; padding: 25px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to the Team!</h1>
      <p>Your application has been approved</p>
    </div>
    <div class="content">
      <p style="font-size: 18px; margin-bottom: 25px;">
        Congratulations ${contractor.firstName}! Your application to work with Flipco Capital has been approved.
      </p>
      <div class="credentials-box">
        <h3>🔐 Your Temporary Login Credentials</h3>
        <p style="margin-bottom: 20px;">Use these to access your contractor portal:</p>
        <div class="credential-item">
          <div class="credential-label">Username</div>
          <div class="credential-value">${credentials.username}</div>
        </div>
        <div class="credential-item">
          <div class="credential-label">Temporary Password</div>
          <div class="credential-value">${credentials.tempPassword}</div>
        </div>
      </div>
      <div class="next-steps">
        <h3 style="color: #0c4a6e; margin-top: 0;">📋 Next Steps</h3>
        <div class="step">
          <div class="step-number">1</div>
          <div>
            <strong>Login to your portal:</strong> Visit the contractor login page and use your temporary credentials above.
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div>
            <strong>Change your password:</strong> You'll be required to create your own username and password on first login.
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div>
            <strong>Complete your profile:</strong> Add any additional information and preferences.
          </div>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <div>
            <strong>Wait for assignments:</strong> We'll contact you when work opportunities become available.
          </div>
        </div>
      </div>
      <div class="important-note">
        <h3 style="color: #92400e; margin-top: 0;">⚠️ Important Security Note</h3>
        <p style="color: #b45309; margin-bottom: 0;">
          These are temporary credentials for first-time login only. You'll be required to change them to your own
          secure username and password when you first log in. Never share your login credentials with anyone.
        </p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <p><strong>Questions?</strong> Call or text us at (555) 123-4567</p>
        <p><strong>Email:</strong> contractors@flipcocapital.com</p>
      </div>
    </div>
    <div class="footer">
      <h3>Flipco Capital - Contractor Portal</h3>
      <p style="opacity: 0.9;">Welcome to our team! We look forward to working with you.</p>
      <p style="font-size: 12px; opacity: 0.7; margin-top: 15px;">
        © 2024 Flipco Capital. All rights reserved.<br>
        This email contains sensitive login information - please keep it secure.
      </p>
    </div>
  </div>
</body>
</html>`;
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: contractor.email,
      subject: `🎉 Welcome to Flipco Capital Team - Your Login Credentials`,
      html: emailHtml,
    });
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Failed to send credentials email:', error);
    return { success: false, error: error };
  }
}
