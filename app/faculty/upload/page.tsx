"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, CheckCircle, AlertCircle, Download, Trash2, Eye } from "lucide-react"

export default function BulkUploadPage() {
  const [uploadHistory, setUploadHistory] = useState([
    {
      id: 1,
      fileName: "student_grades_sem6.csv",
      type: "Grades",
      uploadDate: "2024-01-15",
      status: "completed",
      recordsProcessed: 156,
      errors: 0,
    },
    {
      id: 2,
      fileName: "attendance_march.xlsx",
      type: "Attendance",
      uploadDate: "2024-01-14",
      status: "completed",
      recordsProcessed: 1240,
      errors: 3,
    },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bulk Upload</h1>
          <p className="text-gray-600">Upload and manage student data in bulk</p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">New Upload</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Upload className="h-5 w-5 text-blue-600" />
                    <span>Upload Student Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="upload-type">Upload Type</Label>
                    <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                      <option>Select upload type</option>
                      <option>Student Grades</option>
                      <option>Attendance Records</option>
                      <option>Project Submissions</option>
                      <option>Student Information</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="file-upload">Choose File</Label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">CSV, XLSX up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" placeholder="Add a description for this upload..." className="mt-1" />
                  </div>

                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Supported Formats:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• CSV files (.csv)</li>
                      <li>• Excel files (.xlsx, .xls)</li>
                      <li>• Maximum file size: 10MB</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Data Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• First row should contain column headers</li>
                      <li>• Student ID is required for all records</li>
                      <li>• Date format: YYYY-MM-DD</li>
                      <li>• No empty rows in the middle of data</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Processing:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Files are processed immediately</li>
                      <li>• You'll receive email notification when complete</li>
                      <li>• Error reports are generated for failed records</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadHistory.map((upload) => (
                    <div
                      key={upload.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{upload.fileName}</h3>
                          <p className="text-sm text-gray-600">
                            {upload.type} • {upload.uploadDate} • {upload.recordsProcessed} records
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={upload.status === "completed" ? "default" : "secondary"}
                          className={upload.status === "completed" ? "bg-green-100 text-green-800" : ""}
                        >
                          {upload.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {upload.status.toUpperCase()}
                        </Badge>
                        {upload.errors > 0 && (
                          <Badge variant="destructive">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {upload.errors} errors
                          </Badge>
                        )}
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Student Grades Template",
                  description: "Template for uploading student grades and marks",
                  fields: ["Student ID", "Course Code", "Grade", "Credits"],
                },
                {
                  name: "Attendance Template",
                  description: "Template for uploading attendance records",
                  fields: ["Student ID", "Date", "Course Code", "Status"],
                },
                {
                  name: "Student Information Template",
                  description: "Template for uploading basic student information",
                  fields: ["Student ID", "Name", "Email", "Department"],
                },
              ].map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-sm">Required Fields:</h4>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field, fieldIndex) => (
                          <Badge key={fieldIndex} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
