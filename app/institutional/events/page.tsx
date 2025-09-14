"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    description: "Three-day technical festival featuring competitions, workshops, and guest lectures",
    date: "2024-03-15",
    time: "09:00 AM",
    venue: "Main Auditorium",
    type: "Festival",
    status: "Upcoming",
    attendees: 1500,
    organizer: "Student Council",
  },
  {
    id: 2,
    title: "Industry Expert Lecture Series",
    description: "Weekly lecture series by industry professionals on emerging technologies",
    date: "2024-02-20",
    time: "02:00 PM",
    venue: "Conference Hall A",
    type: "Lecture",
    status: "Ongoing",
    attendees: 200,
    organizer: "CSE Department",
  },
  {
    id: 3,
    title: "Research Paper Presentation",
    description: "Faculty and student research paper presentations across all departments",
    date: "2024-02-25",
    time: "10:00 AM",
    venue: "Seminar Hall",
    type: "Academic",
    status: "Upcoming",
    attendees: 300,
    organizer: "Research Committee",
  },
  {
    id: 4,
    title: "Sports Day 2024",
    description: "Annual sports competition with various indoor and outdoor games",
    date: "2024-01-30",
    time: "08:00 AM",
    venue: "Sports Complex",
    type: "Sports",
    status: "Completed",
    attendees: 2000,
    organizer: "Sports Committee",
  },
  {
    id: 5,
    title: "Career Guidance Workshop",
    description: "Workshop on career opportunities and skill development for final year students",
    date: "2024-02-10",
    time: "11:00 AM",
    venue: "Placement Cell",
    type: "Workshop",
    status: "Completed",
    attendees: 150,
    organizer: "Placement Cell",
  },
  {
    id: 6,
    title: "Cultural Night",
    description: "Evening of cultural performances, music, and dance by students",
    date: "2024-03-01",
    time: "06:00 PM",
    venue: "Open Air Theatre",
    type: "Cultural",
    status: "Upcoming",
    attendees: 800,
    organizer: "Cultural Committee",
  },
]

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const types = ["All", "Festival", "Lecture", "Academic", "Sports", "Workshop", "Cultural"]
  const statuses = ["All", "Upcoming", "Ongoing", "Completed"]

  const filteredEvents = events.filter((event) => {
    const matchesType = selectedType === "All" || event.type === selectedType
    const matchesStatus = selectedStatus === "All" || event.status === selectedStatus
    return matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700"
      case "Ongoing":
        return "bg-green-100 text-green-700"
      case "Completed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Festival":
        return "bg-purple-100 text-purple-700"
      case "Lecture":
        return "bg-blue-100 text-blue-700"
      case "Academic":
        return "bg-green-100 text-green-700"
      case "Sports":
        return "bg-orange-100 text-orange-700"
      case "Workshop":
        return "bg-yellow-100 text-yellow-700"
      case "Cultural":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600 mt-1">Manage institutional events and activities</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
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
        {filteredEvents.map((event) => (
          <Card key={event.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                  <CardDescription className="mt-1">{event.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="secondary" className={getTypeColor(event.type)}>
                  {event.type}
                </Badge>
                <Badge variant="outline" className={getStatusColor(event.status)}>
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Organizer:</span>
                  <span className="font-medium">{event.organizer}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-sm text-gray-600">Total Events</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <p className="text-sm text-gray-600">Ongoing</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5,950</div>
              <p className="text-sm text-gray-600">Total Attendees</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
