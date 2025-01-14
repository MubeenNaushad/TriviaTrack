import { Button } from '@/components/ui/button'
import { ArrowLeft, IdCardIcon } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Sidebar from '@/homecomponents/Dashboard/Sidebar';
import LectureTab from './LectureTab';

const EditLecture = () => {
    const params = useParams();

    const courseId = params.courseId;
    
  return (
    <div className='flex pt-[2.4rem]'>
    <Sidebar/>
    <div className='p-8 items-center justify-between mb-5'>
        <div className='flex items-center gap-2'>
            <Link to={`/list-course/${courseId}/lecture`}>
            <Button size='icon' variant='outline' className='rounded-full'>
                <ArrowLeft size={16} />
            </Button>
            </Link>
            <h1 className='font-bold text-xl'>Update your lecture</h1>
            </div>
            <LectureTab />
    </div>
    </div>
  )
}

export default EditLecture