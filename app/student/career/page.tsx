"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Search,
  ExternalLink,
  BookOpen,
  Trophy,
  Users,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Building,
  GraduationCap,
  Target,
  Zap,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock job data based on student skills
const jobRecommendations = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    type: "Internship",
    salary: "₹25,000/month",
    experience: "0-1 years",
    skills: ["React", "JavaScript", "Node.js", "MongoDB"],
    description: "Join our dynamic team as a Software Engineer Intern and work on cutting-edge web applications.",
    posted: "2 days ago",
    applicants: 45,
    match: 95,
    logo: "/placeholder.svg?height=40&width=40&text=TC",
    remote: false,
    featured: true,
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "DataFlow Analytics",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹6-8 LPA",
    experience: "0-2 years",
    skills: ["Python", "SQL", "Tableau", "Machine Learning"],
    description: "Analyze complex datasets and provide actionable insights to drive business decisions.",
    posted: "1 day ago",
    applicants: 32,
    match: 88,
    logo: "/placeholder.svg?height=40&width=40&text=DF",
    remote: true,
    featured: false,
  },
  {
    id: 3,
    title: "ML Engineer",
    company: "AI Innovations Ltd",
    location: "Chennai, India",
    type: "Full-time",
    salary: "₹8-12 LPA",
    experience: "1-3 years",
    skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
    description: "Build and deploy machine learning models to solve real-world problems.",
    posted: "3 days ago",
    applicants: 28,
    match: 82,
    logo: "/placeholder.svg?height=40&width=40&text=AI",
    remote: false,
    featured: true,
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "WebCraft Studios",
    location: "Mumbai, India",
    type: "Full-time",
    salary: "₹5-7 LPA",
    experience: "0-2 years",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    description: "Create beautiful and responsive user interfaces for modern web applications.",
    posted: "1 week ago",
    applicants: 67,
    match: 78,
    logo: "/placeholder.svg?height=40&width=40&text=WC",
    remote: true,
    featured: false,
  },
]

const hackathons = [
  {
    id: 1,
    title: "Smart India Hackathon 2024",
    organizer: "Government of India",
    date: "March 15-17, 2024",
    location: "Multiple Cities",
    prize: "₹1,00,000",
    participants: "50,000+",
    themes: ["AI/ML", "IoT", "Blockchain", "Healthcare"],
    registrationDeadline: "February 28, 2024",
    difficulty: "Advanced",
    type: "National",
    image: "/placeholder.svg?height=200&width=300&text=SIH2024",
  },
  {
    id: 2,
    title: "HackIndia 2024",
    organizer: "TechFest India",
    date: "April 5-7, 2024",
    location: "Bangalore",
    prize: "₹50,000",
    participants: "2,000+",
    themes: ["Web Development", "Mobile Apps", "DevOps"],
    registrationDeadline: "March 25, 2024",
    difficulty: "Intermediate",
    type: "Regional",
    image: "/placeholder.svg?height=200&width=300&text=HackIndia",
  },
  {
    id: 3,
    title: "CodeFest Hackathon",
    organizer: "Aditya University",
    date: "February 20-21, 2024",
    location: "University Campus",
    prize: "₹25,000",
    participants: "500+",
    themes: ["Problem Solving", "Innovation", "Sustainability"],
    registrationDeadline: "February 15, 2024",
    difficulty: "Beginner",
    type: "University",
    image: "/placeholder.svg?height=200&width=300&text=CodeFest",
  },
]

const internshipPrograms = [
  {
    id: 1,
    title: "Google Summer of Code",
    company: "Google",
    duration: "3 months",
    stipend: "$3,000",
    location: "Remote",
    deadline: "April 4, 2024",
    description: "Work on open source projects with mentorship from experienced developers.",
    requirements: ["Programming skills", "Open source contribution", "University student"],
    logo: "/placeholder.svg?height=40&width=40&text=G",
    type: "Open Source",
  },
  {
    id: 2,
    title: "Microsoft Internship Program",
    company: "Microsoft",
    duration: "12 weeks",
    stipend: "₹50,000/month",
    location: "Hyderabad",
    deadline: "March 15, 2024",
    description: "Join Microsoft's engineering teams and work on products used by millions.",
    requirements: ["CS/IT background", "Strong coding skills", "Problem-solving ability"],
    logo: "/placeholder.svg?height=40&width=40&text=M",
    type: "Corporate",
  },
  {
    id: 3,
    title: "Amazon SDE Internship",
    company: "Amazon",
    duration: "10-12 weeks",
    stipend: "₹80,000/month",
    location: "Bangalore",
    deadline: "February 28, 2024",
    description: "Work on large-scale distributed systems and customer-facing products.",
    requirements: ["Data structures", "Algorithms", "System design basics"],
    logo: "/placeholder.svg?height=40&width=40&text=A",
    type: "Corporate",
  },
]

