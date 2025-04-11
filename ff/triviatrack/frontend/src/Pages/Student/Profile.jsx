"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Pencil, Award, BookOpen, User } from "lucide-react"
import Course from "../admin/course/Course"

const Profile = () => {
  const [profile, setProfile] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [name, setName] = useState("")
  const [profilePhoto, setProfilePhoto] = useState()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [maxPoints, setMaxPoints] = useState(100)
  const [rankPic, setRankPic] = useState("")
  const [points, setPoints] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    fetchProfile()
    fetchEnrolledCourses()
  }, [])

  const fetchProfile = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setProfile(response.data.user)
          setPoints(response.data.user.points)
          setName(response.data.user.name || "")
        } else {
          setError("Error fetching profile")
        }
        setIsLoading(false)
      })
      .catch(() => {
        setError("Error fetching profile")
        setIsLoading(false)
      })
  }

  const fetchEnrolledCourses = () => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/get-my-learning`)
      .then((response) => {
        setEnrolledCourses(response.data.enrolledCourses)
      })
      .catch((error) => {
        console.log("Failed to fetch courses", error)
      })
  }

  useEffect(() => {
    const getRankLogo = (points) => {
      if (points < 100) {
        setMaxPoints(100)
        setRankPic(
          "https://cdn3d.iconscout.com/3d/premium/thumb/bronze-rank-3d-icon-download-in-png-blend-fbx-gltf-file-formats--medal-position-identification-badge-game-equipment-star-adventure-pack-sports-games-icons-8955734.png?f=webp",
        )
      } else if (points >= 100 && points < 200) {
        setMaxPoints(200)
        setRankPic(
          "https://cdn3d.iconscout.com/3d/premium/thumb/silver-rank-3d-icon-download-in-png-blend-fbx-gltf-file-formats--position-medal-identification-badge-game-equipment-star-adventure-pack-sports-games-icons-8955733.png",
        )
      } else if (points >= 200 && points < 300) {
        setMaxPoints(300)
        setRankPic(
          "https://cdn3d.iconscout.com/3d/premium/thumb/gold-rank-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bronze-medal-position-identification-badge-adventure-game-pack-sports-games-icons-8955735.png?f=webp",
        )
      } else if (points >= 300) {
        setMaxPoints(400)
        setRankPic(
          "https://cdn3d.iconscout.com/3d/premium/thumb/rank-diamond-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bronze-medal-award-winner-pack-sign-symbols-icons-9325599.png?f=webp",
        )
      }
    }

    if (profile && profile.points) {
      setPercentage((profile.points / maxPoints) * 100)
      getRankLogo(profile.points)
    }
  }, [profile, maxPoints])

  const handleUpdateProfile = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Name cannot be empty.")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    if (profilePhoto) {
      formData.append("photoUrl", profilePhoto)
    }

    axios
      .patch(`${import.meta.env.VITE_APP_BASEURL}/students/update/${profile._id}`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setProfile(response.data.user)
          console.log("Profile updated successfully")
        } else {
          setError("Failed to update profile")
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setError("An error occurred during profile update")
        console.error("Error updating profile:", error)
        setIsLoading(false)
      })
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0])
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    )
  }

  const getRankName = () => {
    if (points < 100) return "Bronze"
    if (points < 200) return "Silver"
    if (points < 300) return "Gold"
    return "Diamond"
  }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8 mt-32">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">My Profile</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>My Courses</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Personal Information</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Pencil size={14} />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your name"
                            onChange={handleChange}
                            className="col-span-3"
                            value={name}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="photo">Profile Photo</Label>
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="col-span-3"
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleUpdateProfile} disabled={isLoading}>
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          ) : null}
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Avatar className="h-32 w-32 border-2 border-gray-200">
                    <AvatarImage
                      src={profile?.photoUrl || "https://github.com/shadcn.png"}
                      alt={profile?.name || "User"}
                    />
                    <AvatarFallback>{profile?.name?.substring(0, 2).toUpperCase() || "UN"}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                        <p className="text-lg font-medium">{profile?.name || "Not set"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                        <p className="text-lg font-medium">{profile?.email || "Not set"}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</h3>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {profile?.userType || "Student"}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h3>
                        <p className="text-lg font-medium">
                          {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "Not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rank Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={18} />
                  Rank & Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="mb-4 text-center">
                  <img
                    src={rankPic || "/placeholder.svg"}
                    alt={`${getRankName()} Rank`}
                    className="w-28 h-28 mx-auto mb-2"
                  />
                  <h3 className="text-xl font-bold">{getRankName()} Rank</h3>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{profile.points || 0} points</span>
                    <span>{maxPoints} points</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-sm text-center text-gray-500 mt-2">
                    {maxPoints - (profile.points || 0)} points until next rank
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Learning Statistics Card */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Learning Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-3xl font-bold">{enrolledCourses?.length || 0}</h3>
                    <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-3xl font-bold">{profile?.completedCourses || 0}</h3>
                    <p className="text-sm text-muted-foreground">Completed Courses</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-3xl font-bold">{profile?.points || 0}</h3>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="text-3xl font-bold">{profile?.certificatesEarned || 0}</h3>
                    <p className="text-sm text-muted-foreground">Certificates Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 gap-6">
            {/* My Courses Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>My Enrolled Courses</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {enrolledCourses && enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((course, index) => (
                      <Course key={index} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No courses yet</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't enrolled in any courses yet.</p>
                    <div className="mt-6">
                      <Button>Browse Courses</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <BookOpen size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">You completed Module 2 in "JavaScript Fundamentals"</p>
                        <p className="text-sm text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Award size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">You earned 25 points for completing a quiz</p>
                        <p className="text-sm text-muted-foreground">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <BookOpen size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">You enrolled in "React for Beginners"</p>
                        <p className="text-sm text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended For You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Introduction to Web Development</h4>
                        <p className="text-sm text-muted-foreground">Based on your interests</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Advanced JavaScript Concepts</h4>
                        <p className="text-sm text-muted-foreground">Popular in your field</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">React for Beginners</h4>
                        <p className="text-sm text-muted-foreground">Trending course</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Remove the duplicate Recent Activity card that was at the bottom */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
