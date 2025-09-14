"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone, Building2, Plus, Search } from "lucide-react"

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@aditya.edu",
    phone: "+91 9876543210",
    department: "Computer Science",
    designation: "Professor & HOD",
    experience: "15 years",
    qualification: "Ph.D in Computer Science",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    email: "priya.sharma@aditya.edu",
    phone: "+91 9876543211",
    department: "Electronics & Communication",
    designation: "Associate Professor",
    experience: "12 years",
    qualification: "Ph.D in Electronics",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Prof. Suresh Reddy",
    email: "suresh.reddy@aditya.edu",
    phone: "+91 9876543212",
    department: "Mechanical Engineering",
    designation: "Assistant Professor",
    experience: "8 years",
    qualification: "M.Tech in Mechanical",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Dr. Lakshmi Devi",
    email: "lakshmi.devi@aditya.edu",
    phone: "+91 9876543213",
    department: "Civil Engineering",
    designation: "Professor",
    experience: "18 years",
    qualification: "Ph.D in Civil Engineering",
    status: "On Leave",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")

  const departments = [
    "All",
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
  ]

  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || faculty.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
          <p className="text-gray-600 mt-1">Manage faculty members and their information</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((faculty) => (
          <Card key={faculty.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={faculty.avatar || "/placeholder.svg"} alt={faculty.name} />
                  <AvatarFallback>
                    {faculty.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{faculty.name}</CardTitle>
                  <CardDescription>{faculty.designation}</CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    faculty.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {faculty.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{faculty.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{faculty.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{faculty.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{faculty.experience}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Qualification:</span>
                  <span className="font-medium text-xs">{faculty.qualification}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
