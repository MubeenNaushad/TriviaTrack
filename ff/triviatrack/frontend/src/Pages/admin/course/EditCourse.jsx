import { Button } from '@/components/ui/button'
import Sidebar from '@/homecomponents/Dashboard/Sidebar'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CourseTab from './CourseTab';
import { Link } from "react-router-dom";


export const EditCourse = () => {
  return (
   
    <div className='flex pt-[2.4rem]'>
        <Sidebar/>
 
    <div className="flex-1 p-5">
    <div className="flex items-center justify-between mb-5">
      <h1 className="font-bold text-xl">
        Add detail information regarding course
      </h1>

      <Link to="lecture">
        <Button className="hover:text-blue-600" variant="outline">Go to lectures page</Button>
        </Link>
     
    </div>
   
    <CourseTab/>
  </div>
  </div>
  )
}
