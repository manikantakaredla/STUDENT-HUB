"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  BookOpen,
  Briefcase,
  Heart,
  Zap,
  FileText,
  Eye,
  Edit,
  Trash2,
  Search,
  Download,
  Plus,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Activity {
  id: string
  title: string
  category: "academic" | "extracurricular" | "sports" | "cultural" | "technical" | "social"
  type: "workshop" | "seminar" | "competition" | "project" | "internship" | "volunteer" | "certification"
  description: string
  date: string
  duration: string
  location: string
  organizer: string
  participants: number
  status: "pending" | "approved" | "rejected"
  credits: number
  skills: string[]
  certificates?: string[]
  images?: string[]
  outcomes: string
  reflection: string
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  feedback?: string
}

const mockActivities: Activity[] = [
  {
    id: "1",
    title: "AI/ML Workshop on Deep Learning",
    category: "technical",
    type: "workshop",
    description:
      "Comprehensive workshop on deep learning fundamentals, neural networks, and practical implementation using TensorFlow and PyTorch.",
    date: "2024-03-15",
    duration: "3 days",
    location: "Tech Lab, Block A",
    organizer: "IEEE Student Chapter",
    participants: 45,
    status: "approved",
    credits: 3,
    skills: ["Machine Learning", "Python", "TensorFlow", "Neural Networks"],
    certificates: ["AI_Workshop_Certificate.pdf"],
    images: ["workshop_photo1.jpg", "workshop_photo2.jpg"],
    outcomes: "Built a CNN model for image classification with 92% accuracy",
    reflection:
      "This workshop significantly enhanced my understanding of deep learning concepts and practical implementation.",
    submittedAt: "2024-03-16T10:30:00Z",
    reviewedAt: "2024-03-18T14:20:00Z",
    reviewedBy: "Dr. Sarah Johnson",
    feedback: "Excellent participation and project outcome. Well documented learning experience.",
  },
  {
    id: "2",
    title: "National Coding Competition",
    category: "academic",
    type: "competition",
    description:
      "Participated in the national level coding competition focusing on algorithmic problem solving and data structures.",
    date: "2024-02-28",
    duration: "1 day",
    location: "Online Platform",
    organizer: "CodeChef",
    participants: 1200,
    status: "approved",
    credits: 4,
    skills: ["Algorithms", "Data Structures", "Problem Solving", "C++"],
    certificates: ["CodeChef_Certificate.pdf"],
    outcomes: "Secured 45th rank out of 1200 participants",
    reflection: "Great experience in competitive programming. Learned advanced algorithmic techniques.",
    submittedAt: "2024-03-01T09:15:00Z",
    reviewedAt: "2024-03-03T11:45:00Z",
    reviewedBy: "Prof. Michael Chen",
    feedback: "Outstanding performance in the competition. Shows strong problem-solving skills.",
  },
  {
    id: "3",
    title: "Community Service - Teaching Underprivileged Children",
    category: "social",
    type: "volunteer",
    description:
      "Volunteered to teach basic computer skills and mathematics to underprivileged children in the local community.",
    date: "2024-01-20",
    duration: "2 months",
    location: "Community Center, Downtown",
    organizer: "NSS Unit",
    participants: 25,
    status: "pending",
    credits: 2,
    skills: ["Teaching", "Communication", "Social Work", "Leadership"],
    images: ["volunteer_work1.jpg", "volunteer_work2.jpg"],
    outcomes: "Successfully taught 30 children basic computer skills and helped improve their math scores",
    reflection: "Rewarding experience that helped me develop teaching skills and social awareness.",
    submittedAt: "2024-03-20T16:45:00Z",
  },
]

const categoryIcons = {
  academic: BookOpen,
  extracurricular: Users,
  sports: Zap,
  cultural: Heart,
  technical: Briefcase,
  social: Heart,
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
}

