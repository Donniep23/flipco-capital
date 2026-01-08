import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail, sendContactThankYouEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send notification email to admin
    const adminEmailResult = await sendContactFormEmail(formData);

    // Send thank you email to the contact
    const thankYouEmailResult = await sendContactThankYouEmail(formData);

    // Check if both emails were sent successfully
    if (adminEmailResult.success && thankYouEmailResult.success) {
      console.log('📧 Contact form emails sent successfully:', {
        adminEmailId: adminEmailResult.messageId,
        thankYouEmailId: thankYouEmailResult.messageId,
        contact: `${formData.firstName} ${formData.lastName} <${formData.email}>`,
        investmentAmount: formData.investment
      });

      return NextResponse.json({
        success: true,
        message: "Thank you for your interest! We'll contact you within 24 hours.",
        details: {
          adminNotified: true,
          thankYouSent: true,
          contactName: `${formData.firstName} ${formData.lastName}`,
          contactEmail: formData.email,
          submittedAt: new Date().toISOString()
        }
      });
    } else {
      // Log any email failures
      if (!adminEmailResult.success) {
        console.error('❌ Failed to send admin notification:', adminEmailResult.error);
      }
      if (!thankYouEmailResult.success) {
        console.error('❌ Failed to send thank you email:', thankYouEmailResult.error);
      }

      // Return success to user even if one email fails (don't break user experience)
      return NextResponse.json({
        success: true,
        message: "Thank you for your interest! We'll contact you within 24 hours.",
        details: {
          adminNotified: adminEmailResult.success,
          thankYouSent: thankYouEmailResult.success,
          contactName: `${formData.firstName} ${formData.lastName}`,
          contactEmail: formData.email,
          submittedAt: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error("❌ Contact form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "There was an error processing your submission. Please try again or contact us directly.",
        details: {
          timestamp: new Date().toISOString(),
          errorType: error instanceof Error ? error.name : 'Unknown'
        }
      },
      { status: 500 }
    );
  }
}
