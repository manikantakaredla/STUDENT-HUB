"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Search, Filter, Crown, Code, Download, Eye } from "lucide-react"

// Mock leaderboard data (same as student page)
const mockStudents = [
  {
    id: "ST2024001",
    name: "Alexandra Chen",
    department: "Computer Science",
    semester: "6th",
    cgpa: 9.2,
    totalCredits: 42,
    internships: 2,
    projects: 8,
    achievements: 5,
    certificates: 6,
    codingScore: 2450,
    leetcodeProblems: 180,
    geeksforgeeksScore: 1200,
    githubRepos: 15,
    avatar: "/placeholder.svg?key=alex",
    rank: 1,
    previousRank: 2,
  },
  {
    id: "ST2024002",
    name: "John Smith",
    department: "Computer Science",
    semester: "4th",
    cgpa: 8.7,
    totalCredits: 28,
    internships: 1,
    projects: 6,
    achievements: 3,
    certificates: 4,
    codingScore: 2200,
    leetcodeProblems: 150,
    geeksforgeeksScore: 980,
    githubRepos: 12,
    avatar: "/placeholder.svg?key=john",
    rank: 2,
    previousRank: 1,
  },
  {
    id: "ST2024003",
    name: "Sarah Johnson",
    department: "Information Technology",
    semester: "6th",
    cgpa: 8.9,
    totalCredits: 35,
    internships: 1,
    projects: 7,
    achievements: 4,
    certificates: 5,
    codingScore: 2100,
    leetcodeProblems: 140,
    geeksforgeeksScore: 1100,
    githubRepos: 10,
    avatar: "/placeholder.svg?key=sarah",
    rank: 3,
    previousRank: 3,
  },
  {
    id: "ST2024004",
    name: "Mike Wilson",
    department: "Computer Science",
    semester: "4th",
    cgpa: 8.5,
    totalCredits: 30,
    internships: 1,
    projects: 5,
    achievements: 2,
    certificates: 3,
    codingScore: 1950,
    leetcodeProblems: 120,
    geeksforgeeksScore: 850,
    githubRepos: 8,
    avatar: "/placeholder.svg?key=mike",
    rank: 4,
    previousRank: 5,
  },
  {
    id: "ST2024005",
    name: "Emily Davis",
    department: "Electronics",
    semester: "6th",
    cgpa: 8.8,
    totalCredits: 32,
    internships: 1,
    projects: 6,
    achievements: 3,
    certificates: 4,
    codingScore: 1800,
    leetcodeProblems: 100,
    geeksforgeeksScore: 750,
    githubRepos: 9,
    avatar: "/placeholder.svg?key=emily",
    rank: 5,
    previousRank: 4,
  },
  {
    id: "ST2024006",
    name: "David Brown",
    department: "Mechanical",
    semester: "4th",
    cgpa: 8.3,
    totalCredits: 25,
    internships: 0,
    projects: 4,
    achievements: 2,
    certificates: 2,
    codingScore: 1600,
    leetcodeProblems: 80,
    geeksforgeeksScore: 600,
    githubRepos: 6,
    avatar: "/placeholder.svg?key=david",
    rank: 6,
    previousRank: 6,
  },
  {
    id: "ST2024007",
    name: "Lisa Anderson",
    department: "Civil",
    semester: "6th",
    cgpa: 8.6,
    totalCredits: 28,
    internships: 1,
    projects: 5,
    achievements: 2,
    certificates: 3,
    codingScore: 1500,
    leetcodeProblems: 70,
    geeksforgeeksScore: 550,
    githubRepos: 7,
    avatar: "/placeholder.svg?key=lisa",
    rank: 7,
    previousRank: 7,
  },
  {
    id: "ST2024008",
    name: "Robert Taylor",
    department: "Information Technology",
    semester: "4th",
    cgpa: 8.1,
    totalCredits: 22,
    internships: 0,
    projects: 3,
    achievements: 1,
    certificates: 2,
    codingScore: 1400,
    leetcodeProblems: 60,
    geeksforgeeksScore: 480,
    githubRepos: 5,
    avatar: "/placeholder.svg?key=robert",
    rank: 8,
    previousRank: 8,
  },
]

