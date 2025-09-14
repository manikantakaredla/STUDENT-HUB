"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Download,
  Eye,
  Share2,
  Copy,
  ExternalLink,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  Github,
  Mail,
  Phone,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock portfolio data
const portfolioData = {
  personalInfo: {
    name: "Alexandra Chen",
    title: "Computer Science Student & Aspiring Software Engineer",
    bio: "Passionate about creating innovative solutions through technology. Experienced in full-stack development, machine learning, and data analysis. Always eager to learn and take on new challenges.",
    email: "alexandra.chen@student.adityauniversity.edu.in",
    phone: "+91 9876543210",
    location: "Bangalore, India",
    website: "alexandra-chen.dev",
    linkedin: "linkedin.com/in/alexandra-chen",
    github: "github.com/alexandra-chen",
    profileImage: "/placeholder.svg?height=200&width=200&text=AC",
  },
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: "Aditya University",
      location: "Andhra Pradesh, India",
      duration: "2021 - 2025",
      cgpa: "9.2/10.0",
      description:
        "Relevant coursework: Data Structures, Algorithms, Machine Learning, Web Development, Database Systems",
      selected: true,
    },
  ],
  experience: [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      duration: "Jun 2023 - Aug 2023",
      description:
        "Developed responsive web applications using React.js and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      achievements: [
        "Improved application performance by 25% through code optimization",
        "Implemented RESTful APIs and integrated third-party services",
        "Mentored 2 junior interns in web development best practices",
      ],
      selected: true,
    },
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce platform with user authentication, shopping cart, and payment integration",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
      duration: "Mar 2023 - May 2023",
      features: [
        "User authentication and authorization",
        "Shopping cart and order management",
        "Payment integration with Stripe",
        "Admin dashboard for inventory management",
      ],
      github: "github.com/alexandra-chen/ecommerce-platform",
      demo: "ecommerce-demo.alexandra-chen.dev",
      image: "/placeholder.svg?height=300&width=400&text=E-Commerce",
      selected: true,
    },
    {
      id: 2,
      title: "Machine Learning Stock Predictor",
      description: "ML model to predict stock prices using historical data with interactive dashboard",
      technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "Streamlit"],
      duration: "Jan 2023 - Feb 2023",
      features: [
        "LSTM neural network for time series prediction",
        "85% accuracy in stock price prediction",
        "Interactive dashboard for data visualization",
        "Real-time data fetching from financial APIs",
      ],
      github: "github.com/alexandra-chen/stock-predictor",
      demo: "stock-predictor.alexandra-chen.dev",
      image: "/placeholder.svg?height=300&width=400&text=ML+Stock",
      selected: true,
    },
    {
      id: 3,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates",
      technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
      duration: "Sep 2022 - Nov 2022",
      features: [
        "Real-time collaboration features",
        "Drag-and-drop task organization",
        "Team management and permissions",
        "Progress tracking and analytics",
      ],
      github: "github.com/alexandra-chen/task-manager",
      demo: "tasks.alexandra-chen.dev",
      image: "/placeholder.svg?height=300&width=400&text=Task+App",
      selected: false,
    },
  ],
  skills: {
    programming: ["JavaScript", "Python", "Java", "C++", "TypeScript"],
    web: ["React", "Node.js", "HTML/CSS", "Express", "MongoDB"],
    ml: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    tools: ["Git", "Docker", "AWS", "Linux", "VS Code"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"],
  },
  achievements: [
    {
      id: 1,
      title: "First Place - University Hackathon 2023",
      description: "Won first place in 48-hour hackathon with AI-powered solution for sustainable agriculture",
      date: "Oct 2023",
      organization: "Aditya University",
      selected: true,
    },
    {
      id: 2,
      title: "Google Summer of Code Participant",
      description: "Selected for GSoC 2023, contributed to open-source project with 500+ commits",
      date: "May 2023",
      organization: "Google",
      selected: true,
    },
    {
      id: 3,
      title: "Dean's List Recognition",
      description: "Recognized for academic excellence with CGPA above 9.0",
      date: "Dec 2022",
      organization: "Aditya University",
      selected: false,
    },
  ],
  certifications: [
    {
      id: 1,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Sep 2023",
      credentialId: "AWS-CCP-123456",
      selected: true,
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      issuer: "Coursera - Stanford University",
      date: "Jul 2023",
      credentialId: "COURSERA-ML-789012",
      selected: true,
    },
  ],
}

