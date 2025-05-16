import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

// Create a singleton instance to avoid multiple instances during development
let supabaseClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

// Create a single supabase client for the entire client-side application
export const createClient = () => {
  if (!supabaseClient) {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      // In the browser, we can use the environment variables directly
      // The createClientComponentClient will automatically use the environment variables
      // if they're available in the browser
      supabaseClient = createClientComponentClient<Database>()
    } else {
      // In server-side rendering, we need to explicitly pass the environment variables
      // This should rarely happen for client components, but just in case
      supabaseClient = createClientComponentClient<Database>({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      })
    }
  }
  return supabaseClient
}
