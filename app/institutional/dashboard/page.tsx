"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Users,
  TrendingUp,
  BarChart3,
  PieChart,
  Download,
  FileText,
  Award,
  UserPlus,
  Database,
  Target,
  Zap,
  Activity,
  GraduationCap,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Trophy,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

// Mock data for institutional dashboard
const institutionalStats = {
  totalStudents: 12450,
  totalFaculty: 485,
  totalDepartments: 15,
  totalActivities: 8750,
  approvedActivities: 7650,
  totalCredits: 45200,
  averageCGPA: 8.2,
  placementRate: 92,
}

const enrollmentTrends = [
  { year: "2020", students: 10200, faculty: 420, departments: 12 },
  { year: "2021", students: 10800, faculty: 445, departments: 13 },
  { year: "2022", students: 11500, faculty: 460, departments: 14 },
  { year: "2023", students: 12100, faculty: 475, departments: 15 },
  { year: "2024", students: 12450, faculty: 485, departments: 15 },
]

const departmentPerformance = [
  { name: "Computer Science", students: 2850, activities: 2100, avgCGPA: 8.5, placement: 95 },
  { name: "Information Technology", students: 2200, activities: 1650, avgCGPA: 8.3, placement: 93 },
  { name: "Electronics & Communication", students: 1950, activities: 1400, avgCGPA: 8.1, placement: 90 },
  { name: "Mechanical Engineering", students: 1800, activities: 1200, avgCGPA: 7.9, placement: 88 },
  { name: "Civil Engineering", students: 1650, activities: 1100, avgCGPA: 7.8, placement: 85 },
  { name: "Electrical Engineering", students: 1500, activities: 950, avgCGPA: 8.0, placement: 87 },
  { name: "Chemical Engineering", students: 500, activities: 350, avgCGPA: 8.2, placement: 91 },
]

const activityDistribution = [
  { name: "Workshops", value: 2800, color: "#3b82f6" },
  { name: "Internships", value: 2200, color: "#10b981" },
  { name: "Competitions", value: 1500, color: "#f59e0b" },
  { name: "Research", value: 1200, color: "#ef4444" },
  { name: "Certifications", value: 1050, color: "#8b5cf6" },
]

const naacMetrics = [
  { criteria: "Curricular Aspects", score: 85, maxScore: 100, color: "#3b82f6" },
  { criteria: "Teaching-Learning & Evaluation", score: 88, maxScore: 100, color: "#10b981" },
  { criteria: "Research & Innovation", score: 82, maxScore: 100, color: "#f59e0b" },
  { criteria: "Infrastructure & Learning Resources", score: 90, maxScore: 100, color: "#ef4444" },
  { criteria: "Student Support & Progression", score: 87, maxScore: 100, color: "#8b5cf6" },
  { criteria: "Governance & Leadership", score: 85, maxScore: 100, color: "#06b6d4" },
  { criteria: "Institutional Values & Best Practices", score: 89, maxScore: 100, color: "#f97316" },
]

const facultyList = [
  {
    id: "FAC001",
    name: "Dr. Rajesh Kumar",
    department: "Computer Science",
    designation: "Professor & HOD",
    experience: 15,
    qualification: "Ph.D in Computer Science",
    email: "rajesh.kumar@adityauniversity.edu.in",
    studentsSupervised: 45,
    researchPapers: 28,
  },
  {
    id: "FAC002",
    name: "Dr. Priya Sharma",
    department: "Information Technology",
    designation: "Associate Professor",
    experience: 12,
    qualification: "Ph.D in Information Technology",
    email: "priya.sharma@adityauniversity.edu.in",
    studentsSupervised: 38,
    researchPapers: 22,
  },
  {
    id: "FAC003",
    name: "Prof. Amit Patel",
    department: "Electronics & Communication",
    designation: "Assistant Professor",
    experience: 8,
    qualification: "M.Tech in ECE",
    email: "amit.patel@adityauniversity.edu.in",
    studentsSupervised: 25,
    researchPapers: 15,
  },
]

