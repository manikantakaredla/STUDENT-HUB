"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  Eye,
  Plus,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Target,
  Share2,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock resume data
const resumeData = {
  personalInfo: {
    name: "Alexandra Chen",
    email: "alexandra.chen@student.adityauniversity.edu.in",
    phone: "+91 9876543210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/alexandra-chen",
    github: "github.com/alexandra-chen",
    portfolio: "alexandra-chen.dev",
  },
  summary:
    "Passionate Computer Science student with strong programming skills and experience in web development, machine learning, and data analysis. Seeking opportunities to apply technical knowledge in real-world projects.",
  education: [
    {
      id: 1,
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: "Aditya University",
      location: "Andhra Pradesh, India",
      duration: "2021 - 2025",
      cgpa: "9.2/10.0",
      relevant: ["Data Structures", "Algorithms", "Machine Learning", "Web Development"],
    },
  ],
  experience: [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      duration: "Jun 2023 - Aug 2023",
      description: [
        "Developed responsive web applications using React.js and Node.js",
        "Collaborated with cross-functional teams to deliver high-quality software solutions",
        "Implemented RESTful APIs and integrated third-party services",
        "Improved application performance by 25% through code optimization",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      duration: "Mar 2023 - May 2023",
      description: [
        "Built a full-stack e-commerce platform with user authentication and payment integration",
        "Implemented shopping cart functionality and order management system",
        "Deployed on AWS with CI/CD pipeline using GitHub Actions",
      ],
      github: "github.com/alexandra-chen/ecommerce-platform",
      demo: "ecommerce-demo.alexandra-chen.dev",
    },
    {
      id: 2,
      title: "Machine Learning Stock Predictor",
      technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      duration: "Jan 2023 - Feb 2023",
      description: [
        "Developed ML model to predict stock prices using historical data",
        "Achieved 85% accuracy using LSTM neural networks",
        "Created interactive dashboard for data visualization",
      ],
      github: "github.com/alexandra-chen/stock-predictor",
    },
  ],
  skills: {
    programming: ["JavaScript", "Python", "Java", "C++", "TypeScript"],
    web: ["React", "Node.js", "HTML/CSS", "Express", "MongoDB"],
    ml: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    tools: ["Git", "Docker", "AWS", "Linux", "VS Code"],
  },
  achievements: [
    {
      id: 1,
      title: "First Place - University Hackathon 2023",
      description: "Won first place in 48-hour hackathon with AI-powered solution",
      date: "Oct 2023",
    },
    {
      id: 2,
      title: "Google Summer of Code Participant",
      description: "Selected for GSoC 2023, contributed to open-source project",
      date: "May 2023",
    },
  ],
  certifications: [
    {
      id: 1,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Sep 2023",
      credentialId: "AWS-CCP-123456",
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      issuer: "Coursera - Stanford University",
      date: "Jul 2023",
      credentialId: "COURSERA-ML-789012",
    },
  ],
}

