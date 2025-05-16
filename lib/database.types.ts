export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          location: string | null
          bio: string | null
          avatar_url: string | null
          measurement_preference: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          location?: string | null
          bio?: string | null
          avatar_url?: string | null
          measurement_preference?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          location?: string | null
          bio?: string | null
          avatar_url?: string | null
          measurement_preference?: string
          created_at?: string
          updated_at?: string
        }
      }
      carbon_footprints: {
        Row: {
          id: string
          user_id: string
          total_footprint: number
          transportation: number | null
          home_energy: number | null
          food: number | null
          consumption: number | null
          travel: number | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_footprint: number
          transportation?: number | null
          home_energy?: number | null
          food?: number | null
          consumption?: number | null
          travel?: number | null
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_footprint?: number
          transportation?: number | null
          home_energy?: number | null
          food?: number | null
          consumption?: number | null
          travel?: number | null
          date?: string
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
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
        Insert: {
          user_id: string
          dark_mode?: boolean
          compact_view?: boolean
          public_profile?: boolean
          weekly_summary_notifications?: boolean
          achievement_notifications?: boolean
          community_notifications?: boolean
          tips_notifications?: boolean
          updated_at?: string
        }
        Update: {
          user_id?: string
          dark_mode?: boolean
          compact_view?: boolean
          public_profile?: boolean
          weekly_summary_notifications?: boolean
          achievement_notifications?: boolean
          community_notifications?: boolean
          tips_notifications?: boolean
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
    }
  }
}
