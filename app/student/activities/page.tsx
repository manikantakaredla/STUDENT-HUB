"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Upload,
  ArrowLeft,
  Calendar,
  Award,
  BookOpen,
  Trophy,
  Users,
  Download,
  Eye,
  Building2,
  MapPin,
  Star,
  FileText,
  ImageIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"

const mockActivities = [
  // Achievements
  {
    id: 1,
    title: "Hackathon Winner - First Place",
    type: "Competition",
    category: "achievements",
    status: "approved",
    date: "2024-01-10",
    credits: 5,
    description: "Won first place in university-wide hackathon with AI-powered solution for healthcare",
    documents: ["winner_certificate.pdf", "project_demo.mp4"],
    verifiedBy: "Prof. Johnson",
    image: "/hackathon-winner-trophy.jpg",
    organization: "Aditya University",
    location: "Main Campus",
    prize: "₹50,000 + Trophy",
    participants: 150,
  },
  {
    id: 2,
    title: "Research Paper Publication",
    type: "Research",
    category: "achievements",
    status: "approved",
    date: "2024-01-08",
    credits: 8,
    description: "Published research paper on neural networks in IEEE conference",
    documents: ["research_paper.pdf", "acceptance_letter.pdf"],
    verifiedBy: "Dr. Smith",
    image: "/research-publication-certificate.jpg",
    organization: "IEEE Conference",
    location: "International",
    impact: "Cited 15 times",
    coAuthors: 3,
  },
  {
    id: 3,
    title: "Best Student Award 2024",
    type: "Recognition",
    category: "achievements",
    status: "approved",
    date: "2024-01-05",
    credits: 10,
    description: "Received best student award for academic excellence and leadership",
    documents: ["award_certificate.pdf"],
    verifiedBy: "Dean",
    image: "/best-student-award-medal.jpg",
    organization: "Aditya University",
    location: "Annual Convocation",
    criteria: "Academic Excellence + Leadership",
  },
  // Certificates
  {
    id: 4,
    title: "AWS Cloud Practitioner",
    type: "Certification",
    category: "certificates",
    status: "approved",
    date: "2024-01-15",
    credits: 4,
    description: "AWS Certified Cloud Practitioner certification",
    documents: ["aws_certificate.pdf"],
    verifiedBy: "Dr. Wilson",
    image: "/aws-certification-badge.jpg",
    organization: "Amazon Web Services",
    validUntil: "2027-01-15",
    credentialId: "AWS-CCP-2024-001",
    skills: ["Cloud Computing", "AWS Services", "Security"],
  },
  {
    id: 5,
    title: "Google Data Analytics Certificate",
    type: "Certification",
    category: "certificates",
    status: "approved",
    date: "2024-01-12",
    credits: 3,
    description: "Professional certificate in data analytics from Google",
    documents: ["google_certificate.pdf"],
    verifiedBy: "Prof. Davis",
    image: "/google-data-analytics-certificate.jpg",
    organization: "Google",
    validUntil: "Lifetime",
    credentialId: "GDA-2024-567",
    skills: ["Data Analysis", "SQL", "Tableau", "R Programming"],
  },
  {
    id: 6,
    title: "Microsoft Azure Fundamentals",
    type: "Certification",
    category: "certificates",
    status: "pending",
    date: "2024-01-20",
    credits: 0,
    description: "Azure Fundamentals certification from Microsoft",
    documents: ["azure_certificate.pdf"],
    verifiedBy: null,
    image: "/microsoft-azure-certification.jpg",
    organization: "Microsoft",
    validUntil: "2027-01-20",
    credentialId: "AZ-900-2024-123",
    skills: ["Cloud Services", "Azure", "Security"],
  },
  // Internships
  {
    id: 7,
    title: "Software Development Intern",
    type: "Internship",
    category: "internships",
    status: "approved",
    date: "2024-01-01",
    endDate: "2024-03-31",
    credits: 10,
    description: "3-month internship as software development intern at TechCorp",
    documents: ["internship_certificate.pdf", "completion_letter.pdf", "project_report.pdf"],
    verifiedBy: "Dr. Wilson",
    image: "/software-development-internship-office.jpg",
    organization: "TechCorp Solutions",
    location: "Hyderabad, India",
    duration: "3 months",
    stipend: "₹25,000/month",
    mentor: "John Smith, Senior Developer",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    projects: ["E-commerce Platform", "Admin Dashboard"],
  },
  {
    id: 8,
    title: "Data Science Intern",
    type: "Internship",
    category: "internships",
    status: "approved",
    date: "2023-12-01",
    endDate: "2024-02-29",
    credits: 8,
    description: "Data science internship focusing on machine learning projects",
    documents: ["internship_certificate.pdf", "project_presentation.pptx"],
    verifiedBy: "Prof. Johnson",
    image: "/data-science-internship-workspace.jpg",
    organization: "DataTech Analytics",
    location: "Bangalore, India",
    duration: "3 months",
    stipend: "₹30,000/month",
    mentor: "Dr. Sarah Wilson, Lead Data Scientist",
    technologies: ["Python", "TensorFlow", "Pandas", "Jupyter"],
    projects: ["Customer Churn Prediction", "Sales Forecasting"],
  },
  // Regular Activities
  {
    id: 9,
    title: "Machine Learning Workshop",
    type: "Workshop",
    category: "activities",
    status: "approved",
    date: "2024-01-15",
    credits: 2,
    description: "Attended comprehensive ML workshop covering supervised and unsupervised learning",
    documents: ["certificate.pdf"],
    verifiedBy: "Dr. Smith",
    image: "/machine-learning-workshop.jpg",
    organization: "Tech Institute",
    duration: "2 days",
  },
  {
    id: 10,
    title: "Technical Seminar Presentation",
    type: "Seminar",
    category: "activities",
    status: "rejected",
    date: "2024-01-03",
    credits: 1,
    description: "Presented on blockchain technology applications",
    documents: ["presentation.pptx"],
    verifiedBy: "Prof. Davis",
    rejectionReason: "Insufficient documentation provided",
    image: "/technical-presentation-seminar.jpg",
    organization: "Computer Science Department",
    duration: "1 hour",
  },
]

