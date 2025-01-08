import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import React from 'react'

function Course() {
  return (
    <Card className="overflow-hidden rounded-lg big-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className='relative'>
            <img src='https://fireship.io/courses/react/img/featured.png' className='w-full h-36 object-cover rounded-t-lg'></img>
        </div>
        <CardContent className="px-5 py-4 space-y-3">
            <h1 className='hover:underline font-bold text-lg truncate cursor-pointer'>ReactJs Complete Course</h1>
            <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
            <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className='font-medium text-sm'>TriviaTrack</h1>
            </div>
            <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full cursor-pointer'}>
                Advance
            </Badge>
            </div>
            <div className='text-lg font-medium'>1500 PKR</div>
        </CardContent>
    </Card>
  )
}

export default Course