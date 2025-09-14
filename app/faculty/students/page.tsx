"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Trophy,
  BookOpen,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react"

// Mock student data
const students = [
  {
    id: "ST2024001",
    name: "Alexandra Chen",
    email: "alexandra.chen@university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    semester: 6,
    cgpa: 8.7,
    year: "3rd Year",
    status: "active",
    location: "New York, NY",
    profileImage: "/placeholder.svg?height=40&width=40",
    skills: ["React", "Python", "Machine Learning"],
    projects: 8,
    internships: 2,
    achievements: 5,
    codingScore: 2200,
  },
  {
    id: "ST2024002",
    name: "Marcus Johnson",
    email: "marcus.johnson@university.edu",
    phone: "+1 (555) 234-5678",
    department: "Computer Science",
    semester: 4,
    cgpa: 8.2,
    year: "2nd Year",
    status: "active",
    location: "Los Angeles, CA",
    profileImage: "/placeholder.svg?height=40&width=40",
    skills: ["Java", "Spring Boot", "AWS"],
    projects: 5,
    internships: 1,
    achievements: 3,
    codingScore: 1850,
  },
  {
    id: "ST2024003",
    name: "Priya Sharma",
    email: "priya.sharma@university.edu",
    phone: "+1 (555) 345-6789",
    department: "Computer Science",
    semester: 8,
    cgpa: 9.1,
    year: "4th Year",
    status: "active",
    location: "San Francisco, CA",
    profileImage: "/placeholder.svg?height=40&width=40",
    skills: ["Full Stack", "DevOps", "Kubernetes"],
    projects: 12,
    internships: 3,
    achievements: 8,
    codingScore: 2650,
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const viewStudentProfile = (student: any) => {
    setSelectedStudent(student)
  }

  if (selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                ← Back to Students
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
                <p className="text-gray-600">Detailed view of student information</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Profile
              </Button>
            </div>
          </div>

          {/* Student Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={selectedStudent.profileImage || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {selectedStudent.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h2>
                    <p className="text-gray-600">{selectedStudent.id}</p>
                    <Badge variant="outline" className="mt-2">
                      {selectedStudent.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedStudent.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{selectedStudent.department}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Academic Performance */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">CGPA</p>
                        <p className="text-2xl font-bold">{selectedStudent.cgpa}</p>
                      </div>
                      <TrendingUp className="h-6 w-6 opacity-80" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Projects</p>
                        <p className="text-2xl font-bold">{selectedStudent.projects}</p>
                      </div>
                      <BookOpen className="h-6 w-6 opacity-80" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Internships</p>
                        <p className="text-2xl font-bold">{selectedStudent.internships}</p>
                      </div>
                      <Calendar className="h-6 w-6 opacity-80" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90">Achievements</p>
                        <p className="text-2xl font-bold">{selectedStudent.achievements}</p>
                      </div>
                      <Trophy className="h-6 w-6 opacity-80" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Academic Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Department:</span>
                          <span className="font-medium">{selectedStudent.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Year:</span>
                          <span className="font-medium">{selectedStudent.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Semester:</span>
                          <span className="font-medium">{selectedStudent.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">CGPA:</span>
                          <span className="font-medium">{selectedStudent.cgpa}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Performance Metrics</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Coding Score:</span>
                          <span className="font-medium">{selectedStudent.codingScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects Completed:</span>
                          <span className="font-medium">{selectedStudent.projects}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Internships:</span>
                          <span className="font-medium">{selectedStudent.internships}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Achievements:</span>
                          <span className="font-medium">{selectedStudent.achievements}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students Management</h1>
            <p className="text-gray-600">View and manage student profiles</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search students by name, ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.profileImage || "/placeholder.svg"} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.id}</p>
                    <p className="text-sm text-gray-600">{student.department}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CGPA:</span>
                    <span className="font-medium">{student.cgpa}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{student.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-medium">{student.projects}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => viewStudentProfile(student)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
