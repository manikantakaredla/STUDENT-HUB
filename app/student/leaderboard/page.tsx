"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Search, Filter, ArrowLeft, Crown, Code } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock leaderboard data
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

const codingLeaderboard = [
  {
    id: "ST2024001",
    name: "Alexandra Chen",
    department: "Computer Science",
    totalScore: 2450,
    leetcodeProblems: 180,
    leetcodeRating: 1850,
    geeksforgeeksScore: 1200,
    codechefRating: 1650,
    githubRepos: 15,
    githubStars: 45,
    avatar: "/placeholder.svg?key=alex",
    rank: 1,
  },
  {
    id: "ST2024002",
    name: "John Smith",
    department: "Computer Science",
    totalScore: 2200,
    leetcodeProblems: 150,
    leetcodeRating: 1720,
    geeksforgeeksScore: 980,
    codechefRating: 1580,
    githubRepos: 12,
    githubStars: 32,
    avatar: "/placeholder.svg?key=john",
    rank: 2,
  },
  {
    id: "ST2024003",
    name: "Sarah Johnson",
    department: "Information Technology",
    totalScore: 2100,
    leetcodeProblems: 140,
    leetcodeRating: 1680,
    geeksforgeeksScore: 1100,
    codechefRating: 1520,
    githubRepos: 10,
    githubStars: 28,
    avatar: "/placeholder.svg?key=sarah",
    rank: 3,
  },
]

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [sortBy, setSortBy] = useState("cgpa")
  const [sortedStudents, setSortedStudents] = useState(mockStudents)
  const router = useRouter()

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
                <h1 className="text-xl font-bold text-gray-900">Student Leaderboard</h1>
                <p className="text-sm text-gray-600">Academic performance rankings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Top 3 Students */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredStudents.slice(0, 3).map((student, index) => (
              <Card
                key={student.id}
                className={`hover:shadow-lg transition-all duration-300 ${
                  index === 0
                    ? "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50"
                    : index === 1
                      ? "ring-2 ring-gray-400 bg-gradient-to-br from-gray-50 to-slate-50"
                      : "ring-2 ring-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50"
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">{getRankIcon(student.rank)}</div>
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{student.name}</h3>
                  <p className="text-xs text-gray-600 mb-3">{student.department}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/50 rounded p-2">
                      <div className="font-bold text-blue-600">{student.cgpa}</div>
                      <div className="text-gray-600">CGPA</div>
                    </div>
                    <div className="bg-white/50 rounded p-2">
                      <div className="font-bold text-purple-600">{student.totalCredits}</div>
                      <div className="text-gray-600">Credits</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="academic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="academic">Academic Leaderboard</TabsTrigger>
            <TabsTrigger value="coding">Coding Leaderboard</TabsTrigger>
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
                <div className="space-y-4">
                  {codingLeaderboard.map((student, index) => (
                    <Card key={student.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">{getRankIcon(student.rank)}</div>
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
                              <h3 className="text-base font-semibold text-gray-900">{student.name}</h3>
                              <p className="text-xs text-gray-600">{student.department}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">{student.totalScore}</div>
                            <div className="text-xs text-gray-500">Total Score</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          <div className="text-center p-2 bg-orange-50 rounded">
                            <div className="text-sm font-bold text-orange-600">{student.leetcodeProblems}</div>
                            <div className="text-xs text-orange-600">LeetCode</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="text-sm font-bold text-green-600">{student.geeksforgeeksScore}</div>
                            <div className="text-xs text-green-600">GFG</div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="text-sm font-bold text-purple-600">{student.codechefRating}</div>
                            <div className="text-xs text-purple-600">CodeChef</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded">
                            <div className="text-sm font-bold text-gray-600">{student.githubRepos}</div>
                            <div className="text-xs text-gray-600">GitHub</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="text-sm font-bold text-blue-600">{student.totalScore}</div>
                            <div className="text-xs text-blue-600">Overall</div>
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
    </div>
  )
}
