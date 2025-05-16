import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Home, ShoppingCart, Utensils, Leaf } from "lucide-react"

export function RecommendationsList() {
  // Mock data
  const recommendations = [
    {
      id: 1,
      title: "Switch to renewable energy",
      description: "Change your home electricity to a renewable energy provider.",
      impact: 1.2,
      category: "Home Energy",
      icon: Home,
      difficulty: "Medium",
      badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      title: "Reduce meat consumption",
      description: "Try having 2-3 meat-free days per week to reduce your food footprint.",
      impact: 0.8,
      category: "Food",
      icon: Utensils,
      difficulty: "Easy",
      badgeColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      iconColor: "text-green-500",
    },
    {
      id: 3,
      title: "Use public transportation",
      description: "Take public transit instead of driving for your daily commute.",
      impact: 1.5,
      category: "Transportation",
      icon: Car,
      difficulty: "Medium",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      iconColor: "text-blue-500",
    },
    {
      id: 4,
      title: "Buy second-hand items",
      description: "Purchase used items instead of new when possible.",
      impact: 0.4,
      category: "Consumption",
      icon: ShoppingCart,
      difficulty: "Easy",
      badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      iconColor: "text-purple-500",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle>{recommendation.title}</CardTitle>
                <CardDescription>{recommendation.description}</CardDescription>
              </div>
              <div className={`p-2 rounded-full ${recommendation.badgeColor.split(" ").slice(0, 2).join(" ")}`}>
                <recommendation.icon className={`h-5 w-5 ${recommendation.iconColor}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="font-medium">{recommendation.impact} tons CO₂e/year potential savings</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={recommendation.badgeColor}>
                {recommendation.category}
              </Badge>
              <Badge variant="outline">{recommendation.difficulty} difficulty</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700">Add to Goals</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
