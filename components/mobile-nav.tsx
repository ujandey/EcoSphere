"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarChart3, ShoppingBag, Trophy, BookOpen, User } from "lucide-react"
import { EcoLogo } from "@/components/ui/eco-logo"

interface MobileNavProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const navItems = [
    {
      id: "carbon-footprint",
      label: "Carbon Footprint",
      icon: BarChart3,
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: ShoppingBag,
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: Trophy,
    },
    {
      id: "resources",
      label: "Resources",
      icon: BookOpen,
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
  ]

  const handleClick = (id: string) => {
    if (setActiveTab) {
      setActiveTab(id)
    }
  }

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-eco-light-gray hover:text-white hover:bg-eco-gray/30">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-eco-dark border-eco-gray">
          <div className="grid gap-6 py-6">
            <div className="flex items-center gap-3 font-bold text-xl text-eco-bright-green">
              <EcoLogo size="sm" />
              <span>EcoScore</span>
            </div>
            <div className="grid gap-3">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`flex items-center justify-start gap-2 ${
                    activeTab === item.id
                      ? "bg-eco-bright-green hover:bg-eco-dark-green text-eco-dark"
                      : "text-eco-light-gray hover:text-white hover:bg-eco-gray/30"
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
