import { AuthForm } from "@/components/auth/auth-form"
import { EmailConfirmationHelper } from "@/components/dev/email-confirmation-helper"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { EcoLogo } from "@/components/ui/eco-logo"

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const isDevelopment = process.env.NODE_ENV === "development"
  const error = searchParams?.error as string | undefined

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-eco-dark to-eco-gray text-white p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-eco-dark-green opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-eco-bright-green opacity-10 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-eco-bright-green opacity-10 blur-2xl"></div>
      </div>

      <div className="relative z-10 flex items-center gap-3 font-bold text-2xl text-eco-bright-green mb-8">
        <EcoLogo size="lg" />
        <span>EcoScore</span>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4 max-w-md relative z-10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative z-10">
        <AuthForm />
      </div>

      {/* Only show in development */}
      {isDevelopment && (
        <div className="relative z-10 mt-8">
          <EmailConfirmationHelper />
        </div>
      )}
    </div>
  )
}
