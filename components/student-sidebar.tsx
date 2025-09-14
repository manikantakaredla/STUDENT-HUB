"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Activity,
  Award,
  User,
  Briefcase,
  Target,
  Menu,
  X,
  GraduationCap,
  Trophy,
  TrendingUp,
  Settings,
} from "lucide-react"

const navigation = [
  { name: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
  { name: "Activities", href: "/student/activities", icon: Activity },
  { name: "Skills", href: "/student/skills", icon: Target },
  { name: "Portfolio", href: "/student/portfolio", icon: User },
  { name: "Career Hub", href: "/student/career", icon: Briefcase },
  { name: "Resume Builder", href: "/student/resume", icon: Award },
  { name: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
  { name: "Progress", href: "/student/progress", icon: TrendingUp },
  { name: "Settings", href: "/student/settings", icon: Settings },
]

export default function StudentSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Student Portal</h1>
              <p className="text-xs text-gray-600">Smart Hub</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">AC</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Alexandra Chen</p>
                <p className="text-xs text-gray-600">ST2024001</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
