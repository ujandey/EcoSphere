import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, FileText, ExternalLink } from "lucide-react"

export function ResourceHub() {
  // Mock data
  const articles = [
    {
      id: 1,
      title: "10 Simple Ways to Reduce Your Carbon Footprint",
      description: "Easy changes you can make today to live more sustainably.",
      readTime: "5 min read",
      category: "Lifestyle",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Understanding Carbon Offsets: A Complete Guide",
      description: "Learn how carbon offsets work and how to choose effective ones.",
      readTime: "8 min read",
      category: "Climate Science",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "The Impact of Food Choices on Climate Change",
      description: "How your diet affects your carbon footprint and the planet.",
      readTime: "6 min read",
      category: "Food",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Home Energy Efficiency: A Room-by-Room Guide",
      description: "Practical tips to reduce energy usage throughout your home.",
      readTime: "10 min read",
      category: "Home Energy",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const videos = [
    {
      id: 1,
      title: "How to Start Composting at Home",
      description: "A beginner's guide to composting in any living situation.",
      duration: "12:34",
      creator: "EcoLiving Channel",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Zero Waste Shopping Tips",
      description: "Practical ways to reduce packaging waste when shopping.",
      duration: "8:45",
      creator: "Sustainable Sarah",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Understanding Your Carbon Footprint",
      description: "Breaking down the science of carbon emissions in everyday life.",
      duration: "15:20",
      creator: "Climate Clarity",
      thumbnail: "/placeholder.svg?height=200&width=400",
    },
  ]

  const guides = [
    {
      id: 1,
      title: "Beginner's Guide to Sustainable Living",
      description: "A comprehensive guide for those new to sustainability.",
      pages: 24,
      format: "PDF",
      icon: FileText,
    },
    {
      id: 2,
      title: "Home Energy Audit Checklist",
      description: "Step-by-step guide to finding energy inefficiencies in your home.",
      pages: 8,
      format: "PDF",
      icon: FileText,
    },
    {
      id: 3,
      title: "Seasonal Food Guide",
      description: "What foods are in season each month for lower-impact eating.",
      pages: 12,
      format: "PDF",
      icon: FileText,
    },
    {
      id: 4,
      title: "Eco-Friendly Product Directory",
      description: "Vetted sustainable alternatives for everyday products.",
      pages: 18,
      format: "PDF",
      icon: FileText,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Hub</h1>
        <p className="text-muted-foreground">Educational resources to help you live more sustainably</p>
      </div>

      <Tabs defaultValue="articles">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="guides">Guides & Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-1">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Read Article
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{video.creator}</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Video className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <Card key={guide.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="line-clamp-1">{guide.title}</CardTitle>
                    <guide.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{guide.format}</Badge>
                    <span className="text-sm text-muted-foreground">{guide.pages} pages</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Download Guide</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>External Resources</CardTitle>
              <CardDescription>Helpful links to other sustainability resources around the web</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">UN Sustainable Development Goals</h3>
                    <p className="text-sm text-muted-foreground">Official UN resource on global sustainability goals</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">EPA Carbon Footprint Calculator</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed calculator from the Environmental Protection Agency
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Global Footprint Network</h3>
                    <p className="text-sm text-muted-foreground">
                      Research organization focused on ecological footprints
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