export default function CareerHub() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([])
  const [appliedJobs, setAppliedJobs] = useState<number[]>([])
  const router = useRouter()

  const handleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const handleApplyJob = (jobId: number) => {
    setAppliedJobs((prev) => [...prev, jobId])
    alert("Application submitted successfully!")
  }

  const filteredJobs = jobRecommendations.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter)
    const matchesType = typeFilter === "all" || job.type === typeFilter
    return matchesSearch && matchesLocation && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
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
                <h1 className="text-xl font-bold text-gray-900">Career Hub</h1>
                <p className="text-sm text-gray-600">Discover opportunities tailored to your skills</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/student/resume")}>
                <GraduationCap className="h-4 w-4 mr-2" />
                Resume Builder
              </Button>
              <Button variant="outline" size="sm">
                <Target className="h-4 w-4 mr-2" />
                ATS Checker
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your Career Journey Starts Here</h2>
                  <p className="text-blue-100 text-lg mb-4">
                    Discover opportunities that match your skills and aspirations
                  </p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4" />
                      <span>500+ Job Openings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-4 w-4" />
                      <span>50+ Hackathons</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>200+ Companies</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-200 mb-1">Skill Match Score</div>
                  <div className="text-4xl font-bold">95%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{appliedJobs.length}</div>
              <div className="text-sm text-gray-600">Applications</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{savedJobs.length}</div>
              <div className="text-sm text-gray-600">Saved Jobs</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Profile Views</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">Interviews</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs">Jobs & Internships</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search jobs, companies, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                      <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="Chennai">Chennai</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={`hover:shadow-lg transition-shadow ${
                    job.featured ? "border-l-4 border-l-blue-500 bg-blue-50/30" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={job.logo || "/placeholder.svg"}
                          alt={job.company}
                          className="w-12 h-12 rounded-lg border bg-white"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=48&width=48&text=" + job.company[0]
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            {job.featured && <Badge className="bg-blue-100 text-blue-800">Featured</Badge>}
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{job.match}% match</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{job.company}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{job.salary}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.posted}</span>
                            </span>
                            {job.remote && <Badge variant="outline">Remote</Badge>}
                          </div>
                          <p className="text-gray-700 mb-3">{job.description}</p>
                          <div className="flex items-center space-x-2 mb-3">
                            {job.skills.slice(0, 4).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 4} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{job.applicants} applicants</span>
                            <span>{job.experience} experience</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleApplyJob(job.id)}
                          disabled={appliedJobs.includes(job.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {appliedJobs.includes(job.id) ? "Applied" : "Apply Now"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSaveJob(job.id)}
                          className="bg-transparent"
                        >
                          <Heart
                            className={`h-4 w-4 mr-1 ${savedJobs.includes(job.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          {savedJobs.includes(job.id) ? "Saved" : "Save"}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hackathons Tab */}
          <TabsContent value="hackathons" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {hackathons.map((hackathon) => (
                <Card key={hackathon.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="relative">
                    <img
                      src={hackathon.image || "/placeholder.svg"}
                      alt={hackathon.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=300&text=" + hackathon.title
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <Badge
                        className={`${hackathon.type === "National" ? "bg-red-500" : hackathon.type === "Regional" ? "bg-blue-500" : "bg-green-500"}`}
                      >
                        {hackathon.type}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">{hackathon.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">Organized by {hackathon.organizer}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{hackathon.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{hackathon.location}</span>
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Prize Pool:</span>
                        <span className="font-semibold text-green-600">{hackathon.prize}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Participants:</span>
                        <span className="font-semibold">{hackathon.participants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Difficulty:</span>
                        <Badge
                          variant="outline"
                          className={
                            hackathon.difficulty === "Advanced"
                              ? "border-red-200 text-red-600"
                              : hackathon.difficulty === "Intermediate"
                                ? "border-yellow-200 text-yellow-600"
                                : "border-green-200 text-green-600"
                          }
                        >
                          {hackathon.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Deadline:</span>
                        <span className="font-semibold text-red-600">{hackathon.registrationDeadline}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Themes:</p>
                      <div className="flex flex-wrap gap-1">
                        {hackathon.themes.map((theme, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Register Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <div className="space-y-4">
              {internshipPrograms.map((program) => (
                <Card key={program.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={program.logo || "/placeholder.svg"}
                          alt={program.company}
                          className="w-12 h-12 rounded-lg border bg-white"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=48&width=48&text=" + program.company[0]
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{program.title}</h3>
                            <Badge variant="outline">{program.type}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{program.company}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{program.duration}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>{program.stipend}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{program.location}</span>
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{program.description}</p>
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Requirements:</p>
                            <div className="flex flex-wrap gap-1">
                              {program.requirements.map((req, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-red-600 font-medium">
                            Application Deadline: {program.deadline}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Apply Now
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Career Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Career Resources</span>
            </CardTitle>
            <CardDescription>Tools and resources to boost your career prospects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2 bg-transparent"
                onClick={() => router.push("/student/resume")}
              >
                <GraduationCap className="h-6 w-6" />
                <span>Resume Builder</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Target className="h-6 w-6" />
                <span>ATS Score Checker</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Mock Interviews</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Zap className="h-6 w-6" />
                <span>Skill Assessment</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