const resumeTemplates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern design perfect for tech roles",
    preview: "/placeholder.svg?height=300&width=200&text=Professional",
    color: "blue",
  },
  {
    id: 2,
    name: "Creative",
    description: "Eye-catching design for creative positions",
    preview: "/placeholder.svg?height=300&width=200&text=Creative",
    color: "purple",
  },
  {
    id: 3,
    name: "Minimal",
    description: "Simple and elegant layout",
    preview: "/placeholder.svg?height=300&width=200&text=Minimal",
    color: "gray",
  },
  {
    id: 4,
    name: "Modern",
    description: "Contemporary design with accent colors",
    preview: "/placeholder.svg?height=300&width=200&text=Modern",
    color: "green",
  },
]

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState(1)
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeInfo, setResumeInfo] = useState(resumeData)
  const [atsScore, setAtsScore] = useState(85)
  const router = useRouter()

  const steps = [
    { title: "Personal Info", icon: User },
    { title: "Summary", icon: FileText },
    { title: "Education", icon: GraduationCap },
    { title: "Experience", icon: Briefcase },
    { title: "Projects", icon: Code },
    { title: "Skills", icon: Target },
    { title: "Achievements", icon: Award },
  ]

  const handleDownloadPDF = () => {
    alert("Resume downloaded as PDF!")
  }

  const handleATSCheck = () => {
    // Simulate ATS analysis
    const scores = [78, 82, 85, 88, 91, 85]
    const randomScore = scores[Math.floor(Math.random() * scores.length)]
    setAtsScore(randomScore)
    alert(`ATS Score: ${randomScore}/100`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/student/career")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Career Hub
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-sm text-gray-600">Create your professional resume</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleATSCheck}>
                <Target className="h-4 w-4 mr-2" />
                ATS Check ({atsScore}/100)
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Builder Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select a template that best fits your style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {resumeTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
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

            {/* Multi-step Form */}
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
                <CardDescription>Fill in your information step by step</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Step Navigation */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {steps.map((step, index) => (
                    <Button
                      key={index}
                      variant={currentStep === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentStep(index)}
                      className="flex items-center space-x-2"
                    >
                      <step.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{step.title}</span>
                    </Button>
                  ))}
                </div>

                {/* Step Content */}
                <div className="space-y-4">
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={resumeInfo.personalInfo.name}
                            onChange={(e) =>
                              setResumeInfo({
                                ...resumeInfo,
                                personalInfo: { ...resumeInfo.personalInfo, name: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={resumeInfo.personalInfo.email}
                            onChange={(e) =>
                              setResumeInfo({
                                ...resumeInfo,
                                personalInfo: { ...resumeInfo.personalInfo, email: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeInfo.personalInfo.phone}
                            onChange={(e) =>
                              setResumeInfo({
                                ...resumeInfo,
                                personalInfo: { ...resumeInfo.personalInfo, phone: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={resumeInfo.personalInfo.location}
                            onChange={(e) =>
                              setResumeInfo({
                                ...resumeInfo,
                                personalInfo: { ...resumeInfo.personalInfo, location: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={resumeInfo.personalInfo.linkedin}
                            onChange={(e) =>
                              setResumeInfo({
                                ...resumeInfo,
                                personalInfo: { ...resumeInfo.personalInfo, linkedin: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="github">GitHub</Label>
                          <Input
                            id="github"
                            value={resumeInfo.personalInfo.github}
                            onChange={(e) =>
                              setResumeInfo({
                                ...resumeInfo,
                                personalInfo: { ...resumeInfo.personalInfo, github: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Professional Summary</h3>
                      <div className="space-y-2">
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                          id="summary"
                          rows={4}
                          placeholder="Write a brief professional summary..."
                          value={resumeInfo.summary}
                          onChange={(e) => setResumeInfo({ ...resumeInfo, summary: e.target.value })}
                        />
                        <p className="text-sm text-gray-500">
                          Tip: Keep it concise and highlight your key strengths and career objectives.
                        </p>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Education</h3>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                      {resumeInfo.education.map((edu, index) => (
                        <Card key={edu.id} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input value={edu.degree} />
                            </div>
                            <div className="space-y-2">
                              <Label>Institution</Label>
                              <Input value={edu.institution} />
                            </div>
                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <Input value={edu.duration} />
                            </div>
                            <div className="space-y-2">
                              <Label>CGPA/Percentage</Label>
                              <Input value={edu.cgpa} />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Add more step content as needed */}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                    disabled={currentStep === steps.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Resume Preview</span>
                </CardTitle>
                <CardDescription>Live preview of your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="text-center border-b pb-4">
                      <h2 className="text-xl font-bold">{resumeInfo.personalInfo.name}</h2>
                      <p className="text-sm text-gray-600">{resumeInfo.personalInfo.email}</p>
                      <p className="text-sm text-gray-600">{resumeInfo.personalInfo.phone}</p>
                      <p className="text-sm text-gray-600">{resumeInfo.personalInfo.location}</p>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2">PROFESSIONAL SUMMARY</h3>
                      <p className="text-xs text-gray-700">{resumeInfo.summary}</p>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2">EDUCATION</h3>
                      {resumeInfo.education.map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <p className="text-xs font-medium">{edu.degree}</p>
                          <p className="text-xs text-gray-600">
                            {edu.institution} | {edu.duration}
                          </p>
                          <p className="text-xs text-gray-600">CGPA: {edu.cgpa}</p>
                        </div>
                      ))}
                    </div>

                    {/* Skills Preview */}
                    <div>
                      <h3 className="font-semibold text-sm mb-2">TECHNICAL SKILLS</h3>
                      <div className="space-y-1">
                        <p className="text-xs">
                          <span className="font-medium">Programming:</span> {resumeInfo.skills.programming.join(", ")}
                        </p>
                        <p className="text-xs">
                          <span className="font-medium">Web Technologies:</span> {resumeInfo.skills.web.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">ATS Score</span>
                    <Badge
                      className={
                        atsScore >= 80
                          ? "bg-green-100 text-green-800"
                          : atsScore >= 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {atsScore}/100
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        atsScore >= 80 ? "bg-green-500" : atsScore >= 60 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${atsScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {atsScore >= 80
                      ? "Excellent! Your resume is ATS-friendly."
                      : atsScore >= 60
                        ? "Good, but could be improved."
                        : "Needs improvement for ATS compatibility."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 space-y-2">
                  <Button className="w-full" onClick={handleDownloadPDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
