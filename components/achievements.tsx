import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Award, Target, Clock } from "lucide-react"

export function Achievements() {
  // Mock data
  const earnedBadges = [
    {
      id: 1,
      name: "Carbon Reducer",
      description: "Reduced your carbon footprint by 10%",
      date: "Earned 2 months ago",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    },
    {
      id: 2,
      name: "Public Transit Pro",
      description: "Used public transportation 20 times",
      date: "Earned 1 month ago",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: 3,
      name: "Energy Saver",
      description: "Reduced home energy usage by 15%",
      date: "Earned 3 weeks ago",
      icon: Trophy,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
  ]

  const inProgressBadges = [
    {
      id: 4,
      name: "Zero Waste Warrior",
      description: "Reduce your waste to less than 1lb per week",
      progress: 65,
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      id: 5,
      name: "Local Food Champion",
      description: "Purchase food from local sources 10 times",
      progress: 40,
      icon: Award,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ]

  const activeChallenges = [
    {
      id: 1,
      name: "Plastic-Free Week",
      description: "Avoid single-use plastics for 7 days",
      participants: 342,
      daysLeft: 3,
      progress: 57,
    },
    {
      id: 2,
      name: "Meatless May",
      description: "Eat vegetarian meals for the month of May",
      participants: 528,
      daysLeft: 16,
      progress: 48,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">Track your progress and earn rewards</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">3 earned this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">2 active challenges</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Community Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground mt-1">Top 10% of users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Earned Badges</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {earnedBadges.map((badge) => (
                <Card key={badge.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 rounded-full ${badge.bgColor} mb-4`}>
                        <badge.icon className={`h-8 w-8 ${badge.color}`} />
                      </div>
                      <h3 className="font-semibold">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                      <p className="text-xs text-muted-foreground mt-4">{badge.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Badges In Progress</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {inProgressBadges.map((badge) => (
                <Card key={badge.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${badge.bgColor}`}>
                        <badge.icon className={`h-6 w-6 ${badge.color}`} />
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="font-semibold">{badge.name}</h3>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Challenges</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{challenge.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      >
                        Active
                      </Badge>
                    </div>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{challenge.daysLeft} days left</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{challenge.participants} participants</div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Your progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Join a New Challenge</CardTitle>
              <CardDescription>
                Challenges are a great way to reduce your environmental impact and connect with others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Bike to Work Week</h3>
                    <p className="text-sm text-muted-foreground">Starts in 2 days • 156 participants</p>
                  </div>
                  <Badge>Transportation</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Energy Saving Challenge</h3>
                    <p className="text-sm text-muted-foreground">Starts in 5 days • 89 participants</p>
                  </div>
                  <Badge>Home Energy</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Zero Waste Weekend</h3>
                    <p className="text-sm text-muted-foreground">Starts in 9 days • 212 participants</p>
                  </div>
                  <Badge>Consumption</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
