import { NextRequest, NextResponse } from "next/server";
import { sendRegistrationNotificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { userType, userData } = await request.json();

    // Validate input
    if (!userType || !userData) {
      return NextResponse.json(
        { success: false, error: "Missing required data" },
        { status: 400 }
      );
    }

    if (!['contractor', 'investor'].includes(userType)) {
      return NextResponse.json(
        { success: false, error: "Invalid user type" },
        { status: 400 }
      );
    }

    // Validate required user data
    if (!userData.firstName || !userData.lastName || !userData.email) {
      return NextResponse.json(
        { success: false, error: "Missing required user information" },
        { status: 400 }
      );
    }

    // Send registration notification email to admin
    const emailResult = await sendRegistrationNotificationEmail(userType, userData);

    if (emailResult.success) {
      console.log(`📧 ${userType} registration notification sent successfully:`, {
        emailId: emailResult.messageId,
        userType: userType,
        userName: `${userData.firstName} ${userData.lastName}`,
        userEmail: userData.email,
        registrationTime: new Date().toISOString()
      });

      return NextResponse.json({
        success: true,
        message: "Registration notification sent successfully",
        details: {
          userType: userType,
          userName: `${userData.firstName} ${userData.lastName}`,
          userEmail: userData.email,
          adminNotified: true,
          registrationId: emailResult.messageId,
          timestamp: new Date().toISOString()
        }
      });

    } else {
      console.error(`❌ Failed to send ${userType} registration notification:`, emailResult.error);

      // Still return success to user (don't break their experience)
      // but log the email failure for admin attention
      return NextResponse.json({
        success: true,
        message: "Registration received successfully",
        details: {
          userType: userType,
          userName: `${userData.firstName} ${userData.lastName}`,
          userEmail: userData.email,
          adminNotified: false,
          timestamp: new Date().toISOString(),
          note: "Admin notification failed - please follow up manually"
        }
      });
    }

  } catch (error) {
    console.error("❌ Registration notification error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process registration notification",
        details: {
          timestamp: new Date().toISOString(),
          errorType: error instanceof Error ? error.name : 'Unknown'
        }
      },
      { status: 500 }
    );
  }
}
