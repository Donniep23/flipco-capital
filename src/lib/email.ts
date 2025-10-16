import { Resend } from 'resend';
// Helper function to get Resend instance (initialized at runtime, not build time)
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY || 'dummy-key-for-build');
}
// Email configuration
const EMAIL_CONFIG = {
  fromEmail: process.env.FROM_EMAIL || 'noreply@flipcocapital.com',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@flipcocapital.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
};
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investment: string;
  message: string;
}
interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  // Contractor-specific fields
  contractorType?: string;
  experience?: string;
  licenseNumber?: string;
  specialties?: string;
  serviceAreas?: string;
  idCardUploaded?: string;
  idCardSize?: string;
  // Investor-specific fields
  investmentAmount?: string;
  investmentGoals?: string;
  riskTolerance?: string;
  timeline?: string;
  message?: string;
}
// Send contact form email to admin
export async function sendContactFormEmail(formData: ContactFormData) {
  try {
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2563eb;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Phone:</strong> ${formData.phone}</p>
    <p><strong>Investment Amount:</strong> ${formData.investment}</p>
    <p><strong>Message:</strong></p>
    <p>${formData.message}</p>
  </div>
</body>
</html>`;
    const { data, error } = await getResendClient().emails.send({
      from: EMAIL_CONFIG.fromEmail,
      to: EMAIL_CONFIG.adminEmail,
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
    });
    if (error) {
      return { success: false, error: error };
    }
    return { success: true, messageId: data?.id };
  } catch (error) {
    return { success: false, error: error };
  }
}
// Send thank you email to contact
export async function sendContactThankYouEmail(formData: ContactFormData) {
  try {
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Contacting Flipco Capital</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2563eb;">Thank You for Your Interest!</h2>
    <p>Dear ${formData.firstName},</p>
    <p>Thank you for reaching out to Flipco Capital. We have received your inquiry and will get back to you within 24 hours.</p>
    <p>Best regards,<br>The Flipco Capital Team</p>
  </div>
</body>
</html>`;
    const { data, error } = await getResendClient().emails.send({
      from: EMAIL_CONFIG.fromEmail,
      to: formData.email,
      subject: 'Thank You for Contacting Flipco Capital',
      html: emailHtml,
    });
    if (error) {
      return { success: false, error: error };
    }
    return { success: true, messageId: data?.id };
  } catch (error) {
    return { success: false, error: error };
  }
}
// Send registration notification to admin
export async function sendRegistrationNotificationEmail(userType: 'contractor' | 'investor', userData: UserRegistrationData) {
  try {
    const isContractor = userType === 'contractor';
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New ${isContractor ? 'Contractor' : 'Investor'} Registration</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #2563eb;">New ${isContractor ? 'Contractor' : 'Investor'} Registration</h2>
    <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
    <p><strong>Email:</strong> ${userData.email}</p>
    <p><strong>Phone:</strong> ${userData.phone || 'Not provided'}</p>
    <p><strong>Company:</strong> ${userData.company || 'Not provided'}</p>
    ${isContractor ? `
      <h3>Contractor Information:</h3>
      <p><strong>Type:</strong> ${userData.contractorType || 'Not provided'}</p>
      <p><strong>Experience:</strong> ${userData.experience || 'Not provided'}</p>
      <p><strong>License Number:</strong> ${userData.licenseNumber || 'Not provided'}</p>
      <p><strong>Specialties:</strong> ${userData.specialties || 'Not provided'}</p>
      <p><strong>Service Areas:</strong> ${userData.serviceAreas || 'Not provided'}</p>
      <p><strong>ID Card:</strong> ${userData.idCardUploaded || 'Not uploaded'}</p>
    ` : `
      <h3>Investor Information:</h3>
      <p><strong>Investment Amount:</strong> ${userData.investmentAmount || 'Not provided'}</p>
      <p><strong>Investment Goals:</strong> ${userData.investmentGoals || 'Not provided'}</p>
      <p><strong>Risk Tolerance:</strong> ${userData.riskTolerance || 'Not provided'}</p>
      <p><strong>Timeline:</strong> ${userData.timeline || 'Not provided'}</p>
    `}
  </div>
</body>
</html>`;
    const { data, error } = await getResendClient().emails.send({
      from: EMAIL_CONFIG.fromEmail,
      to: EMAIL_CONFIG.adminEmail,
      subject: `New ${isContractor ? 'Contractor' : 'Investor'} Registration: ${userData.firstName} ${userData.lastName}`,
      html: emailHtml,
    });
    if (error) {
      return { success: false, error: error };
    }
    return { success: true, messageId: data?.id };
  } catch (error) {
    return { success: false, error: error };
  }
}