export default function ActivityManagement() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    category: "academic",
    type: "workshop",
    status: "pending",
    skills: [],
    certificates: [],
    images: [],
  })

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || activity.category === filterCategory
    const matchesStatus = filterStatus === "all" || activity.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddActivity = () => {
    if (!newActivity.title || !newActivity.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const activity: Activity = {
      id: Date.now().toString(),
      title: newActivity.title!,
      category: newActivity.category as Activity["category"],
      type: newActivity.type as Activity["type"],
      description: newActivity.description!,
      date: newActivity.date || new Date().toISOString().split("T")[0],
      duration: newActivity.duration || "1 day",
      location: newActivity.location || "TBD",
      organizer: newActivity.organizer || "Self",
      participants: newActivity.participants || 1,
      status: "pending",
      credits: newActivity.credits || 1,
      skills: newActivity.skills || [],
      certificates: newActivity.certificates || [],
      images: newActivity.images || [],
      outcomes: newActivity.outcomes || "",
      reflection: newActivity.reflection || "",
      submittedAt: new Date().toISOString(),
    }

    setActivities([activity, ...activities])
    setNewActivity({
      category: "academic",
      type: "workshop",
      status: "pending",
      skills: [],
      certificates: [],
      images: [],
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Success",
      description: "Activity submitted successfully for review.",
    })
  }

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((activity) => activity.id !== id))
    toast({
      title: "Success",
      description: "Activity deleted successfully.",
    })
  }

  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsViewDialogOpen(true)
  }

  const exportActivities = () => {
    const csvContent = activities
      .map(
        (activity) =>
          `"${activity.title}","${activity.category}","${activity.type}","${activity.status}","${activity.credits}","${activity.date}"`,
      )
      .join("\n")

    const blob = new Blob([`Title,Category,Type,Status,Credits,Date\n${csvContent}`], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "activities_report.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Success",
      description: "Activities exported successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your academic and extracurricular activities</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportActivities} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Activity Title *</Label>
                    <Input
                      id="title"
                      value={newActivity.title || ""}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      placeholder="Enter activity title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newActivity.date || ""}
                      onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newActivity.category}
                      onValueChange={(value) =>
                        setNewActivity({ ...newActivity, category: value as Activity["category"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="extracurricular">Extracurricular</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="social">Social Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newActivity.type}
                      onValueChange={(value) => setNewActivity({ ...newActivity, type: value as Activity["type"] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="competition">Competition</SelectItem>
                        <SelectItem value="project">Project</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="volunteer">Volunteer Work</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={newActivity.description || ""}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                    placeholder="Describe the activity, your role, and key learnings"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={newActivity.duration || ""}
                      onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                      placeholder="e.g., 2 days, 1 week"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newActivity.location || ""}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                      placeholder="Event location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={newActivity.credits || ""}
                      onChange={(e) =>
                        setNewActivity({ ...newActivity, credits: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="Credit points"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="outcomes">Key Outcomes</Label>
                  <Textarea
                    id="outcomes"
                    value={newActivity.outcomes || ""}
                    onChange={(e) => setNewActivity({ ...newActivity, outcomes: e.target.value })}
                    placeholder="What did you achieve or learn from this activity?"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="reflection">Personal Reflection</Label>
                  <Textarea
                    id="reflection"
                    value={newActivity.reflection || ""}
                    onChange={(e) => setNewActivity({ ...newActivity, reflection: e.target.value })}
                    placeholder="How did this activity contribute to your personal and professional growth?"
                    rows={2}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddActivity}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Submit Activity
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="extracurricular">Extracurricular</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
                <SelectItem value="social">Social Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid */}
      <div className="grid gap-6">
        {filteredActivities.map((activity) => {
          const CategoryIcon = categoryIcons[activity.category]
          return (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <CategoryIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{activity.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    </div>
                  </div>
                  <Badge className={`${statusColors[activity.status]} border`}>
                    {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    {activity.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {activity.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award className="h-4 w-4" />
                    {activity.credits} Credits
                  </div>
                </div>

                {activity.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {activity.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {activity.skills.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{activity.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Submitted: {new Date(activity.submittedAt).toLocaleDateString()}
                    {activity.reviewedAt && (
                      <span className="ml-2">• Reviewed: {new Date(activity.reviewedAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewActivity(activity)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    {activity.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredActivities.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Start by adding your first activity"}
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Add Your First Activity
            </Button>
          </CardContent>
        </Card>
      )}

      {/* View Activity Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {React.createElement(categoryIcons[selectedActivity.category], {
                      className: "h-5 w-5 text-blue-600",
                    })}
                  </div>
                  {selectedActivity.title}
                  <Badge className={`${statusColors[selectedActivity.status]} border ml-auto`}>
                    {selectedActivity.status.charAt(0).toUpperCase() + selectedActivity.status.slice(1)}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                  <TabsTrigger value="attachments">Attachments</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Category</Label>
                      <p className="text-sm text-gray-900 capitalize">{selectedActivity.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Type</Label>
                      <p className="text-sm text-gray-900 capitalize">{selectedActivity.type}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Date</Label>
                      <p className="text-sm text-gray-900">{new Date(selectedActivity.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Duration</Label>
                      <p className="text-sm text-gray-900">{selectedActivity.duration}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                      <p className="text-sm text-gray-900">{selectedActivity.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Organizer</Label>
                      <p className="text-sm text-gray-900">{selectedActivity.organizer}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Participants</Label>
                      <p className="text-sm text-gray-900">{selectedActivity.participants}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Credits</Label>
                      <p className="text-sm text-gray-900">{selectedActivity.credits}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedActivity.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Skills Developed</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedActivity.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="outcomes" className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Key Outcomes</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedActivity.outcomes}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Personal Reflection</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedActivity.reflection}</p>
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4">
                  {selectedActivity.certificates && selectedActivity.certificates.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Certificates</Label>
                      <div className="space-y-2 mt-1">
                        {selectedActivity.certificates.map((cert, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 border rounded">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{cert}</span>
                            <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedActivity.images && selectedActivity.images.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Images</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {selectedActivity.images.map((image, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-gray-100 rounded border flex items-center justify-center"
                          >
                            <span className="text-xs text-gray-500">{image}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="review" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Submitted At</Label>
                      <p className="text-sm text-gray-900">{new Date(selectedActivity.submittedAt).toLocaleString()}</p>
                    </div>
                    {selectedActivity.reviewedAt && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Reviewed At</Label>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedActivity.reviewedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedActivity.reviewedBy && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Reviewed By</Label>
                      <p className="text-sm text-gray-900">{selectedActivity.reviewedBy}</p>
                    </div>
                  )}

                  {selectedActivity.feedback && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Feedback</Label>
                      <p className="text-sm text-gray-900 mt-1">{selectedActivity.feedback}</p>
                    </div>
                  )}

                  {selectedActivity.status === "pending" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        This activity is currently under review. You will be notified once it has been evaluated.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
