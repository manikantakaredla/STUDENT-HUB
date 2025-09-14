"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, Award, TrendingUp, Plus, Star, BookOpen, Target, Brain, Heart, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Skill {
  id: string
  name: string
  category: "technical" | "soft" | "language" | "domain"
  level: number // 1-5
  endorsements: number
  lastUpdated: string
  description: string
  projects: string[]
  certifications: string[]
  verified: boolean
}

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "JavaScript",
    category: "technical",
    level: 4,
    endorsements: 12,
    lastUpdated: "2024-03-15",
    description: "Proficient in modern JavaScript, ES6+, async programming, and DOM manipulation",
    projects: ["E-commerce Website", "Task Management App", "Weather Dashboard"],
    certifications: ["JavaScript Fundamentals Certificate"],
    verified: true,
  },
  {
    id: "2",
    name: "React",
    category: "technical",
    level: 4,
    endorsements: 8,
    lastUpdated: "2024-03-10",
    description: "Experienced in building responsive web applications using React, hooks, and state management",
    projects: ["Student Portal", "Social Media Dashboard"],
    certifications: ["React Developer Certificate"],
    verified: true,
  },
  {
    id: "3",
    name: "Python",
    category: "technical",
    level: 5,
    endorsements: 15,
    lastUpdated: "2024-03-20",
    description: "Expert in Python programming, data analysis, machine learning, and web development",
    projects: ["ML Prediction Model", "Data Analysis Dashboard", "Web Scraper"],
    certifications: ["Python Professional Certificate", "Data Science with Python"],
    verified: true,
  },
  {
    id: "4",
    name: "Leadership",
    category: "soft",
    level: 3,
    endorsements: 6,
    lastUpdated: "2024-02-28",
    description: "Experience leading teams, organizing events, and mentoring junior students",
    projects: ["Tech Club President", "Hackathon Organizer"],
    certifications: ["Leadership Excellence Certificate"],
    verified: false,
  },
  {
    id: "5",
    name: "Machine Learning",
    category: "domain",
    level: 3,
    endorsements: 10,
    lastUpdated: "2024-03-18",
    description: "Knowledge of ML algorithms, neural networks, and practical implementation",
    projects: ["Image Classification Model", "Sentiment Analysis Tool"],
    certifications: ["ML Fundamentals Certificate"],
    verified: true,
  },
]

const categoryIcons = {
  technical: Code,
  soft: Heart,
  language: BookOpen,
  domain: Brain,
}

const categoryColors = {
  technical: "bg-blue-100 text-blue-800 border-blue-200",
  soft: "bg-green-100 text-green-800 border-green-200",
  language: "bg-purple-100 text-purple-800 border-purple-200",
  domain: "bg-orange-100 text-orange-800 border-orange-200",
}

const levelLabels = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert"]

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(mockSkills)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    category: "technical",
    level: 1,
    endorsements: 0,
    projects: [],
    certifications: [],
    verified: false,
  })

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || skill.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const skillsByCategory = {
    technical: skills.filter((s) => s.category === "technical"),
    soft: skills.filter((s) => s.category === "soft"),
    language: skills.filter((s) => s.category === "language"),
    domain: skills.filter((s) => s.category === "domain"),
  }

  const averageLevel = skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length
  const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsements, 0)
  const verifiedSkills = skills.filter((skill) => skill.verified).length

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name!,
      category: newSkill.category as Skill["category"],
      level: newSkill.level || 1,
      endorsements: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      description: newSkill.description!,
      projects: newSkill.projects || [],
      certifications: newSkill.certifications || [],
      verified: false,
    }

    setSkills([...skills, skill])
    setNewSkill({
      category: "technical",
      level: 1,
      endorsements: 0,
      projects: [],
      certifications: [],
      verified: false,
    })
    setIsAddDialogOpen(false)
    toast({
      title: "Success",
      description: "Skill added successfully!",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Skills Portfolio</h1>
          <p className="text-gray-600 mt-1">Track and showcase your technical and soft skills</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="skillName">Skill Name *</Label>
                  <Input
                    id="skillName"
                    value={newSkill.name || ""}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="e.g., React, Leadership, Spanish"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newSkill.category}
                    onValueChange={(value) => setNewSkill({ ...newSkill, category: value as Skill["category"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="soft">Soft Skills</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="domain">Domain Knowledge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="level">Proficiency Level: {levelLabels[(newSkill.level || 1) - 1]}</Label>
                <div className="mt-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={newSkill.level || 1}
                    onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newSkill.description || ""}
                  onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  placeholder="Describe your experience and proficiency with this skill"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSkill}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Add Skill
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Skills</p>
                <p className="text-2xl font-bold text-gray-900">{skills.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Level</p>
                <p className="text-2xl font-bold text-gray-900">{averageLevel.toFixed(1)}/5</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Endorsements</p>
                <p className="text-2xl font-bold text-gray-900">{totalEndorsements}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Skills</p>
                <p className="text-2xl font-bold text-gray-900">{verifiedSkills}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-5">
            <TabsTrigger value="all">All Skills</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="soft">Soft Skills</TabsTrigger>
            <TabsTrigger value="language">Languages</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4">
            {filteredSkills.map((skill) => {
              const CategoryIcon = categoryIcons[skill.category]
              return (
                <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CategoryIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg text-gray-900">{skill.name}</h3>
                            {skill.verified && (
                              <Badge className="bg-green-100 text-green-800 border-green-200">
                                <Award className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{skill.description}</p>
                        </div>
                      </div>
                      <Badge className={`${categoryColors[skill.category]} border`}>
                        {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Proficiency: {levelLabels[skill.level - 1]}
                          </span>
                          <span className="text-sm text-gray-500">{skill.level}/5</span>
                        </div>
                        <Progress value={skill.level * 20} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            {skill.endorsements} endorsements
                          </span>
                          <span>Updated: {new Date(skill.lastUpdated).toLocaleDateString()}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid gap-4">
              {categorySkills.map((skill) => {
                const CategoryIcon = categoryIcons[skill.category]
                return (
                  <Card key={skill.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <CategoryIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg text-gray-900">{skill.name}</h3>
                              {skill.verified && (
                                <Badge className="bg-green-100 text-green-800 border-green-200">
                                  <Award className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{skill.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Proficiency: {levelLabels[skill.level - 1]}
                            </span>
                            <span className="text-sm text-gray-500">{skill.level}/5</span>
                          </div>
                          <Progress value={skill.level * 20} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              {skill.endorsements} endorsements
                            </span>
                            <span>Updated: {new Date(skill.lastUpdated).toLocaleDateString()}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredSkills.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Target className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Try adjusting your search" : "Start by adding your first skill"}
            </p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
