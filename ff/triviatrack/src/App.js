import React from 'react';
import LandingPage from './LandingPage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
        
    );
}

export default App;
