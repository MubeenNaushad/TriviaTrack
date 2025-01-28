import React from 'react';
import { GrYoga } from 'react-icons/gr';
import { FaDumbbell } from 'react-icons/fa';
import { GiGymBag } from 'react-icons/gi';
import {motion} from 'framer-motion';
import { SlideLeft } from '../../utility/animation';

const WhyChooseData = [
    {
        id: 1,
        title: "Increased Engagement & Motivation",
        desc: "Traditional learning methods can be boring, but interactive and competitive elements make learning more fun.",
        icon: <GrYoga />,
        bgColor: "#0063ff",
        delay: 0.3,
    },
    {
        id: 2,
        title: "Improved Knowledge Retention",
        desc: "Studies show that interactive learning improves long-term memory retention.",
        icon: <FaDumbbell />,
        bgColor: "#73bc00",
        delay: 0.6,
    },
    {
        id: 3,
        title: "Personalized & Adaptive Learning",
        desc: "Games can be adaptive according to your skill level.",
        icon: <GiGymBag />,
        bgColor: "#fa6400",
        delay: 0.9,
    },
    {
        id: 4,
        title: "Real-World Skill Application",
        desc: "Gamified learning helps bridge the gap between theory and practice.",
        icon: <GiGymBag />,
        bgColor: "#fe6baa",
        delay: 0.9,
    },
]

const WhyChoose = () => {
    return <div className="bg-[#f9fafc]">
        <div className="container py-24">
          
            <div className='space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5'>
                <h1 className='uppercase font-semibold text-orange-600'>Why Choose Us</h1>
                <p className='font-semibold text-3xl'>Benefits of Games with Courses</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                {
                    WhyChooseData.map((item, index) => {
                        return (
                            <motion.div 
                            key={item.id}
                            variants={SlideLeft(item.delay)}
                            initial='hidden'
                            whileInView={"visible"}

                            className='space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]'>
                              
                                <div style={{backgroundColor: item.bgColor }}className='w-10 h-10 rounded-lg flex justify-center items-center text-white'>
                                    <div className='text-2xl'>{item.icon}</div>
                                </div>
                                <p className='font-semibold'>{item.title}</p>
                                <p className='text-sm text-gray-500'>{item.desc}</p>
                            </motion.div>
                        );
                    })
                }
            </div>
        </div>
    </div>
};

export default WhyChoose;