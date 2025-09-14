"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Plus, Eye, Edit, Trash2, Users, Search, Filter } from "lucide-react"

const events = [
  {
    id: "EVT001",
    name: "Tech Symposium 2024",
    description: "Annual technology symposium featuring workshops and seminars",
    date: "2024-01-15",
    endDate: "2024-01-17",
    type: "Workshop",
    department: "Computer Science",
    venue: "Main Auditorium",
    organizer: "Dr. Smith",
    maxParticipants: 100,
    registeredParticipants: 85,
    totalSubmissions: 25,
    pendingApprovals: 12,
    approved: 10,
    rejected: 3,
    status: "Active",
    registrationDeadline: "2024-01-10",
  },
  {
    id: "EVT002",
    name: "Research Excellence Program",
    description: "Program to encourage and support student research activities",
    date: "2024-01-10",
    endDate: "2024-01-12",
    type: "Research",
    department: "Computer Science",
    venue: "Research Lab",
    organizer: "Dr. Johnson",
    maxParticipants: 50,
    registeredParticipants: 35,
    totalSubmissions: 15,
    pendingApprovals: 8,
    approved: 6,
    rejected: 1,
    status: "Completed",
    registrationDeadline: "2024-01-05",
  },
  {
    id: "EVT003",
    name: "Innovation Challenge 2024",
    description: "University-wide innovation and entrepreneurship challenge",
    date: "2024-01-08",
    endDate: "2024-01-09",
    type: "Competition",
    department: "All Departments",
    venue: "Innovation Hub",
    organizer: "Prof. Williams",
    maxParticipants: 200,
    registeredParticipants: 180,
    totalSubmissions: 30,
    pendingApprovals: 15,
    approved: 12,
    rejected: 3,
    status: "Completed",
    registrationDeadline: "2024-01-03",
  },
  {
    id: "EVT004",
    name: "Industry Connect Program",
    description: "Program connecting students with industry professionals",
    date: "2024-02-01",
    endDate: "2024-02-03",
    type: "Internship",
    department: "Information Technology",
    venue: "Conference Hall",
    organizer: "Dr. Brown",
    maxParticipants: 75,
    registeredParticipants: 45,
    totalSubmissions: 0,
    pendingApprovals: 0,
    approved: 0,
    rejected: 0,
    status: "Upcoming",
    registrationDeadline: "2024-01-25",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    endDate: "",
    type: "Workshop",
    department: "",
    venue: "",
    maxParticipants: "",
    registrationDeadline: "",
  })

  const handleCreateEvent = () => {
    console.log("Creating new event:", newEvent)
    setNewEvent({
      name: "",
      description: "",
      date: "",
      endDate: "",
      type: "Workshop",
      department: "",
      venue: "",
      maxParticipants: "",
      registrationDeadline: "",
    })
    setIsCreateEventOpen(false)
    // In real app, save to database
  }

  const handleDeleteEvent = (eventId: string) => {
    console.log("Deleting event:", eventId)
    // In real app, delete from database
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Upcoming":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Create and manage academic events and activities</p>
        </div>
        <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Create a new academic event or activity for students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input
                    id="event-name"
                    placeholder="Enter event name"
                    value={newEvent.name}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <select
                    id="event-type"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Competition">Competition</option>
                    <option value="Research">Research</option>
                    <option value="Internship">Internship</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Conference">Conference</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="Enter event description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="Enter department"
                    value={newEvent.department}
                    onChange={(e) => setNewEvent({ ...newEvent, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    placeholder="Enter venue"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-participants">Max Participants</Label>
                  <Input
                    id="max-participants"
                    type="number"
                    placeholder="Enter max participants"
                    value={newEvent.maxParticipants}
                    onChange={(e) => setNewEvent({ ...newEvent, maxParticipants: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-deadline">Registration Deadline</Label>
                  <Input
                    id="registration-deadline"
                    type="date"
                    value={newEvent.registrationDeadline}
                    onChange={(e) => setNewEvent({ ...newEvent, registrationDeadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Research">Research</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{event.name}</CardTitle>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{event.type}</Badge>
                    <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteEvent(event.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-sm">{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {event.date} - {event.endDate}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.registeredParticipants}/{event.maxParticipants} participants
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Department:</span>
                    <p className="font-medium">{event.department}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Venue:</span>
                    <p className="font-medium">{event.venue}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="font-semibold text-yellow-600">{event.pendingApprovals}</div>
                    <div className="text-yellow-600">Pending</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-semibold text-green-600">{event.approved}</div>
                    <div className="text-green-600">Approved</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <div className="font-semibold text-red-600">{event.rejected}</div>
                    <div className="text-red-600">Rejected</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{event.name}</DialogTitle>
                        <DialogDescription>Event Details and Statistics</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Event Type</Label>
                            <p className="font-medium">{event.type}</p>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                          </div>
                          <div>
                            <Label>Department</Label>
                            <p className="font-medium">{event.department}</p>
                          </div>
                          <div>
                            <Label>Organizer</Label>
                            <p className="font-medium">{event.organizer}</p>
                          </div>
                          <div>
                            <Label>Venue</Label>
                            <p className="font-medium">{event.venue}</p>
                          </div>
                          <div>
                            <Label>Registration Deadline</Label>
                            <p className="font-medium">{event.registrationDeadline}</p>
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <p className="text-gray-700">{event.description}</p>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div className="p-3 bg-blue-50 rounded">
                            <div className="text-2xl font-bold text-blue-600">{event.totalSubmissions}</div>
                            <div className="text-sm text-blue-600">Total Submissions</div>
                          </div>
                          <div className="p-3 bg-yellow-50 rounded">
                            <div className="text-2xl font-bold text-yellow-600">{event.pendingApprovals}</div>
                            <div className="text-sm text-yellow-600">Pending</div>
                          </div>
                          <div className="p-3 bg-green-50 rounded">
                            <div className="text-2xl font-bold text-green-600">{event.approved}</div>
                            <div className="text-sm text-green-600">Approved</div>
                          </div>
                          <div className="p-3 bg-red-50 rounded">
                            <div className="text-2xl font-bold text-red-600">{event.rejected}</div>
                            <div className="text-sm text-red-600">Rejected</div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" className="flex-1" asChild>
                    <a href={`/faculty/approvals?event=${event.id}`}>Manage Approvals</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