export default function InstitutionalDashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isAddFacultyDialogOpen, setIsAddFacultyDialogOpen] = useState(false)
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    department: "",
    designation: "",
    qualification: "",
    email: "",
    experience: "",
  })
  const router = useRouter()

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    } else {
      router.push("/")
    }
  }, [router])

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleAddFaculty = () => {
    console.log("New faculty added:", newFaculty)
    setNewFaculty({ name: "", department: "", designation: "", qualification: "", email: "", experience: "" })
    setIsAddFacultyDialogOpen(false)
  }

  const filteredFaculty = facultyList.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || faculty.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://erp.adityauniversity.in/getCustomerLogo.json"
                alt="Aditya University"
                className="h-10 w-10 rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?key=logo"
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Institutional Management</h1>
                <p className="text-sm text-gray-600">Strategic Analytics & Administration</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isAddFacultyDialogOpen} onOpenChange={setIsAddFacultyDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Faculty
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Faculty Member</DialogTitle>
                    <DialogDescription>Register a new faculty member in the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="faculty-name">Full Name</Label>
                        <Input
                          id="faculty-name"
                          placeholder="Enter faculty name"
                          value={newFaculty.name}
                          onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={newFaculty.department}
                          onValueChange={(value) => setNewFaculty({ ...newFaculty, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Information Technology">Information Technology</SelectItem>
                            <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                            <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                            <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Select
                          value={newFaculty.designation}
                          onValueChange={(value) => setNewFaculty({ ...newFaculty, designation: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select designation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Professor">Professor</SelectItem>
                            <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                            <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                            <SelectItem value="Lecturer">Lecturer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience (Years)</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="Enter years of experience"
                          value={newFaculty.experience}
                          onChange={(e) => setNewFaculty({ ...newFaculty, experience: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        placeholder="Enter highest qualification"
                        value={newFaculty.qualification}
                        onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddFacultyDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddFaculty}>Add Faculty</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  localStorage.removeItem("userData")
                  localStorage.removeItem("userType")
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome, Admin User!</h2>
                  <p className="text-purple-100 text-lg">Institutional Management • Strategic Oversight</p>
                  <p className="text-purple-200">Comprehensive analytics and institutional governance</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-200 mb-1">Total Students</div>
                  <div className="text-4xl font-bold">{institutionalStats.totalStudents.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {institutionalStats.totalStudents.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Faculty Members</p>
                  <p className="text-2xl font-bold text-green-600">{institutionalStats.totalFaculty}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-purple-600">{institutionalStats.totalDepartments}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Placement Rate</p>
                  <p className="text-2xl font-bold text-orange-600">{institutionalStats.placementRate}%</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="naac">NAAC Reports</TabsTrigger>
            <TabsTrigger value="nirf">NIRF Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Enrollment Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={enrollmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="students" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Activity Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={activityDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {activityDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <Activity className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{institutionalStats.totalActivities.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Total Activities</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{institutionalStats.approvedActivities.toLocaleString()}</div>
                  <div className="text-sm text-green-100">Approved Activities</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{institutionalStats.totalCredits.toLocaleString()}</div>
                  <div className="text-sm text-purple-100">Total Credits</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{institutionalStats.averageCGPA}</div>
                  <div className="text-sm text-orange-100">Average CGPA</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Department Performance</span>
                </CardTitle>
                <CardDescription>Comprehensive overview of all departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentPerformance.map((dept, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{dept.name}</h3>
                          <Badge variant="outline">{dept.students} Students</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-xl font-bold text-blue-600">{dept.students}</div>
                            <div className="text-gray-600">Students</div>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-xl font-bold text-green-600">{dept.activities}</div>
                            <div className="text-gray-600">Activities</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-lg">
                            <div className="text-xl font-bold text-purple-600">{dept.avgCGPA}</div>
                            <div className="text-gray-600">Avg CGPA</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-xl font-bold text-orange-600">{dept.placement}%</div>
                            <div className="text-gray-600">Placement</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Faculty Tab */}
          <TabsContent value="faculty" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Faculty Management</span>
                    </CardTitle>
                    <CardDescription>Manage faculty members and their profiles</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddFacultyDialogOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Faculty
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search faculty by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Departments</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Electronics & Communication">Electronics & Communication</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFaculty.map((faculty) => (
                    <Card key={faculty.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <div>
                                <h3 className="text-lg font-semibold">{faculty.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {faculty.id} • {faculty.designation} • {faculty.department}
                                </p>
                                <p className="text-sm text-gray-500">{faculty.email}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Experience:</span>
                                <span className="ml-2 font-semibold text-blue-600">{faculty.experience} years</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Qualification:</span>
                                <span className="ml-2 font-semibold text-green-600">{faculty.qualification}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Students:</span>
                                <span className="ml-2 font-semibold text-purple-600">{faculty.studentsSupervised}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Papers:</span>
                                <span className="ml-2 font-semibold text-orange-600">{faculty.researchPapers}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 bg-transparent">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NAAC Reports Tab */}
          <TabsContent value="naac" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>NAAC Assessment Reports</span>
                </CardTitle>
                <CardDescription>National Assessment and Accreditation Council compliance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">A+</div>
                        <div className="text-lg font-semibold text-blue-800">NAAC Grade</div>
                        <div className="text-sm text-blue-600">Accredited with Grade A+</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">3.65</div>
                        <div className="text-lg font-semibold text-green-800">CGPA Score</div>
                        <div className="text-sm text-green-600">Out of 4.0</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Criteria-wise Performance</h3>
                    {naacMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{metric.criteria}</span>
                          <span className="text-gray-600">
                            {metric.score}/{metric.maxScore}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{
                              width: `${(metric.score / metric.maxScore) * 100}%`,
                              backgroundColor: metric.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-20 flex-col space-y-2 bg-transparent border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                      <FileText className="h-6 w-6" />
                      <span>Download NAAC Report</span>
                    </Button>
                    <Button className="h-20 flex-col space-y-2 bg-transparent border-2 border-green-200 text-green-600 hover:bg-green-50">
                      <Download className="h-6 w-6" />
                      <span>Export Metrics</span>
                    </Button>
                    <Button className="h-20 flex-col space-y-2 bg-transparent border-2 border-purple-200 text-purple-600 hover:bg-purple-50">
                      <BarChart3 className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NIRF Reports Tab */}
          <TabsContent value="nirf" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>NIRF Ranking Reports</span>
                </CardTitle>
                <CardDescription>National Institutional Ranking Framework performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl font-bold text-yellow-600 mb-2">85</div>
                        <div className="text-lg font-semibold text-yellow-800">Overall Rank</div>
                        <div className="text-sm text-yellow-600">Engineering Category</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">78.5</div>
                        <div className="text-lg font-semibold text-purple-800">Total Score</div>
                        <div className="text-sm text-purple-600">Out of 100</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl font-bold text-indigo-600 mb-2">↑12</div>
                        <div className="text-lg font-semibold text-indigo-800">Rank Improvement</div>
                        <div className="text-sm text-indigo-600">From last year</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Parameter-wise Scores</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Teaching, Learning & Resources</span>
                            <Badge variant="outline">82/100</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Research & Professional Practice</span>
                            <Badge variant="outline">75/100</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Graduation Outcomes</span>
                            <Badge variant="outline">88/100</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Outreach & Inclusivity</span>
                            <Badge variant="outline">72/100</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Perception</span>
                            <Badge variant="outline">68/100</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Key Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">92% Placement Rate</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">485 Faculty Members</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">12,450 Students Enrolled</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">850+ Research Publications</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">15 Academic Departments</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-20 flex-col space-y-2 bg-transparent border-2 border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                      <FileText className="h-6 w-6" />
                      <span>Download NIRF Report</span>
                    </Button>
                    <Button className="h-20 flex-col space-y-2 bg-transparent border-2 border-purple-200 text-purple-600 hover:bg-purple-50">
                      <TrendingUp className="h-6 w-6" />
                      <span>View Trends</span>
                    </Button>
                    <Button className="h-20 flex-col space-y-2 bg-transparent border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                      <Target className="h-6 w-6" />
                      <span>Improvement Plan</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Department Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Growth Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} />
                      <Line type="monotone" dataKey="faculty" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Generate custom reports with specific parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-24 flex-col space-y-2 bg-transparent border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Database className="h-6 w-6" />
                    <span>Student Data Export</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2 bg-transparent border-2 border-green-200 text-green-600 hover:bg-green-50">
                    <Users className="h-6 w-6" />
                    <span>Faculty Report</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2 bg-transparent border-2 border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Award className="h-6 w-6" />
                    <span>Activity Summary</span>
                  </Button>
                  <Button className="h-24 flex-col space-y-2 bg-transparent border-2 border-orange-200 text-orange-600 hover:bg-orange-50">
                    <TrendingUp className="h-6 w-6" />
                    <span>Performance Metrics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
