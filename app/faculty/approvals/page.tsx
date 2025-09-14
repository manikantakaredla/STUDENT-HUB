"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Eye, Search, Download, FileText, Building2, CheckSquare } from "lucide-react"

// Mock data organized by department and events
const mockApprovals = {
  "Computer Science": {
    "Section A": [
      {
        id: 1,
        studentName: "Alexandra Chen",
        studentId: "ST2024001",
        title: "Machine Learning Workshop",
        type: "Workshop",
        category: "activities",
        date: "2024-01-15",
        description: "Attended comprehensive ML workshop covering supervised and unsupervised learning",
        documents: ["certificate.pdf", "attendance_proof.pdf"],
        submittedDate: "2024-01-16",
        eventId: "EVT001",
        eventName: "Tech Symposium 2024",
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
        documents: ["research_paper.pdf", "acceptance_letter.pdf", "publication_proof.pdf"],
        submittedDate: "2024-01-12",
        eventId: "EVT002",
        eventName: "Research Excellence Program",
      },
    ],
    "Section B": [
      {
        id: 3,
        studentName: "Sarah Johnson",
        studentId: "ST2024003",
        title: "Hackathon Participation",
        type: "Competition",
        category: "activities",
        date: "2024-01-08",
        description: "Participated in university-wide hackathon with AI-powered solution",
        documents: ["participation_certificate.pdf", "project_demo.mp4"],
        submittedDate: "2024-01-09",
        eventId: "EVT003",
        eventName: "Innovation Challenge 2024",
      },
    ],
  },
  "Information Technology": {
    "Section A": [
      {
        id: 4,
        studentName: "Mike Wilson",
        studentId: "ST2024004",
        title: "Internship at TechCorp",
        type: "Internship",
        category: "activities",
        date: "2024-01-01",
        description: "3-month internship in software development",
        documents: ["internship_certificate.pdf", "completion_letter.pdf"],
        submittedDate: "2024-01-14",
        eventId: "EVT004",
        eventName: "Industry Connect Program",
      },
    ],
  },
}

const events = [
  {
    id: "EVT001",
    name: "Tech Symposium 2024",
    date: "2024-01-15",
    type: "Workshop",
    department: "Computer Science",
    totalSubmissions: 25,
    pendingApprovals: 12,
    approved: 10,
    rejected: 3,
  },
  {
    id: "EVT002",
    name: "Research Excellence Program",
    date: "2024-01-10",
    type: "Research",
    department: "Computer Science",
    totalSubmissions: 15,
    pendingApprovals: 8,
    approved: 6,
    rejected: 1,
  },
  {
    id: "EVT003",
    name: "Innovation Challenge 2024",
    date: "2024-01-08",
    type: "Competition",
    department: "Computer Science",
    totalSubmissions: 30,
    pendingApprovals: 15,
    approved: 12,
    rejected: 3,
  },
  {
    id: "EVT004",
    name: "Industry Connect Program",
    date: "2024-01-01",
    type: "Internship",
    department: "Information Technology",
    totalSubmissions: 20,
    pendingApprovals: 10,
    approved: 8,
    rejected: 2,
  },
]

