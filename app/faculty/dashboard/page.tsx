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
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Upload,
  Download,
  FileSpreadsheet,
  UserPlus,
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Eye,
  MessageSquare,
  Filter,
  BarChart3,
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for faculty dashboard
const pendingActivities = [
  {
    id: 1,
    studentName: "Alexandra Chen",
    studentId: "ST2024001",
    title: "Machine Learning Workshop",
    type: "Workshop",
    category: "activities",
    date: "2024-01-15",
    description: "Attended comprehensive ML workshop covering supervised and unsupervised learning",
    documents: ["certificate.pdf"],
    submittedDate: "2024-01-16",
    department: "Computer Science",
  },
  {
    id: 2,
    studentName: "John Smith",
    studentId: "ST2024002",
    title: "Research Paper Publication",
    type: "Research",
    category: "achievements",
    date: "2024-01-10",
    description: "Published research paper on neural networks in IEEE conference",
    documents: ["research_paper.pdf", "acceptance_letter.pdf"],
    submittedDate: "2024-01-12",
    department: "Computer Science",
  },
  {
    id: 3,
    studentName: "Sarah Johnson",
    studentId: "ST2024003",
    title: "Hackathon Participation",
    type: "Competition",
    category: "activities",
    date: "2024-01-08",
    description: "Participated in university-wide hackathon with AI-powered solution",
    documents: ["participation_certificate.pdf"],
    submittedDate: "2024-01-09",
    department: "Information Technology",
  },
]

const studentsList = [
  {
    id: "ST2024001",
    name: "Alexandra Chen",
    department: "Computer Science",
    semester: "6th",
    cgpa: 9.2,
    attendance: 94,
    totalActivities: 28,
    approvedActivities: 24,
    totalCredits: 42,
    email: "alexandra.chen@student.adityauniversity.edu.in",
  },
  {
    id: "ST2024002",
    name: "John Smith",
    department: "Computer Science",
    semester: "4th",
    cgpa: 8.7,
    attendance: 89,
    totalActivities: 15,
    approvedActivities: 12,
    totalCredits: 28,
    email: "john.smith@student.adityauniversity.edu.in",
  },
  {
    id: "ST2024003",
    name: "Sarah Johnson",
    department: "Information Technology",
    semester: "6th",
    cgpa: 8.9,
    attendance: 92,
    totalActivities: 22,
    approvedActivities: 18,
    totalCredits: 35,
    email: "sarah.johnson@student.adityauniversity.edu.in",
  },
]

const analyticsData = [
  { month: "Jan", submissions: 45, approvals: 38, rejections: 7 },
  { month: "Feb", submissions: 52, approvals: 44, rejections: 8 },
  { month: "Mar", submissions: 38, approvals: 32, rejections: 6 },
  { month: "Apr", submissions: 61, approvals: 55, rejections: 6 },
  { month: "May", submissions: 48, approvals: 41, rejections: 7 },
  { month: "Jun", submissions: 35, approvals: 30, rejections: 5 },
]

const departmentData = [
  { name: "Computer Science", value: 45, color: "#3b82f6" },
  { name: "Information Technology", value: 32, color: "#10b981" },
  { name: "Electronics", value: 28, color: "#f59e0b" },
  { name: "Mechanical", value: 25, color: "#ef4444" },
  { name: "Civil", value: 20, color: "#8b5cf6" },
]