export default function FacultyLeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [sortBy, setSortBy] = useState("cgpa")
  const [sortedStudents, setSortedStudents] = useState(mockStudents)

  const handleSort = (column: string) => {
    const sorted = [...mockStudents].sort((a, b) => {
      switch (column) {
        case "cgpa":
          return b.cgpa - a.cgpa
        case "credits":
          return b.totalCredits - a.totalCredits
        case "internships":
          return b.internships - a.internships
        case "projects":
          return b.projects - a.projects
        case "achievements":
          return b.achievements - a.achievements
        case "certificates":
          return b.certificates - a.certificates
        case "codingScore":
          return b.codingScore - a.codingScore
        default:
          return 0
      }
    })
    setSortedStudents(sorted)
    setSortBy(column)
  }

  const filteredStudents = sortedStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />
    } else if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    }
    return <span className="text-gray-400">-</span>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Leaderboard</h1>
          <p className="text-gray-600">Monitor student performance and rankings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Rankings
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Top 3 Students */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {filteredStudents.slice(0, 3).map((student, index) => (
            <Card
              key={student.id}
              className={`hover:shadow-xl transition-all duration-300 ${
                index === 0
                  ? "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50"
                  : index === 1
                    ? "ring-2 ring-gray-400 bg-gradient-to-br from-gray-50 to-slate-50"
                    : "ring-2 ring-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{getRankIcon(student.rank)}</div>
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{student.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{student.department}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CGPA:</span>
                    <span className="font-bold text-blue-600">{student.cgpa}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Credits:</span>
                    <span className="font-bold text-purple-600">{student.totalCredits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Coding Score:</span>
                    <span className="font-bold text-green-600">{student.codingScore}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="academic">Academic Rankings</TabsTrigger>
          <TabsTrigger value="coding">Coding Rankings</TabsTrigger>
        </TabsList>

        {/* Academic Leaderboard */}
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <span>Academic Performance Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
              </div>

              {/* Sortable Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Student</th>
                      <th
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("cgpa")}
                      >
                        CGPA {sortBy === "cgpa" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                      </th>
                      <th
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("credits")}
                      >
                        Credits {sortBy === "credits" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                      </th>
                      <th
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("internships")}
                      >
                        Internships {sortBy === "internships" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                      </th>
                      <th
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("projects")}
                      >
                        Projects {sortBy === "projects" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                      </th>
                      <th
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("achievements")}
                      >
                        Achievements {sortBy === "achievements" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                      </th>
                      <th
                        className="text-left py-3 px-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleSort("certificates")}
                      >
                        Certificates {sortBy === "certificates" && <TrendingUp className="inline h-4 w-4 ml-1" />}
                      </th>
                      <th className="text-left py-3 px-4">Change</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">{getRankIcon(student.rank)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-blue-600">{student.cgpa}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-purple-600">{student.totalCredits}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-green-600">{student.internships}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-orange-600">{student.projects}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-yellow-600">{student.achievements}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-pink-600">{student.certificates}</span>
                        </td>
                        <td className="py-4 px-4">{getRankChange(student.rank, student.previousRank)}</td>
                        <td className="py-4 px-4">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Profile
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coding Leaderboard */}
        <TabsContent value="coding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-blue-600" />
                <span>Coding Performance Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredStudents.slice(0, 5).map((student, index) => (
                  <Card key={student.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">{getRankIcon(student.rank)}</div>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{student.codingScore}</div>
                          <div className="text-sm text-gray-500">Total Score</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-lg font-bold text-orange-600">{student.leetcodeProblems}</div>
                          <div className="text-xs text-orange-600">LeetCode Problems</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{student.geeksforgeeksScore}</div>
                          <div className="text-xs text-green-600">GeeksforGeeks</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-600">{student.githubRepos}</div>
                          <div className="text-xs text-gray-600">GitHub Repos</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{student.codingScore}</div>
                          <div className="text-xs text-blue-600">Overall Score</div>
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
  )
}
