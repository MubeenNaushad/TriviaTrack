import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Reset after a short delay
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center p-8 md:p-10 gap-8 md:gap-12">

        {/* Left Image Section */}
        <div className="flex-1 flex items-center justify-center">
          {/* Update the src to match your image path or a hosted URL */}
          <img
            src="/src/assets/ContactUs.png"
            alt="Contact Support"
            className="w-full h-auto max-w-sm md:max-w-md rounded-2xl"
          />
        </div>

        {/* Form Section with Framer Motion Animation */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Get in Touch!
          </h2>
          <p className="text-center text-gray-600 mb-8">
            We’d love to hear from you! Fill out the form below and we’ll get back to you soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            {/* Message Field */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your Message"
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            >
              Send Message
            </button>
          </form>

          {/* Success / Additional Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {submitted ? (
              <p className="font-medium text-green-600">Your message has been sent! Thank you!</p>
            ) : (
              <>
                <p>
                  Need more help?{" "}
                  <span className="underline cursor-pointer hover:text-blue-600">
                    Contact Support
                  </span>

                </p>
                <p className="mt-2">
                  Don&apos;t have an account?{" "}
                  <Link to="/students/signup" className="underline cursor-pointer hover:text-blue-600">
                    Register
                  </Link>
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
