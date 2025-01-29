import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';





function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="mt-16 flex items-center justify-center min-h-screen bg-gray-300 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-8 md:space-y-0 md:space-x-8">
        
  
        <div className="flex-shrink-0">
          <img src= "\src\assets\ContactUs.png" alt="Contact Support" className="w-full md:w-96 h-auto" />
        </div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800" >Get in Touch With Us</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-full bg-gray-800 bg-opacity-20 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter Name..."
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-full bg-gray-800 bg-opacity-20 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter Email..."
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 bg-opacity-20 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                placeholder="Enter Message..."
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gray-800 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 focus:outline-none transition-all"
            >
              Send Message
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-800 opacity-80">
            {submitted ? (
              <p>Your message has been sent! Thank you!</p>
            ) : (
              <>
                <p>Need help? <span className="underline cursor-pointer">Contact Support</span></p>
                <p className="mt-2">
                  Don't have an account? <Link to="/students/signup"><span className="underline cursor-pointer"> Register</span></Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactForm;
