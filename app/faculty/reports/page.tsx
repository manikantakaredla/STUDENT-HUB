"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Calendar, Users, TrendingUp, BarChart3, Activity, CheckCircle } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Student Performance Report",
    description: "Comprehensive analysis of student academic performance",
    type: "Academic",
    generatedDate: "2024-01-15",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Attendance Summary",
    description: "Monthly attendance report for all courses",
    type: "Attendance",
    generatedDate: "2024-01-14",
    status: "completed",
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Project Submissions",
    description: "Status of all project submissions and evaluations",
    type: "Projects",
    generatedDate: "2024-01-13",
    status: "completed",
    downloadUrl: "#",
  },
]

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Generate and download comprehensive reports</p>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>

        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="reports">Available Reports</TabsTrigger>
            <TabsTrigger value="analytics">Quick Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{report.generatedDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Ready</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Total Students</p>
                      <p className="text-3xl font-bold">156</p>
                    </div>
                    <Users className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Avg CGPA</p>
                      <p className="text-3xl font-bold">8.4</p>
                    </div>
                    <TrendingUp className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Projects</p>
                      <p className="text-3xl font-bold">89</p>
                    </div>
                    <BarChart3 className="h-8 w-8 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Attendance</p>
                      <p className="text-3xl font-bold">92%</p>
                    </div>
                    <Activity className="h-8 w-8 opacity-80" />
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
