import type React from "react"
import { InstitutionalSidebar } from "@/components/institutional-sidebar"

export default function InstitutionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <InstitutionalSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
