import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UserProfileForm } from "@/components/profile/user-profile-form"

export default async function ProfilePage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Fetch user profile
  const { data: profileData } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single()

  // Fetch user preferences
  const { data: preferencesData } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <UserProfileForm user={session.user} profile={profileData} preferences={preferencesData} />
    </div>
  )
}
