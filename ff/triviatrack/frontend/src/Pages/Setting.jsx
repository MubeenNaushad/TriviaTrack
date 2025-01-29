import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Setting = () => {
  return (
    <div>
      <div className='text-center text-2xl mt-20'>Settings</div>
      <div className='justify-center flex mt-10'>
      <Link to="/students/forgot-password">
      <Button>
        Reset Password
      </Button>
      </Link>
          
      </div>
    </div>
  )
}

export default Setting