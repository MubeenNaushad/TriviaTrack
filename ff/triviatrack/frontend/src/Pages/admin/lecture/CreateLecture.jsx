import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Sidebar from '@/homecomponents/Dashboard/Sidebar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Lecture from './Lecture'

const CreateLecture = () => {
    const [lectureTitle, setlectureTitle] = useState("");
    const isLoading = false;
    const navigate = useNavigate();
    const params = useParams();

    const [currentLectures, setCurrentLectures] = useState([]);
    const courseId = params.courseId;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_APP_BASEURL}/course/${courseId}/lecture`, {
            lectureTitle,
            courseId
        }).then((response) => console.log("Donecourse updated"))
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_BASEURL}/course/${courseId}/lecture`, courseId)
        .then((response) => {
            setCurrentLectures(response.data.lectures);
        })
        .catch((error) => console.log(error));
    });
    
  return (
    <div className="flex pt-[2.4rem]">
    <Sidebar/>
    
<div className="flex-1 mx-10 mt-10">
  <div className="mb-4">
    <h1 className="font-bold text-xl">
      Lets add lectures, add lecture details for your new lecture 
    </h1>
    <p className="text-sm">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
      laborum!
    </p>
  </div>
  
  <div className="space-y-4">
    <div>
      <Label>Title</Label>
      <Input
        type="text"
        value={lectureTitle}
        onChange={(e) => setlectureTitle(e.target.value)}
        placeholder="Your Title Name"
      />
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => navigate(`/list-course/${courseId}`)}>
        Back to course
      </Button>
      <Button onClick={handleSubmit}>Create</Button>
    </div>
    <div className='mt-10'>
        { currentLectures.length === 0 ? <p>No lectures found</p> : currentLectures.map((lecture, index) => (
            <Lecture key={lecture._id} lecture={lecture} index={index} courseId={courseId} />
        ) )
        }
    </div>
  </div>
</div>
</div>  )
}

export default CreateLecture