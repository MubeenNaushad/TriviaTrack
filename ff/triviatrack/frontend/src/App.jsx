import React from "react";
import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from "react-router-dom";
import Navbar from "./components copy/navbar/navbar.jsx";
import NavbarBanner from "./components copy/navbar/NavbarBanner.jsx";
import Hero from "./components copy/Hero/Hero.jsx";
import NumberCounter from "./components copy/NumberCounter/NumberCounter.jsx";
import WhyChoose from "./components copy/WhyChoose/WhyChoose.jsx";
import Img1 from "./assets/banner1.png";
import Img2 from "./assets/banner2.png";
import Banner from "./components copy/Banner/Banner";
import SubjectCard from "./components copy/SubjectCard/SubjectCard";
import Testimonial from "./components copy/Testimonial/Testimonial";
import Footer from "./components copy/Footer/Footer";
import SignUp from "./auth/Signup.jsx";
import Login from "./auth/Login.jsx";
import Roompage from "./room/indexx.jsx";
import ContactForm from "./oldrand/ContactForm.jsx";
import Livesession from "./components copy/navbar/Livesession.jsx";
import Dashboard from "./components copy/Dashboard/Dashboard.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeroSection from "./Pages/Student/HeroSection.jsx";
import Courses from "./Pages/Student/Courses.jsx";

const BannerData = {
  image: Img1,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Personalized Games to help you.",
  subtitle:
    "Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of your students class and tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility.Lorem ipsum is a placeholder text commonly used to demonstrate the visual form",
  link: "#",
};

const BannerData2 = {
  image: Img2,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Games to help",
  subtitle:
    "Our scheduling system allows you to select based on your free time. Lorem ipsum demo text for template. Keep track of your students class and tutoring schedules, and never miss your lectures. The best online class scheduling system with easy accessibility. Lorem ipsum is a placeholder text commonly used",
  link: "#",
};



const App = () => {
  
  return (
    <Router>
      <Navbar />
     
      <Routes>
        
        <Route
          path="/"
          element={
            <>
              <NavbarBanner />
              <Hero />
              <NumberCounter />
              <WhyChoose />
              <Banner {...BannerData} />
              <Banner {...BannerData2} reverse={true} />
              <SubjectCard />
              <HeroSection/>
              <Testimonial />
              <Footer />
            </>
            
          }
          
        />

<Route
          path="/courses"
          element={
            <>
              <HeroSection/>
              <Courses/>
             
            </> 
          }       
        />
        
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactForm/>} />
        <Route path="/room/:roomid" element={<Roompage />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/live" element={<Livesession />} />
        <Route path="/courses" element={<HeroSection />} />

        
        
      </Routes>
    </Router>


  );
};

export default App;
