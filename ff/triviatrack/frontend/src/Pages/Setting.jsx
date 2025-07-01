import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const Setting = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-8">Settings</h1>

        <div className="flex justify-center mb-8">
          <h1 className='font-semibold text-2xl'>Trivia Track</h1>
        </div>

        <div className="flex justify-center">
          <Link to="/students/forgot-password">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md">
              Reset Password
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Setting;
