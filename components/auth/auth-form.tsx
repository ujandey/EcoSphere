"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Mail, Info, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AuthForm() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams?.get("tab") || "login"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailConfirmationNeeded, setEmailConfirmationNeeded] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [authChecking, setAuthChecking] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Check if user is already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const { data } = await supabase.auth.getSession()
        if (data.session) {
          router.push("/dashboard")
        }
      } catch (err) {
        console.error("Error checking auth:", err)
      } finally {
        setAuthChecking(false)
      }
    }

    checkAuth()
  }, [router, supabase.auth])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setEmailConfirmationNeeded(false)

    try {
      // Validate password
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            full_name: fullName, // Store the full name in user metadata
          },
        },
      })

      if (authError) throw authError

      // Check if email confirmation is required
      if (authData?.user && !authData.session) {
        // Email confirmation required
        setEmailConfirmationNeeded(true)
      } else if (authData?.session) {
        // No email confirmation required or already confirmed
        router.push("/dashboard")
      } else {
        // Something went wrong
        throw new Error("Failed to create account. Please try again.")
      }
    } catch (err) {
      console.error("Error signing up:", err)
      setError(err instanceof Error ? err.message : "An error occurred during sign up")
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setEmailConfirmationNeeded(false)

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required")
      }

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        // Check for specific error messages
        if (error.message.includes("Email not confirmed")) {
          setEmailConfirmationNeeded(true)
        } else if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password")
        } else {
          throw error
        }
      } else if (data?.session) {
        // Successfully signed in
        console.log("Sign in successful, redirecting to dashboard")
        router.push("/dashboard")
        router.refresh()
      } else {
        // No session created
        throw new Error("Failed to sign in. Please try again.")
      }
    } catch (err) {
      console.error("Error signing in:", err)
      setError(err instanceof Error ? err.message : "Invalid login credentials")
    } finally {
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setResendLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) throw error

      // Show success message
      setError("Confirmation email resent. Please check your inbox.")
    } catch (err) {
      console.error("Error resending confirmation:", err)
      setError(err instanceof Error ? err.message : "Error resending confirmation email")
    } finally {
      setResendLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      // Note: We don't need to redirect here as the OAuth flow will handle that
    } catch (err) {
      console.error("Error signing in with Google:", err)
      setError(err instanceof Error ? err.message : "Error signing in with Google")
      setGoogleLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (authChecking) {
    return (
      <Card className="w-full max-w-md mx-auto bg-eco-gray/20 border-eco-gray/50 text-white backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-eco-bright-green mb-4" />
          <p>Checking authentication status...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-eco-gray/20 border-eco-gray/50 text-white backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-eco-bright-green">Welcome to EcoScore</CardTitle>
        <CardDescription className="text-center text-eco-light-gray">
          Track, reduce, and offset your environmental impact
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-eco-gray/30">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-eco-bright-green data-[state=active]:text-eco-dark"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-eco-bright-green data-[state=active]:text-eco-dark"
            >
              Register
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert
              variant={error.includes("resent") ? "default" : "destructive"}
              className="mt-4 bg-eco-gray/30 border-eco-gray"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {emailConfirmationNeeded && (
            <Alert className="mt-4 bg-eco-gray/30 border-eco-gray">
              <Info className="h-4 w-4" />
              <AlertTitle>Email confirmation required</AlertTitle>
              <AlertDescription>
                Please check your email and click the confirmation link to activate your account.
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResendConfirmation}
                    disabled={resendLoading}
                    className="flex items-center gap-1 border-eco-gray text-eco-light-gray hover:text-white hover:bg-eco-gray/30"
                  >
                    <Mail className="h-3 w-3" />
                    {resendLoading ? "Sending..." : "Resend confirmation email"}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-eco-gray text-eco-light-gray hover:text-white hover:bg-eco-gray/30"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  "Connecting..."
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>
                    Continue with Google
                  </>
                )}
              </Button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-eco-gray/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-eco-gray/20 px-2 text-eco-light-gray">Or continue with</span>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-eco-gray/30 border-eco-gray text-white placeholder:text-eco-light-gray"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs text-eco-bright-green hover:text-eco-dark-green"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-eco-gray/30 border-eco-gray text-white placeholder:text-eco-light-gray"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <div className="mt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-eco-gray text-eco-light-gray hover:text-white hover:bg-eco-gray/30"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  "Connecting..."
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path
                          fill="#4285F4"
                          d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                        />
                        <path
                          fill="#34A853"
                          d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                        />
                        <path
                          fill="#EA4335"
                          d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                        />
                      </g>
                    </svg>
                    Sign up with Google
                  </>
                )}
              </Button>
            </div>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-eco-gray/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-eco-gray/20 px-2 text-eco-light-gray">Or register with</span>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="bg-eco-gray/30 border-eco-gray text-white placeholder:text-eco-light-gray"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailRegister" className="text-white">
                  Email
                </Label>
                <Input
                  id="emailRegister"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-eco-gray/30 border-eco-gray text-white placeholder:text-eco-light-gray"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordRegister" className="text-white">
                  Password
                </Label>
                <Input
                  id="passwordRegister"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-eco-gray/30 border-eco-gray text-white placeholder:text-eco-light-gray"
                />
                <p className="text-xs text-eco-light-gray">Password must be at least 6 characters long</p>
              </div>
              <Button
                type="submit"
                className="w-full bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-eco-light-gray">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardFooter>
    </Card>
  )
}
