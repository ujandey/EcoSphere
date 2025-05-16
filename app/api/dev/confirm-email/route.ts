import { type NextRequest, NextResponse } from "next/server"
import { confirmUserEmail } from "@/lib/supabase/admin"

// This route should only be used in development
export async function POST(request: NextRequest) {
  // Check if we're in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const result = await confirmUserEmail(email)

    if (result.success) {
      return NextResponse.json({
        message: result.message || "Confirmation email sent. Please check your inbox.",
      })
    } else {
      return NextResponse.json(
        {
          error: result.error || "Failed to process email confirmation",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("Error in confirm-email route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
