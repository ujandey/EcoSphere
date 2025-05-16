import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent("Authentication failed")}`, request.url),
        )
      }

      if (!data?.user) {
        console.error("No user returned from exchangeCodeForSession")
        return NextResponse.redirect(
          new URL(`/login?error=${encodeURIComponent("Authentication failed")}`, request.url),
        )
      }

      // Check if user profile exists
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from("user_profiles")
        .select("id")
        .eq("id", data.user.id)
        .single()

      // If no profile exists, create one
      if ((profileError && profileError.code === "PGRST116") || !profileData) {
        // Extract name from user metadata or email
        let fullName = null
        if (data.user.user_metadata && data.user.user_metadata.full_name) {
          fullName = data.user.user_metadata.full_name
        } else if (data.user.user_metadata && data.user.user_metadata.name) {
          fullName = data.user.user_metadata.name
        }

        try {
          // Create user profile
          await supabaseAdmin.from("user_profiles").insert({
            id: data.user.id,
            full_name: fullName,
            avatar_url: data.user.user_metadata?.avatar_url || null,
            measurement_preference: "metric", // Default value
          })

          // Create user preferences with defaults
          await supabaseAdmin.from("user_preferences").insert({
            user_id: data.user.id,
          })

          // Create user gamification entry if the table exists
          await supabaseAdmin
            .from("user_gamification")
            .insert({
              user_id: data.user.id,
              points: 0,
              level: 1,
            })
            .catch((err) => {
              // Ignore if table doesn't exist yet
              console.error("Error creating gamification entry:", err)
            })
        } catch (err) {
          console.error("Error creating user profile:", err)
          // Continue anyway - the user is authenticated
        }
      }
    } catch (err) {
      console.error("Unexpected error in auth callback:", err)
      return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent("Authentication failed")}`, request.url))
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/dashboard", request.url))
}
