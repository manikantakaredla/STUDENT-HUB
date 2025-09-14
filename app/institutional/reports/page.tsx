"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, BarChart3 } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Academic Performance Report",
    description: "Comprehensive analysis of student academic performance across all departments",
    type: "Academic",
    generatedDate: "2024-01-15",
    status: "Ready",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Faculty Research Output",
    description: "Annual report on faculty publications, patents, and research activities",
    type: "Research",
    generatedDate: "2024-01-10",
    status: "Ready",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Placement Statistics",
    description: "Detailed placement statistics and industry-wise recruitment data",
    type: "Placement",
    generatedDate: "2024-01-08",
    status: "Ready",
    size: "3.2 MB",
  },
  {
    id: 4,
    title: "Infrastructure Utilization",
    description: "Analysis of classroom, laboratory, and facility utilization rates",
    type: "Infrastructure",
    generatedDate: "2024-01-05",
    status: "Processing",
    size: "1.5 MB",
  },
  {
    id: 5,
    title: "Financial Summary",
    description: "Annual financial report including budget allocation and expenditure",
    type: "Financial",
    generatedDate: "2024-01-03",
    status: "Ready",
    size: "4.1 MB",
  },
  {
    id: 6,
    title: "Student Feedback Analysis",
    description: "Comprehensive analysis of student feedback on courses and faculty",
    type: "Feedback",
    generatedDate: "2024-01-01",
    status: "Ready",
    size: "2.7 MB",
  },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const types = ["All", "Academic", "Research", "Placement", "Infrastructure", "Financial", "Feedback"]
  const statuses = ["All", "Ready", "Processing", "Scheduled"]

  const filteredReports = reports.filter((report) => {
    const matchesType = selectedType === "All" || report.type === selectedType
    const matchesStatus = selectedStatus === "All" || report.status === selectedStatus
    return matchesType && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate and manage institutional reports</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{report.title}</CardTitle>
                    <CardDescription className="mt-1">{report.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className={`${
                    report.type === "Academic"
                      ? "bg-blue-100 text-blue-700"
                      : report.type === "Research"
                        ? "bg-green-100 text-green-700"
                        : report.type === "Placement"
                          ? "bg-orange-100 text-orange-700"
                          : report.type === "Infrastructure"
                            ? "bg-purple-100 text-purple-700"
                            : report.type === "Financial"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {report.type}
                </Badge>
                <Badge
                  variant="outline"
                  className={
                    report.status === "Ready" ? "border-green-200 text-green-700" : "border-yellow-200 text-yellow-700"
                  }
                >
                  {report.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Generated:</span>
                  <span className="font-medium">{new Date(report.generatedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>File Size:</span>
                  <span className="font-medium">{report.size}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  disabled={report.status !== "Ready"}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  disabled={report.status !== "Ready"}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-sm text-gray-600">Ready</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2</div>
              <p className="text-sm text-gray-600">Scheduled</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
