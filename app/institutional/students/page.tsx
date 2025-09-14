"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Building2, Plus, Search, GraduationCap, Calendar } from "lucide-react"

const students = [
  {
    id: 1,
    name: "Arjun Patel",
    rollNo: "20CSE001",
    email: "arjun.patel@student.aditya.edu",
    department: "Computer Science",
    year: "4th Year",
    batch: "2020-2024",
    cgpa: "8.5",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Priya Reddy",
    rollNo: "21ECE045",
    email: "priya.reddy@student.aditya.edu",
    department: "Electronics & Communication",
    year: "3rd Year",
    batch: "2021-2025",
    cgpa: "9.2",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Rahul Kumar",
    rollNo: "22MECH078",
    email: "rahul.kumar@student.aditya.edu",
    department: "Mechanical Engineering",
    year: "2nd Year",
    batch: "2022-2026",
    cgpa: "7.8",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sneha Sharma",
    rollNo: "23CIVIL012",
    email: "sneha.sharma@student.aditya.edu",
    department: "Civil Engineering",
    year: "1st Year",
    batch: "2023-2027",
    cgpa: "8.9",
    status: "Active",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedYear, setSelectedYear] = useState("All")

  const departments = [
    "All",
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
  ]
  const years = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || student.department === selectedDepartment
    const matchesYear = selectedYear === "All" || student.year === selectedYear
    return matchesSearch && matchesDepartment && matchesYear
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage student records and information</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students..."
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
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>{student.rollNo}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {student.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{student.department}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4" />
                  <span>{student.year}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{student.batch}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CGPA:</span>
                  <Badge variant="outline" className="font-semibold">
                    {student.cgpa}
                  </Badge>
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
