import React from 'react';
import CountUp from 'react-countup';

const NumberCounter = () => {
    return <div className="bg-seconday text-white py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-semibold'>
                    <CountUp start={0} end={890} duration={3} />
                </p>
                <p>Expert Tutors</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-semibold'>
                    <CountUp end={20000} separator="," suffix="+" duration={3}  />
                </p>
                <p>Games</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-semibold'>
                    <CountUp end={290} duration={3} />
                </p>
                <p>Courses</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-3xl font-semibold'>
                    <CountUp end={78231} separator="," suffix="+" duration={3} />
                </p>
                <p>Achievments</p>
            </div>
        </div>
    </div>
};


export default NumberCounter;