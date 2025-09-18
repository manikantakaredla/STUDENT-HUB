"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Users, Building2, Eye, EyeOff, BookOpen, Award, TrendingUp, LogIn, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    studentId: "",
    department: "",
    userType: "student",
  })
  const [selectedUserType, setSelectedUserType] = useState("")
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - in real app, validate credentials
    if (loginData.email && loginData.password && selectedUserType) {
      localStorage.setItem("userType", selectedUserType)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...loginData,
          userType: selectedUserType,
          name:
            selectedUserType === "student"
              ? "Alexandra Chen"
              : selectedUserType === "faculty"
                ? "Dr. Smith"
                : "Admin User",
        }),
      )

      switch (selectedUserType) {
        case "student":
          router.push("/student/dashboard")
          break
        case "faculty":
          router.push("/faculty/dashboard")
          break
        case "institutional":
          router.push("/institutional/dashboard")
          break
      }
      setIsLoginOpen(false)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.name && registerData.email && registerData.password) {
      localStorage.setItem("userType", registerData.userType)
      localStorage.setItem("userData", JSON.stringify(registerData))

      switch (registerData.userType) {
        case "student":
          router.push("/student/dashboard")
          break
        case "faculty":
          router.push("/faculty/dashboard")
          break
        case "institutional":
          router.push("/institutional/dashboard")
          break
      }
      setIsLoginOpen(false)
    }
  }

  const openLoginDialog = (userType: string) => {
    setSelectedUserType(userType)
    setIsLoginOpen(true)
  }

  const stats = [
    { label: "Active Students", value: "2,450", icon: BookOpen, change: "+12%" },
    { label: "Activities Verified", value: "15,230", icon: Award, change: "+8%" },
    { label: "Departments", value: "12", icon: Users, change: "+2%" },
    { label: "Growth Rate", value: "96%", icon: TrendingUp, change: "+5%" }
  ];

  const loginOptions = [
    {
      id: "student",
      title: "Student Portal",
      subtitle: "Access your academic journey",
      description: "View your portfolio, track activities, and showcase achievements",
      icon: GraduationCap,
      route: "/student-dashboard",
      gradient: "from-blue-500 to-blue-400",
      features: ["Digital Portfolio", "Activity Tracking", "Skills Analytics"]
    },
    {
      id: "faculty",
      title: "Faculty & Admin",
      subtitle: "Manage and approve activities",
      description: "Review submissions, manage students, and streamline approvals",
      icon: Users,
      route: "/faculty-dashboard",
      gradient: "from-green-500 to-green-400",
      features: ["Approval Panel", "Student Management", "Bulk Actions"]
    },
    {
      id: "institutional",
      title: "Institutional Management",
      subtitle: "Analytics and reporting",
      description: "Generate reports, view insights, and track institutional progress",
      icon: BarChart3,
      route: "/institutional-dashboard",
      gradient: "from-purple-500 to-purple-400",
      features: ["Advanced Analytics", "Custom Reports", "NAAC/NIRF Reports"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header - Keeping your original navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://erp.adityauniversity.in/getCustomerLogo.json"
                alt="Aditya University"
                className="h-10 w-10 rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/generic-university-logo.png"
                }}
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Aditya University</h1>
                <p className="text-sm text-gray-600">Campus360</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Academic Excellence</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>NAAC Accredited</span>
                </span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>NIRF Ranked</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Transformed to match first UI */}
      <div className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Campus360
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Campus360</span>
              <br />
      
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Empowering students, simplifying faculty tasks, and modernizing institutional operations 
              with a comprehensive digital portfolio and activity management system.
            </p>
          </div>

          {/* Stats Section */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 animate-slide-up">
            {stats.map((stat, index) => (
              <Card key={index} className="card-stat text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-success font-medium">{stat.change}</div>
              </Card>
            ))}
          </div>

          {/* Login Options */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Portal</h2>
            <p className="text-muted-foreground">Select your role to access the appropriate dashboard</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-scale-in">
            {loginOptions.map((option) => (
              <Card
                key={option.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 ${
                  hoveredCard === option.id ? 'border-primary shadow-hero' : 'border-border/50'
                }`}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-5`}></div>
                
                <div className="relative p-8 space-y-6">
                  <div className="text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${option.gradient} mb-4 transform transition-transform duration-300 ${
                      hoveredCard === option.id ? 'rotate-12 scale-110' : ''
                    }`}>
                      <option.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-2">{option.title}</h3>
                    <p className="text-primary font-medium mb-3">{option.subtitle}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{option.description}</p>
                  </div>

                  <div className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => openLoginDialog(option.id)}
                    className={`w-full bg-gradient-to-r ${option.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
                  >
                    Access {option.title}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Login Dialog Modal */}
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  {selectedUserType === "student" && "Student Portal Login"}
                  {selectedUserType === "faculty" && "Faculty Portal Login"}
                  {selectedUserType === "institutional" && "Admin Portal Login"}
                </DialogTitle>
                <DialogDescription className="text-center">
                  Sign in to access your {selectedUserType} dashboard
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Student/Employee ID</Label>
                      <Input
                        id="student-id"
                        placeholder="Enter your ID"
                        value={registerData.studentId}
                        onChange={(e) => setRegisterData({ ...registerData, studentId: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border/50">
            <p className="text-muted-foreground text-sm">
              © 2025 Campus360. Empowering educational excellence through digital innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}