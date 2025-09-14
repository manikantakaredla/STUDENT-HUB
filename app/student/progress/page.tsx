"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Target,
  Calendar,
  BookOpen,
  Trophy,
  Star,
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock progress data
const progressData = {
  currentSemester: 6,
  totalSemesters: 8,
  currentCGPA: 8.7,
  targetCGPA: 9.0,
  totalCredits: 142,
  requiredCredits: 180,
  completedCourses: 28,
  totalCourses: 36,
  internshipsCompleted: 2,
  internshipsRequired: 1,
  projectsCompleted: 8,
  projectsRequired: 5,
  certificationsEarned: 6,
  certificationsTarget: 8,
  achievementsEarned: 5,
  codingScore: 2200,
  codingTarget: 2500,
}

const semesterProgress = [
  { semester: 1, cgpa: 8.2, credits: 20, courses: 5, status: "completed" },
  { semester: 2, cgpa: 8.4, credits: 22, courses: 5, status: "completed" },
  { semester: 3, cgpa: 8.6, credits: 24, courses: 6, status: "completed" },
  { semester: 4, cgpa: 8.5, credits: 22, courses: 5, status: "completed" },
  { semester: 5, cgpa: 8.8, credits: 26, courses: 6, status: "completed" },
  { semester: 6, cgpa: 8.7, credits: 28, courses: 6, status: "in-progress" },
  { semester: 7, cgpa: 0, credits: 0, courses: 0, status: "upcoming" },
  { semester: 8, cgpa: 0, credits: 0, courses: 0, status: "upcoming" },
]

const monthlyProgress = [
  { month: "Jan 2024", activities: 3, credits: 8, achievements: 1, coding: 150 },
  { month: "Feb 2024", activities: 2, credits: 6, achievements: 0, coding: 180 },
  { month: "Mar 2024", activities: 4, credits: 10, achievements: 2, coding: 220 },
  { month: "Apr 2024", activities: 3, credits: 7, achievements: 1, coding: 200 },
  { month: "May 2024", activities: 5, credits: 12, achievements: 1, coding: 250 },
  { month: "Jun 2024", activities: 2, credits: 5, achievements: 0, coding: 180 },
]

const goals = [
  {
    id: 1,
    title: "Achieve 9.0 CGPA",
    description: "Maintain high academic performance",
    target: 9.0,
    current: 8.7,
    progress: 87,
    deadline: "2024-12-31",
    status: "in-progress",
    category: "academic",
  },
  {
    id: 2,
    title: "Complete 3 Internships",
    description: "Gain industry experience",
    target: 3,
    current: 2,
    progress: 67,
    deadline: "2024-08-31",
    status: "in-progress",
    category: "experience",
  },
  {
    id: 3,
    title: "Earn 8 Certifications",
    description: "Build technical skills",
    target: 8,
    current: 6,
    progress: 75,
    deadline: "2024-10-31",
    status: "in-progress",
    category: "skills",
  },
  {
    id: 4,
    title: "Coding Score 2500+",
    description: "Improve programming skills",
    target: 2500,
    current: 2200,
    progress: 88,
    deadline: "2024-09-30",
    status: "in-progress",
    category: "coding",
  },
]

