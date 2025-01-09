import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Navbar from "./homecomponents/navbar/navbar.jsx";
import NavbarBanner from "./homecomponents/navbar/NavbarBanner.jsx";
import Hero from "./homecomponents/Hero/Hero.jsx";
import NumberCounter from "./homecomponents/NumberCounter/NumberCounter.jsx";
import WhyChoose from "./homecomponents/WhyChoose/WhyChoose.jsx";
import Img1 from "./assets/banner1.png";
import Img2 from "./assets/banner2.png";
import Banner from "./homecomponents/Banner/Banner.jsx";
import SubjectCard from "./homecomponents/SubjectCard/SubjectCard.jsx";
import Testimonial from "./homecomponents/Testimonial/Testimonial.jsx";
import Footer from "./homecomponents/Footer/Footer.jsx";
import SignUp from "./auth/Signup.jsx";
import Login from "./auth/Login.jsx";
import Roompage from "./room/indexx.jsx";
import ContactForm from "./oldrand/ContactForm.jsx";
import Livesession from "./homecomponents/navbar/Livesession.jsx";
import Dashboard from "./homecomponents/Dashboard/Dashboard.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HeroSection from "./Pages/Student/HeroSection.jsx";
import Courses from "./Pages/Student/Courses.jsx";
import myLearning from "./Pages/Student/myLearning.jsx";
import Profile from "./Pages/Student/Profile.jsx";

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
              <HeroSection />
              <Testimonial />
              <Footer />
            </>
          }
        />

        <Route
          path="/courses"
          element={
            <>
              <HeroSection />
              <Courses />
            </>
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/room/:roomid" element={<Roompage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/my-learning" element={<myLearning />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/live" element={<Livesession />} />
        <Route path="/courses" element={<HeroSection />} />
      </Routes>
    </Router>
  );
};

export default App;
