import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UserAvatar } from "@/components/auth/user-avatar"
import { LogoutButton } from "@/components/auth/logout-button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { EcoLogo } from "@/components/ui/eco-logo"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-eco-dark to-eco-gray text-white">
      <header className="sticky top-0 z-40 border-b border-eco-gray/50 bg-eco-dark/95 backdrop-blur supports-[backdrop-filter]:bg-eco-dark/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <EcoLogo size="sm" />
            <span className="font-bold text-xl text-eco-bright-green">EcoScore</span>
          </div>
          <div className="hidden md:flex">
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <UserAvatar user={session.user} />
            <LogoutButton />
          </div>
          <MobileNav />
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
      <footer className="border-t border-eco-gray/50 py-6 md:py-0 bg-eco-dark/80">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-eco-light-gray">
            &copy; {new Date().getFullYear()} EcoScore. All rights reserved.
          </p>
          <p className="text-sm text-eco-light-gray">Helping you reduce your carbon footprint one step at a time.</p>
        </div>
      </footer>
    </div>
  )
}
