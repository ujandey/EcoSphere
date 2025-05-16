import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

export const createClient = () => {
  const cookieStore = cookies()

  // The createServerComponentClient will automatically use the environment variables
  // if they're available on the server
  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}
