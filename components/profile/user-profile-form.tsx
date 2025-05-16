"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserProfile {
  id: string
  full_name: string | null
  location: string | null
  bio: string | null
  avatar_url: string | null
  measurement_preference: string
  created_at: string
  updated_at: string
}

interface UserPreferences {
  user_id: string
  dark_mode: boolean
  compact_view: boolean
  public_profile: boolean
  weekly_summary_notifications: boolean
  achievement_notifications: boolean
  community_notifications: boolean
  tips_notifications: boolean
  updated_at: string
}

interface UserProfileFormProps {
  user: User
  profile: UserProfile | null
  preferences: UserPreferences | null
}

export function UserProfileForm({ user, profile, preferences }: UserProfileFormProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Profile state
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [location, setLocation] = useState(profile?.location || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [measurementPreference, setMeasurementPreference] = useState(profile?.measurement_preference || "metric")

  // Preferences state
  const [darkMode, setDarkMode] = useState(preferences?.dark_mode || false)
  const [compactView, setCompactView] = useState(preferences?.compact_view || false)
  const [publicProfile, setPublicProfile] = useState(preferences?.public_profile || true)
  const [weeklySummary, setWeeklySummary] = useState(preferences?.weekly_summary_notifications || true)
  const [achievementNotifications, setAchievementNotifications] = useState(
    preferences?.achievement_notifications || true,
  )
  const [communityNotifications, setCommunityNotifications] = useState(preferences?.community_notifications || true)
  const [tipsNotifications, setTipsNotifications] = useState(preferences?.tips_notifications || true)

  const supabase = createClient()

  const updateProfile = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          full_name: fullName,
          location,
          bio,
          measurement_preference: measurementPreference,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (err) {
      console.error("Error updating profile:", err)
      setError(err instanceof Error ? err.message : "An error occurred while updating your profile")
    } finally {
      setLoading(false)
    }
  }

  const updatePreferences = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from("user_preferences")
        .update({
          dark_mode: darkMode,
          compact_view: compactView,
          public_profile: publicProfile,
          weekly_summary_notifications: weeklySummary,
          achievement_notifications: achievementNotifications,
          community_notifications: communityNotifications,
          tips_notifications: tipsNotifications,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id)

      if (error) throw error

      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully.",
      })
    } catch (err) {
      console.error("Error updating preferences:", err)
      setError(err instanceof Error ? err.message : "An error occurred while updating your preferences")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="profile" className="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email || ""} disabled />
              <p className="text-xs text-muted-foreground">
                Your email address is used for login and cannot be changed here
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, Country"
              />
              <p className="text-xs text-muted-foreground">
                Used to calculate regional averages and provide local resources
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio || ""}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about yourself and your sustainability journey"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="measurement-system">Measurement System</Label>
              <Select value={measurementPreference} onValueChange={setMeasurementPreference}>
                <SelectTrigger id="measurement-system">
                  <SelectValue placeholder="Select system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, km)</SelectItem>
                  <SelectItem value="imperial">Imperial (lb, miles)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateProfile} disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="preferences" className="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>Customize how EcoScore appears</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-muted-foreground">Display more information with less spacing</p>
              </div>
              <Switch id="compact-view" checked={compactView} onCheckedChange={setCompactView} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public-profile">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Allow others to see your sustainability achievements</p>
              </div>
              <Switch id="public-profile" checked={publicProfile} onCheckedChange={setPublicProfile} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updatePreferences} disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Carbon Summary</Label>
                <p className="text-sm text-muted-foreground">Receive a weekly summary of your carbon footprint</p>
              </div>
              <Switch checked={weeklySummary} onCheckedChange={setWeeklySummary} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Achievement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you earn new badges or complete challenges
                </p>
              </div>
              <Switch checked={achievementNotifications} onCheckedChange={setAchievementNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Community Updates</Label>
                <p className="text-sm text-muted-foreground">Notifications about new events and marketplace listings</p>
              </div>
              <Switch checked={communityNotifications} onCheckedChange={setCommunityNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tips & Recommendations</Label>
                <p className="text-sm text-muted-foreground">
                  Personalized suggestions to reduce your carbon footprint
                </p>
              </div>
              <Switch checked={tipsNotifications} onCheckedChange={setTipsNotifications} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updatePreferences} disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? "Saving..." : "Save Notification Settings"}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="account" className="space-y-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your password and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-green-600 hover:bg-green-700">Update Password</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Data</CardTitle>
            <CardDescription>Manage your personal data and privacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Delete Account</Label>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
