"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Globe, Save, Shield, Bell, Users } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    instituteName: "Aditya University",
    email: "admin@aditya.edu",
    phone: "+91 8861-123456",
    address: "Aditya Nagar, Surampalem, East Godavari District, Andhra Pradesh - 533437",
    website: "https://www.aditya.edu",
    description:
      "Aditya University is a leading educational institution committed to excellence in education, research, and innovation.",
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    maintenanceMode: false,
    publicRegistration: true,
    autoApproval: false,
  })

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Institution Settings</h1>
        <p className="text-gray-600 mt-1">Manage institutional configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
            <CardDescription>Update institutional basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instituteName">Institution Name</Label>
              <Input
                id="instituteName"
                value={settings.instituteName}
                onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription>Configure notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Alerts</Label>
                <p className="text-sm text-gray-600">Receive system maintenance alerts</p>
              </div>
              <Switch
                checked={settings.systemAlerts}
                onCheckedChange={(checked) => setSettings({ ...settings, systemAlerts: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>System Settings</span>
            </CardTitle>
            <CardDescription>Configure system-wide settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Enable maintenance mode for system updates</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Registration</Label>
                <p className="text-sm text-gray-600">Allow public user registration</p>
              </div>
              <Switch
                checked={settings.publicRegistration}
                onCheckedChange={(checked) => setSettings({ ...settings, publicRegistration: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Approval</Label>
                <p className="text-sm text-gray-600">Automatically approve new registrations</p>
              </div>
              <Switch
                checked={settings.autoApproval}
                onCheckedChange={(checked) => setSettings({ ...settings, autoApproval: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Access Control</span>
            </CardTitle>
            <CardDescription>Manage user access and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Manage User Roles
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Security Policies
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Globe className="h-4 w-4 mr-2" />
              API Access Control
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
