"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function AuthTestPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true)
        setError(null)

        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        setSessionData(sessionData)

        // Get user
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError) {
          throw userError
        }

        setUser(userData.user)
      } catch (err) {
        console.error("Auth test error:", err)
        setError(err instanceof Error ? err.message : "An error occurred checking authentication")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [supabase.auth])

  const handleSignOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setSessionData(null)
      window.location.href = "/login"
    } catch (err) {
      console.error("Sign out error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during sign out")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
          <CardDescription>This page helps diagnose authentication issues</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <h3 className="text-lg font-medium">Authentication Status</h3>
                <p className="mt-1">{user ? "Authenticated" : "Not authenticated"}</p>
              </div>

              {user && (
                <>
                  <div>
                    <h3 className="text-lg font-medium">User Information</h3>
                    <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto text-xs">
                      {JSON.stringify(user, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Session Information</h3>
                    <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-auto text-xs">
                      {JSON.stringify(sessionData, null, 2)}
                    </pre>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => (window.location.href = "/login")}>
            Go to Login
          </Button>
          {user && (
            <Button variant="destructive" onClick={handleSignOut} disabled={loading}>
              {loading ? "Signing out..." : "Sign Out"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