export default function ApprovalsPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science")
  const [selectedSection, setSelectedSection] = useState("Section A")
  const [selectedEvent, setSelectedEvent] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [viewDocuments, setViewDocuments] = useState<any>(null)

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

  const handleBulkApprove = (department: string, section: string) => {
    console.log(`Bulk approved all activities for ${department} - ${section}`)
    // In real app, update database
  }

  const handleEventBulkApprove = (eventId: string) => {
    console.log(`Bulk approved all activities for event ${eventId}`)
    // In real app, update database
  }

  const getFilteredActivities = () => {
    if (!mockApprovals[selectedDepartment] || !mockApprovals[selectedDepartment][selectedSection]) {
      return []
    }

    let activities = mockApprovals[selectedDepartment][selectedSection]

    if (selectedEvent) {
      activities = activities.filter((activity) => activity.eventId === selectedEvent)
    }

    if (searchTerm) {
      activities = activities.filter(
        (activity) =>
          activity.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.studentId.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return activities
  }

  const getEventActivities = (eventId: string) => {
    const allActivities = []
    Object.keys(mockApprovals).forEach((dept) => {
      Object.keys(mockApprovals[dept]).forEach((section) => {
        const activities = mockApprovals[dept][section].filter((activity) => activity.eventId === eventId)
        allActivities.push(...activities)
      })
    })
    return allActivities
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Approvals</h1>
          <p className="text-gray-600">Review and approve student activity submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="department" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="department">Department View</TabsTrigger>
          <TabsTrigger value="events">Events View</TabsTrigger>
        </TabsList>

        {/* Department-wise View */}
        <TabsContent value="department" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Department & Section Filter</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="department">Department</Label>
                  <select
                    id="department"
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value)
                      setSelectedSection("Section A") // Reset section
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-1"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="section">Section</Label>
                  <select
                    id="section"
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-1"
                  >
                    <option value="Section A">Section A</option>
                    <option value="Section B">Section B</option>
                    <option value="Section C">Section C</option>
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="event-filter">Filter by Event (Optional)</Label>
                  <select
                    id="event-filter"
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-1"
                  >
                    <option value="">All Events</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-sm">
                    {selectedDepartment} - {selectedSection}
                  </Badge>
                  <span className="text-sm text-gray-600">{getFilteredActivities().length} submissions</span>
                </div>
                <Button
                  onClick={() => handleBulkApprove(selectedDepartment, selectedSection)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Bulk Approve Section
                </Button>
              </div>

              <div className="space-y-4">
                {getFilteredActivities().map((activity) => (
                  <Card key={activity.id} className="border-l-4 border-l-yellow-400">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{activity.title}</h3>
                            <Badge variant="outline">{activity.type}</Badge>
                            <Badge className="bg-blue-100 text-blue-800">{activity.eventName}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">
                                <strong>Student:</strong> {activity.studentName} ({activity.studentId})
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Department:</strong> {selectedDepartment} - {selectedSection}
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
                            <span>Documents ({activity.documents.length}):</span>
                            <Button
                              variant="link"
                              size="sm"
                              className="p-0 h-auto text-blue-600"
                              onClick={() => setViewDocuments(activity)}
                            >
                              View Documents
                            </Button>
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
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events View */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{event.name}</CardTitle>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <CardDescription>
                    {event.department} • {event.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <span className="ml-2 font-semibold">{event.totalSubmissions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Pending:</span>
                        <span className="ml-2 font-semibold text-yellow-600">{event.pendingApprovals}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Approved:</span>
                        <span className="ml-2 font-semibold text-green-600">{event.approved}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Rejected:</span>
                        <span className="ml-2 font-semibold text-red-600">{event.rejected}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            View Submissions
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{event.name} - Submissions</DialogTitle>
                            <DialogDescription>Review all submissions for this event</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Badge variant="outline">{getEventActivities(event.id).length} submissions</Badge>
                              <Button
                                onClick={() => handleEventBulkApprove(event.id)}
                                className="bg-green-600 hover:bg-green-700"
                                size="sm"
                              >
                                <CheckSquare className="h-4 w-4 mr-2" />
                                Bulk Approve Event
                              </Button>
                            </div>
                            {getEventActivities(event.id).map((activity) => (
                              <Card key={activity.id} className="border-l-4 border-l-blue-400">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-semibold">{activity.title}</h4>
                                      <p className="text-sm text-gray-600">
                                        {activity.studentName} ({activity.studentId})
                                      </p>
                                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={() => handleApproveActivity(activity.id)}
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-red-200 text-red-600 bg-transparent"
                                      >
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        onClick={() => handleEventBulkApprove(event.id)}
                        className="bg-green-600 hover:bg-green-700 flex-1"
                      >
                        <CheckSquare className="h-4 w-4 mr-1" />
                        Bulk Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Document Viewer Dialog */}
      <Dialog open={!!viewDocuments} onOpenChange={() => setViewDocuments(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Activity Documents</DialogTitle>
            <DialogDescription>
              {viewDocuments?.studentName} - {viewDocuments?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {viewDocuments?.documents.map((doc, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{doc}</p>
                      <p className="text-sm text-gray-500">PDF Document</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
