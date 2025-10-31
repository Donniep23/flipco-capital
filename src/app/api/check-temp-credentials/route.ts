import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Mock temporary credentials database (in real app, this would be a database lookup)
    const tempCredentials = [
      {
        username: "ahmed_hassan_temp",
        password: "TempPass123!",
        contractorId: "app-003",
        isActive: true
      },
      {
        username: "john_martinez_temp",
        password: "TempPass456!",
        contractorId: "app-001",
        isActive: true
      },
      {
        username: "maria_rodriguez_temp",
        password: "TempPass789!",
        contractorId: "app-002",
        isActive: true
      }
    ];

    // Check if provided credentials match any temporary credentials
    const tempCred = tempCredentials.find(
      cred => cred.username === username && cred.password === password && cred.isActive
    );

    if (tempCred) {
      console.log(`🔍 Temporary credential login detected for: ${username}`);

      return NextResponse.json({
        isTemporary: true,
        contractorId: tempCred.contractorId,
        message: "Temporary credentials verified - password change required"
      });
    } else {
      return NextResponse.json({
        isTemporary: false,
        message: "Not temporary credentials"
      });
    }

  } catch (error) {
    console.error("❌ Error checking temporary credentials:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to check credentials",
        isTemporary: false
      },
      { status: 500 }
    );
  }
}
