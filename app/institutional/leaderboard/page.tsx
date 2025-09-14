"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users, Star } from "lucide-react"

const topPerformers = [
  {
    rank: 1,
    name: "Computer Science & Engineering",
    type: "Department",
    score: 95.8,
    metric: "Overall Performance",
    avatar: "/placeholder.svg?height=40&width=40",
    change: "+2.3",
  },
  {
    rank: 2,
    name: "Dr. Rajesh Kumar",
    type: "Faculty",
    score: 94.2,
    metric: "Teaching Excellence",
    avatar: "/placeholder.svg?height=40&width=40",
    change: "+1.8",
  },
  {
    rank: 3,
    name: "Arjun Patel",
    type: "Student",
    score: 9.4,
    metric: "CGPA",
    avatar: "/placeholder.svg?height=40&width=40",
    change: "+0.2",
  },
]

const departmentRankings = [
  { rank: 1, name: "Computer Science & Engineering", score: 95.8, students: 1200, faculty: 45 },
  { rank: 2, name: "Electronics & Communication", score: 92.4, students: 980, faculty: 38 },
  { rank: 3, name: "Mechanical Engineering", score: 89.7, students: 1100, faculty: 42 },
  { rank: 4, name: "Civil Engineering", score: 87.3, students: 850, faculty: 35 },
]

const facultyRankings = [
  { rank: 1, name: "Dr. Rajesh Kumar", department: "CSE", score: 94.2, publications: 25 },
  { rank: 2, name: "Dr. Priya Sharma", department: "ECE", score: 92.8, publications: 22 },
  { rank: 3, name: "Prof. Suresh Reddy", department: "MECH", score: 91.5, publications: 18 },
  { rank: 4, name: "Dr. Lakshmi Devi", department: "CIVIL", score: 90.1, publications: 20 },
]

const studentRankings = [
  { rank: 1, name: "Arjun Patel", rollNo: "20CSE001", cgpa: 9.4, department: "CSE" },
  { rank: 2, name: "Priya Reddy", rollNo: "21ECE045", cgpa: 9.2, department: "ECE" },
  { rank: 3, name: "Sneha Sharma", rollNo: "23CIVIL012", cgpa: 8.9, department: "CIVIL" },
  { rank: 4, name: "Rahul Kumar", rollNo: "22MECH078", cgpa: 8.7, department: "MECH" },
]

export default function LeaderboardPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Institutional Leaderboard</h1>
        <p className="text-gray-600 mt-1">Performance rankings across departments, faculty, and students</p>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topPerformers.map((performer) => (
          <Card key={performer.rank} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400 to-yellow-600 rounded-bl-full flex items-start justify-end p-2">
              <Trophy className="h-4 w-4 text-white" />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={performer.avatar || "/placeholder.svg"} alt={performer.name} />
                  <AvatarFallback>
                    {performer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{performer.name}</CardTitle>
                  <CardDescription>{performer.type}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-purple-600">{performer.score}</div>
                <p className="text-sm text-gray-600">{performer.metric}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {performer.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Department Rankings</CardTitle>
          <CardDescription>Performance ranking based on overall academic excellence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentRankings.map((dept) => (
              <div key={dept.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">{getRankIcon(dept.rank)}</div>
                  <div>
                    <h3 className="font-semibold">{dept.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {dept.students} students
                      </span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        {dept.faculty} faculty
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{dept.score}</div>
                  <p className="text-sm text-gray-600">Performance Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Faculty and Student Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Faculty</CardTitle>
            <CardDescription>Based on teaching excellence and research output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facultyRankings.map((faculty) => (
                <div key={faculty.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6">{getRankIcon(faculty.rank)}</div>
                    <div>
                      <h4 className="font-medium">{faculty.name}</h4>
                      <p className="text-sm text-gray-600">
                        {faculty.department} • {faculty.publications} publications
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{faculty.score}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Students</CardTitle>
            <CardDescription>Based on academic performance (CGPA)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {studentRankings.map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6">{getRankIcon(student.rank)}</div>
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-600">
                        {student.rollNo} • {student.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">{student.cgpa}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
