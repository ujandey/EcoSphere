"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarbonFootprintDashboard } from "@/components/carbon-footprint-dashboard"
import { CommunityMarketplace } from "@/components/community-marketplace"
import { Achievements } from "@/components/achievements"
import { ResourceHub } from "@/components/resource-hub"
import { UserProfile } from "@/components/user-profile"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState("carbon-footprint")

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl text-green-700 dark:text-green-400">
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-xs">Eco</span>
            </div>
            <span>EcoScore</span>
          </div>
          <div className="hidden md:flex">
            <MainNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </header>
      <main className="flex-1 container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="hidden">
            <TabsTrigger value="carbon-footprint">Carbon Footprint</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="carbon-footprint" className="space-y-6">
            <CarbonFootprintDashboard />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <CommunityMarketplace />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Achievements />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <ResourceHub />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EcoScore. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Helping you reduce your carbon footprint one step at a time.</p>
        </div>
      </footer>
    </div>
  )
}