export default function ActivitiesPage() {
  const [activities, setActivities] = useState(mockActivities)
  const [filteredActivities, setFilteredActivities] = useState(mockActivities)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [newActivity, setNewActivity] = useState({
    title: "",
    type: "",
    category: "activities",
    date: "",
    description: "",
    documents: [],
  })
  const router = useRouter()

  useEffect(() => {
    let filtered = activities

    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.type.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((activity) => activity.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((activity) => activity.category === categoryFilter)
    }

    setFilteredActivities(filtered)
  }, [activities, searchTerm, statusFilter, categoryFilter])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "activities":
        return <BookOpen className="h-5 w-5 text-blue-600" />
      case "achievements":
        return <Trophy className="h-5 w-5 text-yellow-600" />
      case "certificates":
        return <Award className="h-5 w-5 text-purple-600" />
      case "internships":
        return <ImageIcon className="h-5 w-5 text-green-600" />
      default:
        return <Award className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "activities":
        return "from-blue-500 to-cyan-500"
      case "achievements":
        return "from-yellow-500 to-orange-500"
      case "certificates":
        return "from-purple-500 to-pink-500"
      case "internships":
        return "from-green-500 to-teal-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const handleAddActivity = () => {
    const activity = {
      id: activities.length + 1,
      ...newActivity,
      status: "pending",
      credits: 0,
      documents: [],
      verifiedBy: null,
    }
    setActivities([activity, ...activities])
    setNewActivity({
      title: "",
      type: "",
      category: "activities",
      date: "",
      description: "",
      documents: [],
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter((activity) => activity.id !== id))
  }

  const activityStats = {
    total: activities.length,
    approved: activities.filter((a) => a.status === "approved").length,
    pending: activities.filter((a) => a.status === "pending").length,
    rejected: activities.filter((a) => a.status === "rejected").length,
    totalCredits: activities.filter((a) => a.status === "approved").reduce((sum, a) => sum + a.credits, 0),
    achievements: activities.filter((a) => a.category === "achievements").length,
    certificates: activities.filter((a) => a.category === "certificates").length,
    internships: activities.filter((a) => a.category === "internships").length,
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
                <h1 className="text-xl font-bold text-gray-900">Activities & Achievements</h1>
                <p className="text-sm text-gray-600">Manage your academic journey</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Activity</DialogTitle>
                  <DialogDescription>Submit your activity for verification and credit approval</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Activity Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter activity title"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Activity Type</Label>
                      <Select
                        value={newActivity.type}
                        onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                          <SelectItem value="Competition">Competition</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                          <SelectItem value="Research">Research</SelectItem>
                          <SelectItem value="Certification">Certification</SelectItem>
                          <SelectItem value="Conference">Conference</SelectItem>
                          <SelectItem value="Project">Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newActivity.category}
                        onValueChange={(value) => setNewActivity({ ...newActivity, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activities">Activities</SelectItem>
                          <SelectItem value="achievements">Achievements</SelectItem>
                          <SelectItem value="certificates">Certificates</SelectItem>
                          <SelectItem value="internships">Internships</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newActivity.date}
                        onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your activity in detail"
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documents">Supporting Documents</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddActivity}>Submit for Approval</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.total}</div>
              <div className="text-sm opacity-90">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.approved}</div>
              <div className="text-sm opacity-90">Approved</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.achievements}</div>
              <div className="text-sm opacity-90">Achievements</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.certificates}</div>
              <div className="text-sm opacity-90">Certificates</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-teal-500 to-green-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.internships}</div>
              <div className="text-sm opacity-90">Internships</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.pending}</div>
              <div className="text-sm opacity-90">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{activityStats.totalCredits}</div>
              <div className="text-sm opacity-90">Credits</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="activities">Activities</SelectItem>
                  <SelectItem value="achievements">Achievements</SelectItem>
                  <SelectItem value="certificates">Certificates</SelectItem>
                  <SelectItem value="internships">Internships</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs with better organization */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className={`h-2 bg-gradient-to-r ${getCategoryColor(activity.category)}`} />
                  {activity.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusBadge(activity.status)}>
                          {getStatusIcon(activity.status)}
                          <span className="ml-1">{activity.status}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <div className={`p-2 bg-gradient-to-r ${getCategoryColor(activity.category)} rounded-full`}>
                          {getCategoryIcon(activity.category)}
                        </div>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{activity.type}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {activity.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">{activity.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{activity.date}</span>
                        </span>
                        {activity.status === "approved" && (
                          <span className="flex items-center space-x-1 text-purple-600 font-medium">
                            <Award className="h-4 w-4" />
                            <span>+{activity.credits}</span>
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => setSelectedActivity(activity)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                        {activity.status === "pending" && (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities
                .filter((a) => a.category === "achievements")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-l-4 border-l-yellow-400"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusBadge(activity.status)}>
                          {getStatusIcon(activity.status)}
                          <span className="ml-1">{activity.status}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                          <Trophy className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            {activity.prize && (
                              <Badge className="bg-yellow-100 text-yellow-800">{activity.prize}</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span>{activity.organization}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{activity.location}</span>
                          </div>
                          {activity.participants && (
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{activity.participants} participants</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{activity.date}</span>
                          {activity.status === "approved" && (
                            <span className="flex items-center space-x-1 text-yellow-600 font-medium">
                              <Star className="h-4 w-4" />
                              <span>+{activity.credits} credits</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities
                .filter((a) => a.category === "certificates")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-l-4 border-l-purple-400"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusBadge(activity.status)}>
                          {getStatusIcon(activity.status)}
                          <span className="ml-1">{activity.status}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            <Badge className="bg-purple-100 text-purple-800">{activity.organization}</Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Credential ID:</span>
                            <span className="font-mono text-xs">{activity.credentialId}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Valid Until:</span>
                            <span>{activity.validUntil}</span>
                          </div>
                          {activity.skills && (
                            <div>
                              <span className="text-gray-500 text-xs">Skills:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {activity.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="internships" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredActivities
                .filter((a) => a.category === "internships")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-l-4 border-l-green-400"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getStatusBadge(activity.status)}>
                          {getStatusIcon(activity.status)}
                          <span className="ml-1">{activity.status}</span>
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full">
                          <ImageIcon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{activity.organization}</Badge>
                            <Badge className="bg-green-100 text-green-800">{activity.duration}</Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <p className="font-medium">{activity.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Stipend:</span>
                            <p className="font-medium text-green-600">{activity.stipend}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Mentor:</span>
                            <p className="font-medium">{activity.mentor}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <p className="font-medium">
                              {activity.date} - {activity.endDate}
                            </p>
                          </div>
                        </div>
                        {activity.technologies && (
                          <div>
                            <span className="text-gray-500 text-sm">Technologies:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {activity.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {activity.projects && (
                          <div>
                            <span className="text-gray-500 text-sm">Projects:</span>
                            <ul className="list-disc list-inside text-sm mt-1">
                              {activity.projects.map((project, index) => (
                                <li key={index} className="text-gray-700">
                                  {project}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Certificate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Regular Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities
                .filter((a) => a.category === "activities")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="hover:shadow-xl transition-all duration-300 overflow-hidden group border-l-4 border-l-blue-400"
                  >
                    {activity.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={getStatusBadge(activity.status)}>
                            {getStatusIcon(activity.status)}
                            <span className="ml-1">{activity.status}</span>
                          </Badge>
                        </div>
                        <div className="absolute top-2 left-2">
                          <div className={`p-2 bg-gradient-to-r ${getCategoryColor(activity.category)} rounded-full`}>
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{activity.type}</Badge>
                            {activity.organization && <Badge variant="secondary">{activity.organization}</Badge>}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{activity.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{activity.date}</span>
                          {activity.status === "approved" && (
                            <span className="flex items-center space-x-1 text-blue-600 font-medium">
                              <Award className="h-4 w-4" />
                              <span>+{activity.credits} credits</span>
                            </span>
                          )}
                        </div>
                        {activity.status === "rejected" && activity.rejectionReason && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">
                              <strong>Rejection Reason:</strong> {activity.rejectionReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedActivity?.title}</DialogTitle>
              <DialogDescription>
                {selectedActivity?.organization} • {selectedActivity?.date}
              </DialogDescription>
            </DialogHeader>
            {selectedActivity && (
              <div className="space-y-6">
                {selectedActivity.image && (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <img
                      src={selectedActivity.image || "/placeholder.svg"}
                      alt={selectedActivity.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-700">{selectedActivity.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Type:</span>
                          <span>{selectedActivity.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Category:</span>
                          <span className="capitalize">{selectedActivity.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <Badge className={getStatusBadge(selectedActivity.status)}>{selectedActivity.status}</Badge>
                        </div>
                        {selectedActivity.credits > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Credits:</span>
                            <span className="font-medium text-purple-600">+{selectedActivity.credits}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {selectedActivity.documents && selectedActivity.documents.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
                        <div className="space-y-2">
                          {selectedActivity.documents.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{doc}</span>
                              </div>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedActivity.skills && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedActivity.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedActivity.technologies && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedActivity.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
