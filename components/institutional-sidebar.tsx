"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  FileText,
  Settings,
  Trophy,
  UserCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const sidebarItems = [
  {
    title: "Overview",
    href: "/institutional/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Departments",
    href: "/institutional/departments",
    icon: Building2,
  },
  {
    title: "Faculty",
    href: "/institutional/faculty",
    icon: UserCheck,
  },
  {
    title: "Students",
    href: "/institutional/students",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/institutional/analytics",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/institutional/reports",
    icon: FileText,
  },
  {
    title: "Events",
    href: "/institutional/events",
    icon: Calendar,
  },
  {
    title: "Leaderboard",
    href: "/institutional/leaderboard",
    icon: Trophy,
  },
  {
    title: "Settings",
    href: "/institutional/settings",
    icon: Settings,
  },
]

export function InstitutionalSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userData")
    router.push("/")
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Admin Portal</h2>
                <p className="text-xs text-gray-500">Aditya University</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-purple-50 text-purple-700 border border-purple-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed ? "px-3" : "px-3",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  )
}
