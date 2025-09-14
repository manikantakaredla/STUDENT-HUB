"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Target,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  FileText,
  Star,
  MapPin,
  ExternalLink,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"

// Mock data
const activityTrendData = [
  { month: "Jan", activities: 2 },
  { month: "Feb", activities: 3 },
  { month: "Mar", activities: 5 },
  { month: "Apr", activities: 4 },
  { month: "May", activities: 6 },
  { month: "Jun", activities: 4 },
]

const skillsData = [
  { name: "Programming", value: 85, color: "#3b82f6" },
  { name: "Data Analysis", value: 70, color: "#10b981" },
  { name: "Machine Learning", value: 60, color: "#f59e0b" },
  { name: "Web Development", value: 90, color: "#8b5cf6" },
  { name: "Communication", value: 75, color: "#ef4444" },
]

const recentActivities = [
  { id: 1, title: "Machine Learning Workshop", type: "Workshop", status: "approved", date: "2024-01-15", credits: 2 },
  { id: 2, title: "Hackathon Winner", type: "Achievement", status: "approved", date: "2024-01-10", credits: 5 },
  { id: 3, title: "Research Paper Publication", type: "Research", status: "pending", date: "2024-01-08", credits: 8 },
  { id: 4, title: "Industry Internship", type: "Internship", status: "approved", date: "2024-01-05", credits: 10 },
]

const upcomingEvents = [
  { id: 1, title: "Tech Symposium 2024", date: "2024-02-15", location: "Main Auditorium", type: "Conference" },
  { id: 2, title: "Career Fair", date: "2024-02-20", location: "Campus Grounds", type: "Career" },
  { id: 3, title: "AI Workshop Series", date: "2024-02-25", location: "Lab 101", type: "Workshop" },
]

const jobRecommendations = [
  { id: 1, title: "Software Engineer Intern", company: "TechCorp", location: "Bangalore", match: 95 },
  { id: 2, title: "Data Analyst", company: "DataFlow Inc", location: "Hyderabad", match: 88 },
  { id: 3, title: "ML Engineer", company: "AI Solutions", location: "Chennai", match: 82 },
]

export default function StudentDashboard() {
  const [userData, setUserData] = useState<any>(null)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-600">Smart Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/student/activities")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
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
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-4 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-white/20 text-white text-xl">AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Welcome back, Alexandra Chen!</h2>
                    <p className="text-blue-100 text-lg">Computer Science Engineering • 6th Semester</p>
                    <p className="text-blue-200">Student ID: ST2024001</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-200 mb-1">Current CGPA</div>
                  <div className="text-4xl font-bold">9.2</div>
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
                  <p className="text-sm font-medium text-gray-600">Attendance</p>
                  <p className="text-3xl font-bold text-green-600">94%</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Activities</p>
                  <p className="text-3xl font-bold text-blue-600">24</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Credits</p>
                  <p className="text-3xl font-bold text-purple-600">42</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Skill Score</p>
                  <p className="text-3xl font-bold text-orange-600">8.7</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Credits Progress */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Activity Credits Progress</span>
                </CardTitle>
                <CardDescription>You're 8 credits away from your goal!</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                42/50 Credits
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={84} className="h-3 mb-4" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current: 42 credits</span>
              <span>Goal: 50 credits</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Activity Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Activity Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-yellow-700">Pending</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-sm text-green-700">Approved</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-red-700">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Activity Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={activityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="activities" stroke="#8b5cf6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Skills Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Skills Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-600">{skill.value}%</span>
                    </div>
                    <Progress value={skill.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => router.push("/student/activities")}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.type} • {activity.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusBadge(activity.status)}>
                        {activity.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {activity.status}
                      </Badge>
                      <span className="text-sm font-medium text-purple-600">+{activity.credits} credits</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                        <MapPin className="h-3 w-3 ml-2" />
                        <span>{event.location}</span>
                      </p>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Job Recommendations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Job Recommendations</span>
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => router.push("/student/career")}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Career Hub
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobRecommendations.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-gray-600">
                        {job.company} • {job.location}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{job.match}%</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => router.push("/student/activities")}
              >
                <Plus className="h-6 w-6" />
                <span>Add Activity</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => router.push("/student/portfolio")}
              >
                <FileText className="h-6 w-6" />
                <span>Generate Portfolio</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => router.push("/student/career")}
              >
                <Briefcase className="h-6 w-6" />
                <span>Career Hub</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => router.push("/student/skills")}
              >
                <TrendingUp className="h-6 w-6" />
                <span>Skills Assessment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