export default function FacultyDashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isExcelDialogOpen, setIsExcelDialogOpen] = useState(false)
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    department: "",
    semester: "",
    email: "",
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

  const handleApproveActivity = (activityId: number, credits = 2) => {
    console.log(`Approved activity ${activityId} with ${credits} credits`)
    // In real app, update database
  }

  const handleRejectActivity = (activityId: number) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason")
      return
    }
    console.log(`Rejected activity ${activityId} with reason: ${rejectionReason}`)
    setRejectionReason("")
    setSelectedActivity(null)
    // In real app, update database
  }

  const handleExcelUpload = () => {
    console.log("Excel file uploaded and processed")
    setIsExcelDialogOpen(false)
    // In real app, process Excel file
  }

  const handleAddStudent = () => {
    console.log("New student added:", newStudent)
    setNewStudent({ name: "", studentId: "", department: "", semester: "", email: "" })
    setIsAddStudentDialogOpen(false)
    // In real app, add to database
  }

  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const stats = {
    totalStudents: studentsList.length,
    pendingApprovals: pendingActivities.length,
    totalSubmissions: 156,
    approvalRate: 87,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
                <h1 className="text-xl font-bold text-gray-900">Faculty Dashboard</h1>
                <p className="text-sm text-gray-600">Activity Management & Student Oversight</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isExcelDialogOpen} onOpenChange={setIsExcelDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Excel
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Student Activity Data</DialogTitle>
                    <DialogDescription>
                      Upload an Excel file with student activity data to bulk update records
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop your Excel file</p>
                      <p className="text-xs text-gray-500">
                        Required columns: Name, Roll No, Class, Branch, College, Activity Name, Credits
                      </p>
                      <Button variant="outline" className="mt-4 bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsExcelDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleExcelUpload}>Process Upload</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog open={isAddStudentDialogOpen} onOpenChange={setIsAddStudentDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>Register a new student in the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-name">Full Name</Label>
                        <Input
                          id="student-name"
                          placeholder="Enter student name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input
                          id="student-id"
                          placeholder="Enter student ID"
                          value={newStudent.studentId}
                          onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="Enter department"
                          value={newStudent.department}
                          onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Input
                          id="semester"
                          placeholder="Enter semester"
                          value={newStudent.semester}
                          onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddStudentDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddStudent}>Add Student</Button>
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
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome, Dr. Smith!</h2>
                  <p className="text-green-100 text-lg">Computer Science Department • Faculty Coordinator</p>
                  <p className="text-green-200">Managing student activities and academic progress</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-200 mb-1">Pending Approvals</div>
                  <div className="text-4xl font-bold">{stats.pendingApprovals}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalStudents}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalSubmissions}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approvalRate}%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Pending Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Pending Activity Approvals</span>
                </CardTitle>
                <CardDescription>Review and approve student activity submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingActivities.map((activity) => (
                    <Card key={activity.id} className="border-l-4 border-l-yellow-400">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{activity.title}</h3>
                              <Badge variant="outline">{activity.type}</Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                {activity.category === "achievements" ? "Achievement" : "Activity"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm text-gray-600">
                                  <strong>Student:</strong> {activity.studentName} ({activity.studentId})
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Department:</strong> {activity.department}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">
                                  <strong>Activity Date:</strong> {activity.date}
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Submitted:</strong> {activity.submittedDate}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{activity.description}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>Documents: {activity.documents.join(", ")}</span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveActivity(activity.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                                  onClick={() => setSelectedActivity(activity)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Reject Activity Submission</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for rejecting this activity submission
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="rejection-reason">Rejection Reason</Label>
                                    <Textarea
                                      id="rejection-reason"
                                      placeholder="Enter the reason for rejection..."
                                      value={rejectionReason}
                                      onChange={(e) => setRejectionReason(e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button variant="destructive" onClick={() => handleRejectActivity(activity.id)}>
                                      Reject Activity
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
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

          {/* Student Management Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Student Management</span>
                    </CardTitle>
                    <CardDescription>Search and manage student records</CardDescription>
                  </div>
                  <Button onClick={() => setIsAddStudentDialogOpen(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search by name or student ID..."
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
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <div>
                                <h3 className="text-lg font-semibold">{student.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {student.id} • {student.department} • {student.semester} Semester
                                </p>
                                <p className="text-sm text-gray-500">{student.email}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">CGPA:</span>
                                <span className="ml-2 font-semibold text-blue-600">{student.cgpa}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Attendance:</span>
                                <span className="ml-2 font-semibold text-green-600">{student.attendance}%</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Activities:</span>
                                <span className="ml-2 font-semibold text-purple-600">{student.totalActivities}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Approved:</span>
                                <span className="ml-2 font-semibold text-green-600">{student.approvedActivities}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Credits:</span>
                                <span className="ml-2 font-semibold text-orange-600">{student.totalCredits}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
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

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Submission Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="approvals" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="rejections" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Generate Reports</span>
                </CardTitle>
                <CardDescription>Download various reports for analysis and record keeping</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      console.log("Downloading Student Activity Report...")
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <FileSpreadsheet className="h-12 w-12 mx-auto text-green-600 mb-4" />
                      <h3 className="font-semibold mb-2">Student Activity Report</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Comprehensive report of all student activities and approvals
                      </p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Excel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      console.log("Downloading Department Analytics...")
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                      <h3 className="font-semibold mb-2">Department Analytics</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Department-wise activity statistics and performance metrics
                      </p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      console.log("Downloading Student Directory...")
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                      <h3 className="font-semibold mb-2">Student Directory</h3>
                      <p className="text-sm text-gray-600 mb-4">Complete student directory with contact information</p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download CSV
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      console.log("Downloading Achievement Summary...")
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Award className="h-12 w-12 mx-auto text-yellow-600 mb-4" />
                      <h3 className="font-semibold mb-2">Achievement Summary</h3>
                      <p className="text-sm text-gray-600 mb-4">Summary of student achievements and recognitions</p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      console.log("Downloading Monthly Report...")
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-red-600 mb-4" />
                      <h3 className="font-semibold mb-2">Monthly Report</h3>
                      <p className="text-sm text-gray-600 mb-4">Monthly activity submission and approval statistics</p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Excel
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      console.log("Downloading Performance Trends...")
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="h-12 w-12 mx-auto text-indigo-600 mb-4" />
                      <h3 className="font-semibold mb-2">Performance Trends</h3>
                      <p className="text-sm text-gray-600 mb-4">Long-term performance trends and analytics</p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
