import type React from "react"
import StudentSidebar from "@/components/student-sidebar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentSidebar />
      <div className="lg:pl-64">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
