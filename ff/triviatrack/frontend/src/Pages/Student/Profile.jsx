import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Course from "./Course";
import { Input } from "@/components/ui/input";

const Profile = () => {
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const enrolledIn = [];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/students/profile', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data.user);
        } else {
          setError(data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-24 px-4">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:wd-32 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Trivia Track
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Trivia@Track.com
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Teacher
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label>Name</Label>
                        <Input type="text" placeholder="Name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label>Profile Photo</Label>
                        <Input type="file" accept="image/*" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button>
                        {
                            isLoading ? (
                                <>
                                <Loader2 classNamemr-2 h-4 w-4 animate-spin></Loader2>
                                </>
                            ) : "Save Changes"
                        }
                    </Button>
                    <Button className="mr-2">Save</Button>
                    <Button variant="secondary">Cancel</Button>
                </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
            {
                enrolledIn.length === 0 ? <h1>You haven't enrolled in any course.</h1> : (
                    enrolledIn.map((course, index) => <Course key={index}/>) 
                )
            }
        </div>
      </div>
    </div>
  );
};

export default Profile;