const portfolioTemplates = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and modern design with dark theme",
    preview: "/placeholder.svg?height=300&width=200&text=Modern",
    color: "slate",
  },
  {
    id: 2,
    name: "Creative Showcase",
    description: "Vibrant design perfect for creative portfolios",
    preview: "/placeholder.svg?height=300&width=200&text=Creative",
    color: "purple",
  },
  {
    id: 3,
    name: "Minimal Elegance",
    description: "Simple and elegant layout with focus on content",
    preview: "/placeholder.svg?height=300&width=200&text=Minimal",
    color: "blue",
  },
  {
    id: 4,
    name: "Tech Focus",
    description: "Technology-focused design with code highlights",
    preview: "/placeholder.svg?height=300&width=200&text=Tech",
    color: "green",
  },
]

export default function PortfolioGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [portfolioInfo, setPortfolioInfo] = useState(portfolioData)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [portfolioUrl] = useState("https://portfolio.alexandra-chen.dev")
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const handleToggleSelection = (section: string, id: number) => {
    setPortfolioInfo((prev) => ({
      ...prev,
      [section]: prev[section as keyof typeof prev].map((item: any) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    }))
  }

  const handleGeneratePortfolio = async () => {
    setIsGenerating(true)
    // Simulate portfolio generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)
    alert("Portfolio generated successfully!")
  }

  const handleDownloadPDF = () => {
    alert("Portfolio downloaded as PDF!")
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl)
    alert("Portfolio link copied to clipboard!")
  }

  const selectedProjects = portfolioInfo.projects.filter((p) => p.selected)
  const selectedAchievements = portfolioInfo.achievements.filter((a) => a.selected)
  const selectedCertifications = portfolioInfo.certifications.filter((c) => c.selected)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
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
                <h1 className="text-xl font-bold text-gray-900">Portfolio Generator</h1>
                <p className="text-sm text-gray-600">Create your professional digital portfolio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Your Portfolio</DialogTitle>
                    <DialogDescription>
                      Share your portfolio with potential employers and collaborators
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Portfolio URL</Label>
                      <div className="flex space-x-2">
                        <Input value={portfolioUrl} readOnly />
                        <Button size="sm" onClick={handleCopyLink}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Portfolio
                      </Button>
                      <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={handleGeneratePortfolio} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Portfolio"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select a template that represents your style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolioTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                        selectedTemplate === template.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-32 object-cover rounded mb-2"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=128&width=100&text=" + template.name
                        }}
                      />
                      <h3 className="font-medium text-sm">{template.name}</h3>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Content Selection */}
            <Tabs defaultValue="projects" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              {/* Projects Tab */}
              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Projects to Include</CardTitle>
                    <CardDescription>Choose the projects you want to showcase in your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioInfo.projects.map((project) => (
                        <Card
                          key={project.id}
                          className={`transition-all ${project.selected ? "border-purple-500 bg-purple-50" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <Checkbox
                                checked={project.selected}
                                onCheckedChange={() => handleToggleSelection("projects", project.id)}
                              />
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-20 h-20 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=80&width=80&text=" + project.title[0]
                                }}
                              />
                              <div className="flex-1">
                                <h3 className="font-semibold mb-2">{project.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {project.technologies.slice(0, 4).map((tech, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>{project.duration}</span>
                                  {project.github && (
                                    <span className="flex items-center space-x-1">
                                      <Github className="h-3 w-3" />
                                      <span>GitHub</span>
                                    </span>
                                  )}
                                  {project.demo && (
                                    <span className="flex items-center space-x-1">
                                      <ExternalLink className="h-3 w-3" />
                                      <span>Live Demo</span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Achievements to Include</CardTitle>
                    <CardDescription>Highlight your accomplishments and recognitions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioInfo.achievements.map((achievement) => (
                        <Card
                          key={achievement.id}
                          className={`transition-all ${achievement.selected ? "border-purple-500 bg-purple-50" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <Checkbox
                                checked={achievement.selected}
                                onCheckedChange={() => handleToggleSelection("achievements", achievement.id)}
                              />
                              <div className="p-3 bg-yellow-100 rounded-full">
                                <Award className="h-6 w-6 text-yellow-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{achievement.date}</span>
                                  </span>
                                  <span>{achievement.organization}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                    <CardDescription>Your work experience and internships</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioInfo.experience.map((exp) => (
                        <Card
                          key={exp.id}
                          className={`transition-all ${exp.selected ? "border-purple-500 bg-purple-50" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <Checkbox
                                checked={exp.selected}
                                onCheckedChange={() => handleToggleSelection("experience", exp.id)}
                              />
                              <div className="p-3 bg-blue-100 rounded-full">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{exp.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {exp.company} • {exp.location}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">{exp.description}</p>
                                <div className="text-sm text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{exp.duration}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certifications Tab */}
              <TabsContent value="certifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Certifications</CardTitle>
                    <CardDescription>Professional certifications and courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {portfolioInfo.certifications.map((cert) => (
                        <Card
                          key={cert.id}
                          className={`transition-all ${cert.selected ? "border-purple-500 bg-purple-50" : ""}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-4">
                              <Checkbox
                                checked={cert.selected}
                                onCheckedChange={() => handleToggleSelection("certifications", cert.id)}
                              />
                              <div className="p-3 bg-green-100 rounded-full">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">{cert.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{cert.date}</span>
                                  </span>
                                  <span>ID: {cert.credentialId}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Portfolio Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Portfolio Preview</span>
                </CardTitle>
                <CardDescription>Live preview of your portfolio website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 text-center">
                    <img
                      src={portfolioInfo.personalInfo.profileImage || "/placeholder.svg"}
                      alt={portfolioInfo.personalInfo.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/placeholder.svg?height=80&width=80&text=" + portfolioInfo.personalInfo.name[0]
                      }}
                    />
                    <h1 className="text-xl font-bold mb-1">{portfolioInfo.personalInfo.name}</h1>
                    <p className="text-purple-100 text-sm">{portfolioInfo.personalInfo.title}</p>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-4">
                    {/* About */}
                    <div>
                      <h2 className="font-semibold text-sm mb-2">About</h2>
                      <p className="text-xs text-gray-700">{portfolioInfo.personalInfo.bio}</p>
                    </div>

                    {/* Contact */}
                    <div>
                      <h2 className="font-semibold text-sm mb-2">Contact</h2>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3" />
                          <span>{portfolioInfo.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3" />
                          <span>{portfolioInfo.personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{portfolioInfo.personalInfo.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Selected Projects */}
                    {selectedProjects.length > 0 && (
                      <div>
                        <h2 className="font-semibold text-sm mb-2">Featured Projects ({selectedProjects.length})</h2>
                        <div className="space-y-2">
                          {selectedProjects.slice(0, 2).map((project) => (
                            <div key={project.id} className="border rounded p-2">
                              <h3 className="font-medium text-xs mb-1">{project.title}</h3>
                              <p className="text-xs text-gray-600 mb-1">{project.description.slice(0, 60)}...</p>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.slice(0, 3).map((tech, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div>
                      <h2 className="font-semibold text-sm mb-2">Skills</h2>
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {portfolioInfo.skills.programming.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Selected Achievements */}
                    {selectedAchievements.length > 0 && (
                      <div>
                        <h2 className="font-semibold text-sm mb-2">Achievements ({selectedAchievements.length})</h2>
                        <div className="space-y-1">
                          {selectedAchievements.slice(0, 2).map((achievement) => (
                            <div key={achievement.id} className="text-xs">
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-gray-600">{achievement.date}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Portfolio Stats */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">Portfolio Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{selectedProjects.length}</div>
                      <div className="text-gray-600">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">{selectedAchievements.length}</div>
                      <div className="text-gray-600">Achievements</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{portfolioInfo.experience.length}</div>
                      <div className="text-gray-600">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-orange-600">{selectedCertifications.length}</div>
                      <div className="text-gray-600">Certifications</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 space-y-2">
                  <Button className="w-full" onClick={handleGeneratePortfolio} disabled={isGenerating}>
                    {isGenerating ? "Generating..." : "Generate Portfolio"}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsShareDialogOpen(true)}
                      className="bg-transparent"
                    >
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="bg-transparent">
                      <Download className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
