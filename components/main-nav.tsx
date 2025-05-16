"use client"

import { BarChart3, ShoppingBag, Trophy, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MainNavProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
}

export function MainNav({ activeTab, setActiveTab }: MainNavProps) {
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
    <nav className="flex items-center space-x-2">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          className={`flex items-center gap-2 ${
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
    </nav>
  )
}
