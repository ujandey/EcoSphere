import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Car, Home, ShoppingCart, Utensils, Plane } from "lucide-react"

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

interface CarbonCategoriesProps {
  data: CarbonFootprintData
}

export function CarbonCategories({ data }: CarbonCategoriesProps) {
  // Create categories from the data
  const categories = [
    {
      name: "Transportation",
      value: data.transportation || 0,
      percentage: Math.round(((data.transportation || 0) / data.total_footprint) * 100),
      icon: Car,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      name: "Home Energy",
      value: data.home_energy || 0,
      percentage: Math.round(((data.home_energy || 0) / data.total_footprint) * 100),
      icon: Home,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
    {
      name: "Food",
      value: data.food || 0,
      percentage: Math.round(((data.food || 0) / data.total_footprint) * 100),
      icon: Utensils,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      name: "Consumption",
      value: data.consumption || 0,
      percentage: Math.round(((data.consumption || 0) / data.total_footprint) * 100),
      icon: ShoppingCart,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      name: "Travel",
      value: data.travel || 0,
      percentage: Math.round(((data.travel || 0) / data.total_footprint) * 100),
      icon: Plane,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-900",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carbon Footprint by Category</CardTitle>
        <CardDescription>Breakdown of your carbon emissions by source</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-full ${category.bgColor}`}>
                    <category.icon className={`h-4 w-4 ${category.color}`} />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold">{category.value}</span>
                  <span className="text-sm text-muted-foreground">tons CO₂e/year</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={category.percentage} className="h-2" />
                <span className="text-sm font-medium">{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
