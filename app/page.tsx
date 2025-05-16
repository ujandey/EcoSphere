import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { EcoLogo } from "@/components/ui/eco-logo"
import { ArrowRight, Leaf, BarChart3, Users, Globe, ChevronDown } from "lucide-react"

export default async function Home() {
  const supabase = createClient()

  // Check if user is already authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-eco-dark text-white">
      <header className="sticky top-0 z-40 border-b border-eco-gray bg-eco-dark/95 backdrop-blur supports-[backdrop-filter]:bg-eco-dark/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <EcoLogo size="md" />
            <span className="font-bold text-xl text-eco-bright-green">EcoScore</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-eco-light-gray hover:text-eco-bright-green transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-eco-light-gray hover:text-eco-bright-green transition-colors">
              How It Works
            </Link>
            <Link href="#community" className="text-eco-light-gray hover:text-eco-bright-green transition-colors">
              Community
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-eco-light-gray hover:text-white hover:bg-eco-gray">
                Login
              </Button>
            </Link>
            <Link href="/login?tab=register">
              <Button className="bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-eco-dark-green opacity-20 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-eco-bright-green opacity-10 blur-3xl"></div>
            <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-eco-bright-green opacity-10 blur-2xl"></div>

            {/* Animated leaf patterns */}
            <div className="absolute top-1/4 left-1/3 text-eco-bright-green opacity-10 animate-float">
              <Leaf size={120} />
            </div>
            <div
              className="absolute bottom-1/4 right-1/4 text-eco-dark-green opacity-10 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Leaf size={80} />
            </div>
            <div
              className="absolute top-1/2 right-1/3 text-eco-bright-green opacity-10 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Leaf size={100} />
            </div>
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-full bg-eco-gray/30 px-3 py-1 text-sm text-eco-bright-green mb-2">
                  Sustainable Living Made Simple
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                  <span className="text-eco-bright-green">Track</span>,{" "}
                  <span className="text-eco-bright-green">Reduce</span>, and{" "}
                  <span className="text-eco-bright-green">Transform</span> Your Environmental Impact
                </h1>
                <p className="max-w-[600px] text-eco-light-gray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join a community of eco-conscious individuals making a real difference. EcoScore helps you understand
                  your carbon footprint and take meaningful action.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/login?tab=register">
                    <Button size="lg" className="bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark">
                      Start Your Eco Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-eco-gray text-eco-light-gray hover:text-white hover:bg-eco-gray/30"
                    >
                      Learn How It Works
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto lg:mx-0 lg:flex-1">
                {/* Dashboard Preview with Animation */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-eco-dark-green to-eco-bright-green opacity-20 blur-xl animate-pulse-slow"></div>
                  <div className="relative bg-eco-gray/20 backdrop-blur-sm border border-eco-gray/30 rounded-xl overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-eco-dark flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="pt-8">
                      <img
                        alt="EcoScore Dashboard"
                        className="w-full aspect-video object-cover object-center"
                        src="/placeholder.svg?height=400&width=600"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-eco-dark-green/90 rounded-lg p-3 shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-eco-bright-green rounded-full">
                      <Leaf className="h-4 w-4 text-eco-dark" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">Carbon Reduced</div>
                      <div className="text-sm font-bold">-24% This Month</div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -left-4 bg-eco-gray/90 rounded-lg p-3 shadow-lg animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-eco-bright-green rounded-full">
                      <Users className="h-4 w-4 text-eco-dark" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">Community</div>
                      <div className="text-sm font-bold">10k+ Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <span className="text-eco-light-gray text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="h-6 w-6 text-eco-bright-green animate-bounce" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-eco-dark to-eco-gray">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-full bg-eco-gray/30 px-3 py-1 text-sm text-eco-bright-green">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Smart Tools for a <span className="text-eco-bright-green">Greener Future</span>
              </h2>
              <p className="max-w-[800px] text-eco-light-gray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                EcoScore provides everything you need to understand and reduce your environmental impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative overflow-hidden rounded-xl bg-eco-gray/20 border border-eco-gray/30 p-6 transition-all hover:bg-eco-gray/30 hover:shadow-lg">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full bg-eco-bright-green opacity-20 blur-2xl transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Carbon Tracking</h3>
                  <p className="text-eco-light-gray">
                    Accurately measure your carbon footprint across transportation, food, energy, and more with our
                    intuitive dashboard.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative overflow-hidden rounded-xl bg-eco-gray/20 border border-eco-gray/30 p-6 transition-all hover:bg-eco-gray/30 hover:shadow-lg">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full bg-eco-bright-green opacity-20 blur-2xl transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Personalized Recommendations</h3>
                  <p className="text-eco-light-gray">
                    Get customized suggestions to reduce your environmental impact based on your unique lifestyle and
                    habits.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative overflow-hidden rounded-xl bg-eco-gray/20 border border-eco-gray/30 p-6 transition-all hover:bg-eco-gray/30 hover:shadow-lg">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full bg-eco-bright-green opacity-20 blur-2xl transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Community Marketplace</h3>
                  <p className="text-eco-light-gray">
                    Connect with local sustainable businesses, join community events, and exchange eco-friendly items.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group relative overflow-hidden rounded-xl bg-eco-gray/20 border border-eco-gray/30 p-6 transition-all hover:bg-eco-gray/30 hover:shadow-lg">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full bg-eco-bright-green opacity-20 blur-2xl transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Eco Challenges</h3>
                  <p className="text-eco-light-gray">
                    Join fun challenges that make sustainability engaging and rewarding, with points and badges to track
                    your progress.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="group relative overflow-hidden rounded-xl bg-eco-gray/20 border border-eco-gray/30 p-6 transition-all hover:bg-eco-gray/30 hover:shadow-lg md:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-8 -translate-y-8 transform rounded-full bg-eco-bright-green opacity-20 blur-2xl transition-all duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:opacity-30"></div>
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 2v8"></path>
                      <path d="m4.93 10.93 1.41 1.41"></path>
                      <path d="M2 18h2"></path>
                      <path d="M20 18h2"></path>
                      <path d="m19.07 10.93-1.41 1.41"></path>
                      <path d="M22 22H2"></path>
                      <path d="M16 6 8 14"></path>
                      <path d="M16 14 8 6"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">AI-Powered Assistant</h3>
                  <p className="text-eco-light-gray">
                    Get personalized advice and answers to your sustainability questions from our intelligent
                    eco-assistant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-eco-dark">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-full bg-eco-gray/30 px-3 py-1 text-sm text-eco-bright-green">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your Journey to <span className="text-eco-bright-green">Sustainable Living</span>
              </h2>
              <p className="max-w-[800px] text-eco-light-gray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Four simple steps to reduce your environmental impact and live more sustainably
              </p>
            </div>

            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-eco-gray/30 transform -translate-x-1/2 hidden md:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {/* Step 1 */}
                <div className="md:text-right md:pr-12 relative">
                  <div className="absolute right-0 top-0 transform translate-x-1/2 w-12 h-12 rounded-full bg-eco-dark-green text-eco-bright-green flex items-center justify-center font-bold text-xl hidden md:flex">
                    1
                  </div>
                  <div className="md:hidden mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green font-bold text-xl">
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Create Your Account</h3>
                  <p className="text-eco-light-gray">
                    Sign up in seconds and join a community of environmentally conscious individuals making a
                    difference.
                  </p>
                </div>

                {/* Step 1 Image */}
                <div className="bg-eco-gray/20 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Create account"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step 2 Image */}
                <div className="bg-eco-gray/20 rounded-xl overflow-hidden shadow-lg md:order-3">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Track footprint"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step 2 */}
                <div className="md:text-left md:pl-12 relative md:order-4">
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 w-12 h-12 rounded-full bg-eco-dark-green text-eco-bright-green flex items-center justify-center font-bold text-xl hidden md:flex">
                    2
                  </div>
                  <div className="md:hidden mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green font-bold text-xl">
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Track Your Footprint</h3>
                  <p className="text-eco-light-gray">
                    Complete a simple assessment to understand your current carbon footprint across different
                    categories.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="md:text-right md:pr-12 relative md:order-5">
                  <div className="absolute right-0 top-0 transform translate-x-1/2 w-12 h-12 rounded-full bg-eco-dark-green text-eco-bright-green flex items-center justify-center font-bold text-xl hidden md:flex">
                    3
                  </div>
                  <div className="md:hidden mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green font-bold text-xl">
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Get Personalized Recommendations</h3>
                  <p className="text-eco-light-gray">
                    Receive tailored suggestions based on your lifestyle to help you reduce your environmental impact.
                  </p>
                </div>

                {/* Step 3 Image */}
                <div className="bg-eco-gray/20 rounded-xl overflow-hidden shadow-lg md:order-6">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Get recommendations"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step 4 Image */}
                <div className="bg-eco-gray/20 rounded-xl overflow-hidden shadow-lg md:order-7">
                  <img
                    src="/placeholder.svg?height=300&width=500"
                    alt="Track progress"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Step 4 */}
                <div className="md:text-left md:pl-12 relative md:order-8">
                  <div className="absolute left-0 top-0 transform -translate-x-1/2 w-12 h-12 rounded-full bg-eco-dark-green text-eco-bright-green flex items-center justify-center font-bold text-xl hidden md:flex">
                    4
                  </div>
                  <div className="md:hidden mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-eco-dark-green text-eco-bright-green font-bold text-xl">
                    4
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Track Your Progress</h3>
                  <p className="text-eco-light-gray">
                    Watch your carbon footprint decrease over time as you implement changes and complete eco-challenges.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/login?tab=register">
                <Button size="lg" className="bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark">
                  Start Your Journey Today
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-eco-gray to-eco-dark">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-2xl bg-eco-dark-green p-8 md:p-12">
              {/* Background Elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-eco-bright-green opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-eco-bright-green opacity-10 blur-3xl"></div>

                {/* Animated leaf patterns */}
                <div className="absolute top-1/4 right-1/4 text-eco-bright-green opacity-10 animate-float">
                  <Leaf size={80} />
                </div>
                <div
                  className="absolute bottom-1/4 left-1/4 text-white opacity-10 animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <Leaf size={60} />
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-6">
                  Ready to Make a <span className="text-eco-bright-green">Difference</span>?
                </h2>
                <p className="max-w-[600px] text-white/80 md:text-xl/relaxed mb-8">
                  Join thousands of eco-conscious individuals who are already reducing their carbon footprint and making
                  a positive impact on our planet.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/login?tab=register">
                    <Button
                      size="lg"
                      className="bg-white hover:bg-eco-bright-green hover:text-eco-dark text-eco-dark-green"
                    >
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-eco-gray py-12 bg-eco-dark">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <EcoLogo size="md" />
                <span className="font-bold text-xl text-eco-bright-green">EcoScore</span>
              </div>
              <p className="text-eco-light-gray mb-4">Helping you reduce your carbon footprint one step at a time.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-eco-light-gray hover:text-eco-bright-green">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-eco-light-gray hover:text-eco-bright-green">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-eco-light-gray hover:text-eco-bright-green">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-eco-gray flex flex-col md:flex-row justify-between items-center">
            <p className="text-eco-light-gray text-sm">
              &copy; {new Date().getFullYear()} EcoScore. All rights reserved.
            </p>
            <p className="text-eco-light-gray text-sm mt-4 md:mt-0">Made with 💚 for a greener planet</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
