import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NavbarBanner = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        isOpen && (
            <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ duration: 0.5, delay: 0.9 }}
            className='bg-secondary text-sm text-center font-semibold p-1 hidden lg:block top-[5.5rem] sticky z-40'>
                Are you a trivia master? Test your knowledge with TriviaTrack!
            <Link to= "/contact" className='text-seconday ml-2'>Talk to us</Link> 
            <div className='absolute top-1/2 right-10 cursor-pointer -translate-y-1/2' onClick={() => setIsOpen(false)}>
                X
            </div>
            </motion.div>
        )
    );
};

export default NavbarBanner;