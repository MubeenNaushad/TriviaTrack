import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="contact-form-container">
                <h2>Contact Us</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter Your Name..."
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter Your Email..."
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Enter Your Message..."
                            rows="6"
                        />
                    </div>
                    <button type="submit" className="contact-button">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
