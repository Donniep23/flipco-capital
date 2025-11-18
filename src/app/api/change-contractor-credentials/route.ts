import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
export async function POST(request: NextRequest) {
  // Initialize Resend inside the function to avoid build-time errors
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
  try {
    const { tempUsername, tempPassword, newUsername, newPassword } = await request.json();
    // Validate input
    if (!tempUsername || !tempPassword || !newUsername || !newPassword) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }
    // Mock temporary credentials lookup (in real app, this would be database)
    const tempCredentials = [
      {
        username: "ahmed_hassan_temp",
        password: "TempPass123!",
        contractorId: "app-003",
        contractorName: "Ahmed Hassan",
        contractorEmail: "a.hassan@gmail.com",
        contractorPhone: "(281) 555-0345"
      },
      {
        username: "john_martinez_temp",
        password: "TempPass456!",
        contractorId: "app-001",
        contractorName: "John Martinez",
        contractorEmail: "john.martinez@email.com",
        contractorPhone: "(713) 555-0123"
      },
      {
        username: "maria_rodriguez_temp",
        password: "TempPass789!",
        contractorId: "app-002",
        contractorName: "Maria Rodriguez",
        contractorEmail: "",
        contractorPhone: "(832) 555-0789"
      }
    ];
    // Verify temporary credentials
    const tempCred = tempCredentials.find(
      cred => cred.username === tempUsername && cred.password === tempPassword
    );
    if (!tempCred) {
      return NextResponse.json(
        { success: false, error: "Invalid temporary credentials" },
        { status: 400 }
      );
    }
    // In real app, you would:
    // 1. Save new credentials to database
    // 2. Deactivate temporary credentials
    // 3. Update contractor status
    console.log(`🔐 Contractor credentials changed: ${tempUsername} → ${newUsername}`);
    // Send notification email to admin
    try {
      await sendCredentialChangeNotification({
        contractorName: tempCred.contractorName,
        contractorId: tempCred.contractorId,
        oldUsername: tempUsername,
        newUsername: newUsername,
        contractorEmail: tempCred.contractorEmail,
        contractorPhone: tempCred.contractorPhone
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      // Don't fail the credential change if email fails
    }
    return NextResponse.json({
      success: true,
      message: "Credentials updated successfully",
      details: {
        contractorId: tempCred.contractorId,
        contractorName: tempCred.contractorName,
        oldUsername: tempUsername,
        newUsername: newUsername,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("❌ Error changing contractor credentials:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to change credentials"
      },
      { status: 500 }
    );
  }
}
async function sendCredentialChangeNotification(data: {
  contractorName: string;
  contractorId: string;
  oldUsername: string;
  newUsername: string;
  contractorEmail: string;
  contractorPhone: string;
}) {
  // Initialize Resend client for this function
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Contractor Credentials Changed</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
    .header { background: linear-gradient(135deg, #059669, #047857); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
    .content { padding: 30px 20px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
    .info-item { background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #059669; }
    .info-label { font-weight: bold; color: #1e293b; margin-bottom: 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-value { color: #475569; }
    .credentials-box { background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .alert { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 15px; margin: 20px 0; }
    .footer { background: #1e293b; color: white; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔐 Contractor Credentials Updated</h1>
      <p>A contractor has completed their first-time login setup</p>
    </div>
    <div class="content">
      <h2>Credential Change Details</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">👤 Contractor Name</div>
          <div class="info-value">${data.contractorName}</div>
        </div>
        <div class="info-item">
          <div class="info-label">📋 Application ID</div>
          <div class="info-value">${data.contractorId}</div>
        </div>
        <div class="info-item">
          <div class="info-label">📧 Email</div>
          <div class="info-value">${data.contractorEmail || 'Not provided'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">📱 Phone</div>
          <div class="info-value">${data.contractorPhone}</div>
        </div>
      </div>
      <div class="credentials-box">
        <h3 style="color: #065f46; margin-top: 0;">🔐 Credential Changes</h3>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Old Username (Temporary)</div>
            <div class="info-value">${data.oldUsername}</div>
          </div>
          <div class="info-item">
            <div class="info-label">New Username (Permanent)</div>
            <div class="info-value">${data.newUsername}</div>
          </div>
        </div>
        <p style="font-size: 14px; color: #047857; margin-top: 15px;">
          ✅ The contractor has successfully completed their first-time login and set up their permanent credentials.
        </p>
      </div>
      <div class="alert">
        <strong>📝 Next Steps:</strong>
        <ul style="margin: 10px 0 0 20px;">
          <li>The contractor can now login with their new credentials</li>
          <li>Temporary credentials have been deactivated</li>
          <li>The contractor is ready to receive work assignments</li>
          <li>Update your records with the new username: <strong>${data.newUsername}</strong></li>
        </ul>
      </div>
    </div>
    <div class="footer">
      <p><strong>Flipco Capital - Contractor Management System</strong></p>
      <p style="font-size: 12px; opacity: 0.8;">
        Credentials changed: ${new Date().toLocaleString()}<br>
        Contractor Portal Authentication System
      </p>
    </div>
  </div>
</body>
</html>`;
  const result = await resend.emails.send({
    from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    to: process.env.ADMIN_EMAIL || 'aisitebuilder000@gmail.com',
    subject: `🔐 Contractor Credentials Updated - ${data.contractorName}`,
    html: emailHtml,
  });
  return { success: true, messageId: result.data?.id };
}
