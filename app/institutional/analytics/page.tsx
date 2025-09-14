"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, GraduationCap, Building2, Trophy } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Comprehensive analytics and insights for institutional performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,130</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faculty Members</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">160</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+2</span> new departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department-wise Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Student Distribution</CardTitle>
            <CardDescription>Current enrollment across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Computer Science", students: 1200, percentage: 29 },
                { dept: "Electronics & Communication", students: 980, percentage: 24 },
                { dept: "Mechanical Engineering", students: 1100, percentage: 27 },
                { dept: "Civil Engineering", students: 850, percentage: 20 },
              ].map((item) => (
                <div key={item.dept} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.dept}</span>
                      <span className="text-gray-600">{item.students} students</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Performance Trends</CardTitle>
            <CardDescription>Average CGPA trends over the years</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { year: "2023-24", cgpa: 8.2, trend: "up" },
                { year: "2022-23", cgpa: 7.9, trend: "up" },
                { year: "2021-22", cgpa: 7.6, trend: "up" },
                { year: "2020-21", cgpa: 7.4, trend: "down" },
              ].map((item) => (
                <div key={item.year} className="flex items-center justify-between">
                  <span className="font-medium">{item.year}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold">{item.cgpa}</span>
                    <TrendingUp className={`h-4 w-4 ${item.trend === "up" ? "text-green-600" : "text-red-600"}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Research Publications</CardTitle>
            <CardDescription>Faculty research output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">245</div>
            <p className="text-sm text-gray-600 mt-1">Publications this year</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>International Journals</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Conference Papers</span>
                <span className="font-medium">89</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Partnerships</CardTitle>
            <CardDescription>Corporate collaborations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">42</div>
            <p className="text-sm text-gray-600 mt-1">Active partnerships</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>MoUs Signed</span>
                <span className="font-medium">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Internship Partners</span>
                <span className="font-medium">24</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Utilization</CardTitle>
            <CardDescription>Facility usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">78%</div>
            <p className="text-sm text-gray-600 mt-1">Average utilization</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Classrooms</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Laboratories</span>
                <span className="font-medium">71%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
