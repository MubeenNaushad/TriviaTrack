import React from 'react';
import './App.css';
import placeholderImage from './work.png';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <nav className="navbar">
                <div className="logo">
                    <a href="#">TriviaTrack</a>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Want to explore trivia?" />
                    <button className="search-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="menu">
                    <a href="#">Leaderboard</a>
                    <a href="#">Challenges</a>
                    <a href="#">About</a>
                </div>
                <div className="auth-container">
                    <button className="sign-in-button">Sign In</button>
                    <button className="sign-up-button">Sign Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-text-content">
                    <h1>Let's Explore A Magical Way To Play Trivia</h1>
                    <p>Join TriviaTrack to challenge yourself with exciting trivia questions and grow your knowledge in a fun way.</p>
                    <div className="hero-buttons">
                        <button className="primary-button">Get Started</button>
                        <button className="secondary-button">Join a Challenge</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={placeholderImage} alt="TriviaTrack Illustration" />
                </div>
            </section>

            {/* Statistics Section */}
            <section className="statistics-section">
                <div className="statistics-box">
                    <div className="statistics-item">200K+ Students</div>
                    <div className="statistics-item">20+ Courses</div>
                    <div className="statistics-item">100+ Challenges</div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
