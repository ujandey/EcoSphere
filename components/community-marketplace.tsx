import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Calendar, Users } from "lucide-react"

export function CommunityMarketplace() {
  // Mock data
  const localBusinesses = [
    {
      id: 1,
      name: "Green Grocers",
      description: "Local organic produce and zero-waste grocery store",
      distance: "0.8 miles away",
      category: "Food & Grocery",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "EcoCycle Repair Shop",
      description: "Bicycle repair and sustainable transportation solutions",
      distance: "1.2 miles away",
      category: "Transportation",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Second Nature Thrift",
      description: "Quality second-hand clothing and household items",
      distance: "0.5 miles away",
      category: "Shopping",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 4,
      name: "Renewable Energy Co-op",
      description: "Community-owned renewable energy provider",
      distance: "Virtual",
      category: "Energy",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const communityEvents = [
    {
      id: 1,
      name: "Community Garden Day",
      description: "Help plant and maintain the local community garden",
      date: "May 22, 2023 • 10:00 AM",
      location: "Central Park Community Garden",
      attendees: 18,
    },
    {
      id: 2,
      name: "Repair Café",
      description: "Bring your broken items to be fixed by volunteer experts",
      date: "May 28, 2023 • 1:00 PM",
      location: "Downtown Community Center",
      attendees: 32,
    },
    {
      id: 3,
      name: "Sustainable Living Workshop",
      description: "Learn practical tips for reducing waste at home",
      date: "June 5, 2023 • 6:30 PM",
      location: "Public Library, Room 3B",
      attendees: 24,
    },
  ]

  const marketplaceItems = [
    {
      id: 1,
      name: "Bamboo Cutlery Set",
      description: "Barely used sustainable cutlery set",
      price: "Free",
      owner: "Alex K.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Organic Vegetable Seeds",
      description: "Extra seeds from my garden - various vegetables",
      price: "$5 or trade",
      owner: "Jamie T.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Solar Charger",
      description: "Portable solar charger for phones and small devices",
      price: "$15",
      owner: "Sam L.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Marketplace</h1>
          <p className="text-muted-foreground">Connect with local sustainable businesses and community</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search marketplace..." className="pl-8" />
          </div>
          <Button className="bg-green-600 hover:bg-green-700">Add Listing</Button>
        </div>
      </div>

      <Tabs defaultValue="businesses">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="businesses">Eco-Businesses</TabsTrigger>
          <TabsTrigger value="events">Community Events</TabsTrigger>
          <TabsTrigger value="exchange">Item Exchange</TabsTrigger>
        </TabsList>

        <TabsContent value="businesses" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {localBusinesses.map((business) => (
              <Card key={business.id}>
                <CardContent className="p-0">
                  <div className="flex gap-4 p-6">
                    <img
                      src={business.image || "/placeholder.svg"}
                      alt={business.name}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className="space-y-1">
                      <h3 className="font-semibold">{business.name}</h3>
                      <p className="text-sm text-muted-foreground">{business.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{business.distance}</span>
                        <Badge variant="outline" className="ml-2">
                          {business.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {communityEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{event.attendees} attending</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Join Event</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exchange" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {marketplaceItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-48 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-medium">{item.price}</span>
                      <span className="text-sm text-muted-foreground">Listed by {item.owner}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline" className="w-full">
                    Contact Owner
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