export default function ProgressPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const router = useRouter()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "upcoming":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return null
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "from-blue-500 to-cyan-500"
      case "experience":
        return "from-green-500 to-teal-500"
      case "skills":
        return "from-purple-500 to-pink-500"
      case "coding":
        return "from-orange-500 to-red-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/student/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Progress Tracking</h1>
                <p className="text-sm text-gray-600">Monitor your academic journey</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Current CGPA</p>
                  <p className="text-3xl font-bold">{progressData.currentCGPA}</p>
                  <p className="text-xs opacity-75">Target: {progressData.targetCGPA}</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4">
                <Progress value={(progressData.currentCGPA / progressData.targetCGPA) * 100} className="bg-white/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Credits Earned</p>
                  <p className="text-3xl font-bold">{progressData.totalCredits}</p>
                  <p className="text-xs opacity-75">Required: {progressData.requiredCredits}</p>
                </div>
                <BookOpen className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4">
                <Progress
                  value={(progressData.totalCredits / progressData.requiredCredits) * 100}
                  className="bg-white/20"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Semester Progress</p>
                  <p className="text-3xl font-bold">
                    {progressData.currentSemester}/{progressData.totalSemesters}
                  </p>
                  <p className="text-xs opacity-75">75% Complete</p>
                </div>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4">
                <Progress
                  value={(progressData.currentSemester / progressData.totalSemesters) * 100}
                  className="bg-white/20"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Coding Score</p>
                  <p className="text-3xl font-bold">{progressData.codingScore}</p>
                  <p className="text-xs opacity-75">Target: {progressData.codingTarget}</p>
                </div>
                <Activity className="h-8 w-8 opacity-80" />
              </div>
              <div className="mt-4">
                <Progress
                  value={(progressData.codingScore / progressData.codingTarget) * 100}
                  className="bg-white/20"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="semester">Semester Progress</TabsTrigger>
            <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Tracker Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    <span>Code Tracker</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-orange-800">LeetCode</span>
                        <span className="text-xs text-orange-600">Easy: 45</span>
                      </div>
                      <div className="text-lg font-bold text-orange-900">1,250</div>
                      <div className="text-xs text-orange-600">Medium: 23 | Hard: 8</div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800">CodeChef</span>
                        <span className="text-xs text-blue-600">3★</span>
                      </div>
                      <div className="text-lg font-bold text-blue-900">1,680</div>
                      <div className="text-xs text-blue-600">Contest Rating</div>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-800">Codeforces</span>
                        <span className="text-xs text-purple-600">Pupil</span>
                      </div>
                      <div className="text-lg font-bold text-purple-900">1,420</div>
                      <div className="text-xs text-purple-600">Max Rating</div>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-800">HackerRank</span>
                        <span className="text-xs text-green-600">5★</span>
                      </div>
                      <div className="text-lg font-bold text-green-900">2,850</div>
                      <div className="text-xs text-green-600">Total Points</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Weekly Goal Progress</span>
                      <span className="text-sm font-medium">12/15 problems</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Academic Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Courses Completed</span>
                      <span className="font-semibold">
                        {progressData.completedCourses}/{progressData.totalCourses}
                      </span>
                    </div>
                    <Progress value={(progressData.completedCourses / progressData.totalCourses) * 100} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Credits Earned</span>
                      <span className="font-semibold">
                        {progressData.totalCredits}/{progressData.requiredCredits}
                      </span>
                    </div>
                    <Progress value={(progressData.totalCredits / progressData.requiredCredits) * 100} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CGPA Progress</span>
                      <span className="font-semibold">
                        {progressData.currentCGPA}/{progressData.targetCGPA}
                      </span>
                    </div>
                    <Progress value={(progressData.currentCGPA / progressData.targetCGPA) * 100} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <span>Achievements & Skills</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Internships</span>
                      <span className="font-semibold">
                        {progressData.internshipsCompleted}/{progressData.internshipsRequired}
                      </span>
                    </div>
                    <Progress value={(progressData.internshipsCompleted / progressData.internshipsRequired) * 100} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projects</span>
                      <span className="font-semibold">
                        {progressData.projectsCompleted}/{progressData.projectsRequired}
                      </span>
                    </div>
                    <Progress value={(progressData.projectsCompleted / progressData.projectsRequired) * 100} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Certifications</span>
                      <span className="font-semibold">
                        {progressData.certificationsEarned}/{progressData.certificationsTarget}
                      </span>
                    </div>
                    <Progress value={(progressData.certificationsEarned / progressData.certificationsTarget) * 100} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Achievements</span>
                      <span className="font-semibold">{progressData.achievementsEarned}</span>
                    </div>
                    <div className="flex space-x-1">
                      {Array.from({ length: progressData.achievementsEarned }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Semester Progress Tab */}
          <TabsContent value="semester" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Semester-wise Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {semesterProgress.map((semester) => (
                    <Card
                      key={semester.semester}
                      className={`${
                        semester.status === "completed"
                          ? "bg-green-50 border-green-200"
                          : semester.status === "in-progress"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Semester {semester.semester}</h3>
                          {getStatusIcon(semester.status)}
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">CGPA:</span>
                            <span className="font-medium">{semester.cgpa || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Credits:</span>
                            <span className="font-medium">{semester.credits}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Courses:</span>
                            <span className="font-medium">{semester.courses}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`mt-2 w-full justify-center ${
                            semester.status === "completed"
                              ? "border-green-500 text-green-700"
                              : semester.status === "in-progress"
                                ? "border-yellow-500 text-yellow-700"
                                : "border-gray-500 text-gray-700"
                          }`}
                        >
                          {semester.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals & Targets Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        <div className={`p-2 bg-gradient-to-r ${getCategoryColor(goal.category)} rounded-full`}>
                          <Target className="h-4 w-4 text-white" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="font-semibold">
                            {goal.current}/{goal.target}
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{goal.progress}% Complete</span>
                          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={`${
                            goal.status === "completed"
                              ? "border-green-500 text-green-700"
                              : "border-yellow-500 text-yellow-700"
                          }`}
                        >
                          {goal.status.replace("-", " ").toUpperCase()}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Update Progress
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    <span>Monthly Activity Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyProgress.map((month, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{month.month}</span>
                          <span className="text-sm text-gray-600">{month.activities} activities</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-semibold text-blue-600">{month.credits}</div>
                            <div className="text-blue-600">Credits</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-semibold text-green-600">{month.achievements}</div>
                            <div className="text-green-600">Awards</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-semibold text-purple-600">{month.coding}</div>
                            <div className="text-purple-600">Coding</div>
                          </div>
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="font-semibold text-orange-600">{month.activities}</div>
                            <div className="text-orange-600">Total</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span>Performance Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Strong Performance</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your CGPA has been consistently improving over the past 3 semesters.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Areas for Improvement</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Consider increasing your coding practice to reach the target score of 2500.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Recommendations</span>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Focus on completing 2 more certifications this semester</li>
                      <li>• Maintain current academic performance</li>
                      <li>• Consider applying for additional internship opportunities</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
