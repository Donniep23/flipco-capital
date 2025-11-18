import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Mock permanent contractor credentials (in real app, this would be database lookup)
    const permanentCredentials = [
      {
        username: "demo",
        password: "demo123",
        contractorId: "demo-001",
        contractorName: "Demo Contractor",
        status: "active"
      },
      {
        username: "ahmed_hassan",
        password: "MySecurePass123!",
        contractorId: "app-003",
        contractorName: "Ahmed Hassan",
        status: "active"
      },
      {
        username: "john_martinez",
        password: "MyPassword456!",
        contractorId: "app-001",
        contractorName: "John Martinez",
        status: "active"
      },
      {
        username: "maria_rodriguez",
        password: "MyPass789!",
        contractorId: "app-002",
        contractorName: "Maria Rodriguez",
        status: "active"
      }
    ];

    // Check permanent credentials
    const contractor = permanentCredentials.find(
      cred => cred.username === username && cred.password === password && cred.status === "active"
    );

    if (contractor) {
      console.log(`✅ Contractor login successful: ${contractor.contractorName} (${username})`);

      return NextResponse.json({
        success: true,
        message: "Login successful",
        contractor: {
          id: contractor.contractorId,
          name: contractor.contractorName,
          username: contractor.username
        }
      });
    } else {
      console.log(`❌ Failed login attempt for username: ${username}`);

      return NextResponse.json(
        { success: false, error: "Invalid username or password" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error("❌ Error during contractor login:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Login failed"
      },
      { status: 500 }
    );
  }
}
