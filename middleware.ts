import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // If user is not signed in and the current path is not / or /login,
    // redirect the user to /login
    if (
      !session &&
      req.nextUrl.pathname !== "/" &&
      req.nextUrl.pathname !== "/login" &&
      !req.nextUrl.pathname.startsWith("/auth")
    ) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // If user is signed in and the current path is / or /login,
    // redirect the user to /dashboard
    if (session && (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/login")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return res
  } catch (error) {
    console.error("Middleware error:", error)

    // If there's an error with Supabase initialization, we'll just continue
    // This prevents the app from crashing if Supabase isn't configured yet
    return res
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
