import React from 'react';
import LandingPage from './LandingPage.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './DashboardPage.js';
import TeacherDashboard from './TeacherDashboardPage.js';
import ContactForm from './ContactForm.js';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
        
    );
}

export default App;
