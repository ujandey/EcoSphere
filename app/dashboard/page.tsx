import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CarbonFootprintDashboard } from "@/components/carbon-footprint-dashboard"
import { UserLevel } from "@/components/gamification/user-level"
import { EcoChallenges } from "@/components/gamification/eco-challenges"
import { EcoAssistant } from "@/components/ai/eco-assistant"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeagueDashboard } from "@/components/gamification/league-dashboard"

export default async function DashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user's latest carbon footprint data
  const { data: footprintData } = await supabase
    .from("carbon_footprints")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(1)
    .single()

  // Fetch user profile
  const { data: profileData } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

  // Get user display name from profile or metadata
  let displayName = profileData?.full_name

  if (!displayName && session.user.user_metadata) {
    displayName =
      session.user.user_metadata.full_name || session.user.user_metadata.name || session.user.email?.split("@")[0]
  } else if (!displayName) {
    displayName = session.user.email?.split("@")[0]
  }

  // Mock user points and level - in a real app, this would come from the database
  const userPoints = 350
  const userLevel = 3

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {displayName}</h1>
          <p className="text-muted-foreground">Track and reduce your environmental impact</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <UserLevel userId={session.user.id} initialPoints={userPoints} initialLevel={userLevel} />
        </div>
        <div className="md:col-span-1">
          <EcoAssistant userId={session.user.id} userName={displayName} footprintData={footprintData} />
        </div>
      </div>

      <Tabs defaultValue="footprint">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="footprint">Carbon Footprint</TabsTrigger>
          <TabsTrigger value="challenges">Eco Challenges</TabsTrigger>
          <TabsTrigger value="gamification">Progress & Leagues</TabsTrigger>
        </TabsList>
        <TabsContent value="footprint" className="mt-6">
          <CarbonFootprintDashboard initialData={footprintData} userId={session.user.id} />
        </TabsContent>
        <TabsContent value="challenges" className="mt-6">
          <EcoChallenges userId={session.user.id} userLevel={userLevel} />
        </TabsContent>
        <TabsContent value="gamification" className="mt-6">
          <LeagueDashboard
            userId={session.user.id}
            userName={displayName}
            userAvatar={profileData?.avatar_url}
            initialEcoScore={
              footprintData?.total_footprint ? Math.round((1 - footprintData.total_footprint / 16) * 100) : 65
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
