"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, UserCheck, Plus, Search, Edit, Trash2 } from "lucide-react"

const departments = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    code: "CSE",
    head: "Dr. Rajesh Kumar",
    faculty: 45,
    students: 1200,
    established: "2010",
    status: "Active",
  },
  {
    id: 2,
    name: "Electronics & Communication",
    code: "ECE",
    head: "Dr. Priya Sharma",
    faculty: 38,
    students: 980,
    established: "2012",
    status: "Active",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    code: "MECH",
    head: "Dr. Suresh Reddy",
    faculty: 42,
    students: 1100,
    established: "2011",
    status: "Active",
  },
  {
    id: 4,
    name: "Civil Engineering",
    code: "CIVIL",
    head: "Dr. Lakshmi Devi",
    faculty: 35,
    students: 850,
    established: "2013",
    status: "Active",
  },
]

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-1">Manage university departments and their information</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <CardDescription>{dept.code}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {dept.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Department Head</span>
                  <span className="font-medium">{dept.head}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Established</span>
                  <span className="font-medium">{dept.established}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-blue-600">
                    <UserCheck className="h-4 w-4" />
                    <span className="text-lg font-semibold">{dept.faculty}</span>
                  </div>
                  <p className="text-xs text-gray-500">Faculty</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-green-600">
                    <Users className="h-4 w-4" />
                    <span className="text-lg font-semibold">{dept.students}</span>
                  </div>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
