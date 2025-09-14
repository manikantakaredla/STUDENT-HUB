"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Bell,
  Shield,
  Palette,
  Download,
  Upload,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  Moon,
  Sun,
  Monitor,
  Code,
  Github,
  Linkedin,
  Globe,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    activities: true,
    grades: true,
    deadlines: true,
    achievements: true,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showProgress: true,
    allowMessages: true,
  })
  const [profile, setProfile] = useState({
    firstName: "Alexandra",
    lastName: "Chen",
    email: "alexandra.chen@student.aditya.ac.in",
    phone: "+91 9876543210",
    studentId: "ST2024001",
    department: "Computer Science",
    semester: "6th",
    bio: "Passionate computer science student with interests in AI and web development.",
    linkedin: "https://linkedin.com/in/alexandrachen",
    github: "https://github.com/alexandrachen",
    portfolio: "https://alexandrachen.dev",
    leetcode: "alexandrachen",
    geeksforgeeks: "alexandrachen",
    codechef: "alexandrachen",
  })
  const router = useRouter()

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profile)
  }

  const handlePasswordChange = () => {
    console.log("Password change requested")
  }

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyUpdate = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleExportData = () => {
    console.log("Exporting user data...")
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
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="coding">Coding Profiles</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="text-lg">AC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" value={profile.studentId} disabled className="bg-gray-50" />
                    <p className="text-xs text-gray-500">This field cannot be modified</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={profile.department} disabled className="bg-gray-50" />
                    <p className="text-xs text-gray-500">This field cannot be modified</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="flex items-center space-x-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        <span>LinkedIn</span>
                      </Label>
                      <Input
                        id="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        value={profile.linkedin}
                        onChange={(e) => setProfile((prev) => ({ ...prev, linkedin: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github" className="flex items-center space-x-2">
                        <Github className="h-4 w-4 text-gray-800" />
                        <span>GitHub</span>
                      </Label>
                      <Input
                        id="github"
                        placeholder="https://github.com/username"
                        value={profile.github}
                        onChange={(e) => setProfile((prev) => ({ ...prev, github: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio" className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-purple-600" />
                        <span>Portfolio</span>
                      </Label>
                      <Input
                        id="portfolio"
                        placeholder="https://yourportfolio.com"
                        value={profile.portfolio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, portfolio: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-red-600" />
                  <span>Change Password</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                </div>
                <Button onClick={handlePasswordChange}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Coding Profiles Tab */}
          <TabsContent value="coding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-green-600" />
                  <span>Coding Platform Profiles</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="leetcode" className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-orange-500 rounded"></div>
                      <span>LeetCode Username</span>
                    </Label>
                    <Input
                      id="leetcode"
                      placeholder="Enter LeetCode username"
                      value={profile.leetcode}
                      onChange={(e) => setProfile((prev) => ({ ...prev, leetcode: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="geeksforgeeks" className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                      <span>GeeksforGeeks Username</span>
                    </Label>
                    <Input
                      id="geeksforgeeks"
                      placeholder="Enter GeeksforGeeks username"
                      value={profile.geeksforgeeks}
                      onChange={(e) => setProfile((prev) => ({ ...prev, geeksforgeeks: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codechef" className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-purple-600 rounded"></div>
                      <span>CodeChef Username</span>
                    </Label>
                    <Input
                      id="codechef"
                      placeholder="Enter CodeChef username"
                      value={profile.codechef}
                      onChange={(e) => setProfile((prev) => ({ ...prev, codechef: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These usernames will be used to track your coding progress and display
                    achievements on your profile and leaderboard.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleProfileUpdate}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Coding Profiles
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-yellow-600" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Channels</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive notifications via email</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => handleNotificationUpdate("email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => handleNotificationUpdate("push", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => handleNotificationUpdate("sms", checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Activity Updates</p>
                        <p className="text-sm text-gray-600">New activities, approvals, and rejections</p>
                      </div>
                      <Switch
                        checked={notifications.activities}
                        onCheckedChange={(checked) => handleNotificationUpdate("activities", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Grade Updates</p>
                        <p className="text-sm text-gray-600">New grades and academic results</p>
                      </div>
                      <Switch
                        checked={notifications.grades}
                        onCheckedChange={(checked) => handleNotificationUpdate("grades", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Deadline Reminders</p>
                        <p className="text-sm text-gray-600">Assignment and activity deadlines</p>
                      </div>
                      <Switch
                        checked={notifications.deadlines}
                        onCheckedChange={(checked) => handleNotificationUpdate("deadlines", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Achievement Notifications</p>
                        <p className="text-sm text-gray-600">New achievements and milestones</p>
                      </div>
                      <Switch
                        checked={notifications.achievements}
                        onCheckedChange={(checked) => handleNotificationUpdate("achievements", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Profile Visibility</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-sm text-gray-600">Make your profile visible to other students</p>
                      </div>
                      <Switch
                        checked={privacy.profileVisible}
                        onCheckedChange={(checked) => handlePrivacyUpdate("profileVisible", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Email</p>
                        <p className="text-sm text-gray-600">Display your email address on your profile</p>
                      </div>
                      <Switch
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => handlePrivacyUpdate("showEmail", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Phone Number</p>
                        <p className="text-sm text-gray-600">Display your phone number on your profile</p>
                      </div>
                      <Switch
                        checked={privacy.showPhone}
                        onCheckedChange={(checked) => handlePrivacyUpdate("showPhone", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Progress</p>
                        <p className="text-sm text-gray-600">Display your academic progress publicly</p>
                      </div>
                      <Switch
                        checked={privacy.showProgress}
                        onCheckedChange={(checked) => handlePrivacyUpdate("showProgress", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Messages</p>
                        <p className="text-sm text-gray-600">Allow other students to send you messages</p>
                      </div>
                      <Switch
                        checked={privacy.allowMessages}
                        onCheckedChange={(checked) => handlePrivacyUpdate("allowMessages", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      className={`cursor-pointer transition-all ${theme === "light" ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                      onClick={() => setTheme("light")}
                    >
                      <CardContent className="p-4 text-center">
                        <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <p className="font-medium">Light</p>
                        <p className="text-sm text-gray-600">Clean and bright interface</p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-all ${theme === "dark" ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                      onClick={() => setTheme("dark")}
                    >
                      <CardContent className="p-4 text-center">
                        <Moon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <p className="font-medium">Dark</p>
                        <p className="text-sm text-gray-600">Easy on the eyes</p>
                      </CardContent>
                    </Card>
                    <Card
                      className={`cursor-pointer transition-all ${theme === "system" ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                      onClick={() => setTheme("system")}
                    >
                      <CardContent className="p-4 text-center">
                        <Monitor className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                        <p className="font-medium">System</p>
                        <p className="text-sm text-gray-600">Follow system preference</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Data Export */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Export Your Data</p>
                      <p className="text-sm text-gray-600">Download a copy of all your data</p>
                    </div>
                    <Button variant="outline" onClick={handleExportData}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
