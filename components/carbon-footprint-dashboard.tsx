"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CarbonFootprintChart } from "@/components/carbon-footprint-chart"
import { CarbonCategories } from "@/components/carbon-categories"
import { RecommendationsList } from "@/components/recommendations-list"
import { Leaf, PlusCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CarbonFootprintData {
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

interface CarbonFootprintDashboardProps {
  initialData: CarbonFootprintData | null
  userId: string
}

export function CarbonFootprintDashboard({ initialData, userId }: CarbonFootprintDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [footprintData, setFootprintData] = useState<CarbonFootprintData | null>(initialData)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  // Mock data for national average and global target
  const nationalAverage = 16.0 // tons of CO2 per year
  const globalTarget = 2.0 // tons of CO2 per year

  // Calculate percentages for progress bars
  const percentToTarget = footprintData
    ? Math.min(100, Math.round((globalTarget / footprintData.total_footprint) * 100))
    : 0
  const percentToAverage = footprintData
    ? Math.min(100, Math.round((footprintData.total_footprint / nationalAverage) * 100))
    : 0

  // If no data exists, create sample data for demo purposes
  const createSampleData = async () => {
    setLoading(true)
    try {
      const sampleData = {
        user_id: userId,
        total_footprint: 8.2,
        transportation: 3.2,
        home_energy: 2.1,
        food: 1.8,
        consumption: 0.8,
        travel: 0.3,
        date: new Date().toISOString().split("T")[0],
      }

      const { data, error } = await supabase.from("carbon_footprints").insert(sampleData).select().single()

      if (error) throw error

      setFootprintData(data)
    } catch (error) {
      console.error("Error creating sample data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Carbon Footprint</h2>
          <p className="text-muted-foreground">Track and reduce your environmental impact</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">Take Assessment</Button>
      </div>

      {!footprintData ? (
        <Card>
          <CardHeader>
            <CardTitle>No Carbon Footprint Data</CardTitle>
            <CardDescription>
              You haven't recorded your carbon footprint yet. Take an assessment or create sample data for
              demonstration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={createSampleData} disabled={loading} className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              {loading ? "Creating..." : "Create Sample Data"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Your Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">{footprintData.total_footprint} tons</div>
                  <div className="text-sm text-muted-foreground">CO₂e/year</div>
                </div>
                <Progress value={percentToAverage} className="h-2 mt-4" />
                <p className="text-xs text-muted-foreground mt-2">{100 - percentToAverage}% below national average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">National Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{nationalAverage} tons</div>
                <div className="text-sm text-muted-foreground">CO₂e/year</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">2030 Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{globalTarget} tons</div>
                <Progress value={percentToTarget} className="h-2 mt-4" />
                <p className="text-xs text-muted-foreground mt-2">You're {percentToTarget}% of the way there</p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Impact Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div className="text-3xl font-bold">2.4 tons</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">CO₂e saved this year</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Footprint Trends</CardTitle>
                  <CardDescription>Your carbon footprint over the last 12 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <CarbonFootprintChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <CarbonCategories data={footprintData} />
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <RecommendationsList />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
