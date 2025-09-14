"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, BookOpen, Trophy, Activity, PieChart, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Faculty Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into student performance and engagement</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Total Students</p>
                  <p className="text-3xl font-bold">156</p>
                  <p className="text-xs opacity-75">+12 this month</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Average CGPA</p>
                  <p className="text-3xl font-bold">8.4</p>
                  <p className="text-xs opacity-75">+0.2 improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Active Projects</p>
                  <p className="text-3xl font-bold">89</p>
                  <p className="text-xs opacity-75">23 completed</p>
                </div>
                <BookOpen className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Attendance Rate</p>
                  <p className="text-3xl font-bold">92%</p>
                  <p className="text-xs opacity-75">Above target</p>
                </div>
                <Activity className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>CGPA Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">9.0 - 10.0</span>
                      <span className="font-semibold">23 students</span>
                    </div>
                    <Progress value={15} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">8.0 - 8.9</span>
                      <span className="font-semibold">89 students</span>
                    </div>
                    <Progress value={57} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">7.0 - 7.9</span>
                      <span className="font-semibold">34 students</span>
                    </div>
                    <Progress value={22} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Below 7.0</span>
                      <span className="font-semibold">10 students</span>
                    </div>
                    <Progress value={6} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <span>Top Performers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Priya Sharma", cgpa: 9.1, projects: 12 },
                      { name: "Alexandra Chen", cgpa: 8.7, projects: 8 },
                      { name: "Marcus Johnson", cgpa: 8.2, projects: 5 },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">CGPA: {student.cgpa}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.projects} projects</p>
                          <p className="text-xs text-gray-500">Rank #{index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>Activity Levels</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">High Activity</span>
                      <span className="font-semibold">67 students</span>
                    </div>
                    <Progress value={43} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Medium Activity</span>
                      <span className="font-semibold">78 students</span>
                    </div>
                    <Progress value={50} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Low Activity</span>
                      <span className="font-semibold">11 students</span>
                    </div>
                    <Progress value={7} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    <span>Project Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="font-semibold">23 projects</span>
                    </div>
                    <Progress value={26} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">In Progress</span>
                      <span className="font-semibold">56 projects</span>
                    </div>
                    <Progress value={63} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending</span>
                      <span className="font-semibold">10 projects</span>
                    </div>
                    <Progress value={11} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Monthly Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { month: "January 2024", students: 144, avgCgpa: 8.2, projects: 67 },
                    { month: "February 2024", students: 148, avgCgpa: 8.3, projects: 72 },
                    { month: "March 2024", students: 152, avgCgpa: 8.4, projects: 78 },
                    { month: "April 2024", students: 156, avgCgpa: 8.4, projects: 89 },
                  ].map((data, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-3">{data.month}</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-gray-600">Students</p>
                          <p className="font-bold text-blue-600">{data.students}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Avg CGPA</p>
                          <p className="font-bold text-green-600">{data.avgCgpa}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-600">Projects</p>
                          <p className="font-bold text-purple-600">{data.projects}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
