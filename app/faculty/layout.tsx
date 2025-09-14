import type React from "react"
import { FacultySidebar } from "@/components/faculty-sidebar"

export default function FacultyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <FacultySidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
