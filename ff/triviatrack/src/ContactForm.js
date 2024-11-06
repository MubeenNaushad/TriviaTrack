import React, { useState } from 'react';
import './ContactForm.css';
import contactImage from './contact-image.png'; // Replace with your actual image path

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
            <div className="contact-form-wrapper">
                <div className="contact-form-container">
                    <h2>Get In Touch</h2>
                    <p>We are here for you! How can we help?</p>
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter Your Name..."
                                className="styled-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter Your Email Address..."
                                className="styled-input"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Go ahead, we are listening..."
                                rows="6"
                                className="styled-input"
                            />
                        </div>
                        <button type="submit" className="contact-button">Submit</button>
                    </form>
                </div>
                <div className="contact-info">
                    <img src={contactImage} alt="Contact Illustration" className="contact-image" />
                    <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>Karachi, Pakistan</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-phone"></i>
                        <span>0900-78601</span>
                    </div>
                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <span>contactus@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
