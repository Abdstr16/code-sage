"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Code, Trophy, User } from "lucide-react"

interface UserProfile {
  username: string
  fullname: string
  total_submissions: number
  solved_problems: number
  submission_history: Array<{
    id: number
    problem_id: string
    verdict: string
    submitted_at: string
  }>
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    fullname: "",
    email: "",
  })

  useEffect(() => {
    if (user.authenticated) {
      fetchProfile()
      setEditForm({
        fullname: user.fullname || "",
        email: user.email,
      })
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      if (user.email === "admin@gmail.com") {
        setProfile({
          username: "admin@gmail.com",
          fullname: "Administrator",
          total_submissions: 25,
          solved_problems: 18,
          submission_history: [
            { id: 1, problem_id: "1A", verdict: "Accepted", submitted_at: "2024-01-15T10:30:00Z" },
            { id: 2, problem_id: "2B", verdict: "Wrong Answer", submitted_at: "2024-01-14T15:45:00Z" },
            { id: 3, problem_id: "3C", verdict: "Accepted", submitted_at: "2024-01-13T09:20:00Z" },
          ],
        })
      } else {
        const data = await apiClient.getUserProfile(user.email)
        setProfile(data)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      if (user.email === "admin@gmail.com") {
        console.log("Profile updated:", editForm)
        setEditing(false)
        return
      }

      // TODO: Implement profile update API call
      console.log("Saving profile:", editForm)
      setEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  if (!user.authenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Please sign in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account information and view your coding progress</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile Information</CardTitle>
                <User className="h-4 w-4 text-muted-foreground ml-auto" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Full Name</Label>
                    <p className="font-medium">{profile?.fullname || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Email</Label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coding Stats</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground ml-auto" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Submissions</span>
                    <Badge variant="secondary">{profile?.total_submissions || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Solved Problems</span>
                    <Badge variant="default">{profile?.solved_problems || 0}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <Badge variant="outline">
                      {profile?.total_submissions
                        ? Math.round((profile.solved_problems / profile.total_submissions) * 100)
                        : 0}
                      %
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Recent Submissions
              </CardTitle>
              <CardDescription>Your latest problem submissions and results</CardDescription>
            </CardHeader>
            <CardContent>
              {profile?.submission_history && profile.submission_history.length > 0 ? (
                <div className="space-y-3">
                  {profile.submission_history.slice(0, 10).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Code className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium">Problem {submission.problem_id}</p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {new Date(submission.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={submission.verdict === "Accepted" ? "default" : "destructive"}>
                        {submission.verdict}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-8">No submissions yet. Start solving problems!</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  value={editForm.fullname}
                  onChange={(e) => setEditForm({ ...editForm, fullname: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setEditForm({
                      fullname: user.fullname || "",
                      email: user.email,
                    })
                  }
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
