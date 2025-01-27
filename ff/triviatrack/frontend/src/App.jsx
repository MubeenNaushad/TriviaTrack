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
import Courses from "./Pages/admin/course/Courses.jsx";
import MyLearning from "./Pages/Student/myLearning.jsx";
import Profile from "./Pages/Student/Profile.jsx";
import CourseDetail from "./Pages/admin/course/courseDetail.jsx";
import Filter from "./Pages/Student/Filter.jsx";
import AddCourse from "./Pages/admin/course/AddCourse.jsx";
import CourseTable from "./Pages/admin/course/CourseTable.jsx";
import { EditCourse } from "./Pages/admin/course/EditCourse.jsx";
import { StudentData } from "./homecomponents/Dashboard/StudentData.jsx";
import Forum from "./Forum/Forum.jsx";
import TopicDetails from "./Forum/TopicDetails.jsx";
import CreateLecture from "./Pages/admin/lecture/CreateLecture.jsx";
import EditLecture from "./Pages/admin/lecture/EditLecture.jsx";
import SearchPage from "./Pages/Student/SearchPage.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import CourseProgress from "./Pages/Student/CourseProgress.jsx";
import StudentDashboard from "./homecomponents/Student_Dashboard/StudentDashboard.jsx";
import Quiz from "./Pages/Student/Quiz.jsx";

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
              <Testimonial />
              <Footer />
            </>
          }
        />

        <Route
          path="/courses"
          element={
            <div>
              <HeroSection />

              <div className="flex min-h-screen">
                <div className="w:[50%] bg-gray-100">
                  {" "}
                  {/* Filter section */}
                  <Filter />
                </div>
                <div className="w-3/4 p-4">
                  {" "}
                  {/* Main content section */}
                  <Courses />
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/courses/course-details/:courseId"
          element={<CourseDetail />}
        />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/topics/:topicId" element={<TopicDetails />} />
        <Route path="/course/search" element={<SearchPage />} />
        <Route path="/students/signup" element={<SignUp />} />
        <Route path="/students/login" element={<Login />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/room/:roomid" element={<Roompage />} />
        <Route path="/students/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />

        <Route path="/students/my-learning" element={<MyLearning />} />
        <Route path="/students/profile" element={<Profile />} />
        <Route path="/students/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/students/reset-password/:id/:token"
          element={<ResetPassword />}
        />

        <Route path="/progress/:courseId" element={<CourseProgress />} />

        <Route path="/live" element={<Livesession />} />
        <Route path="/Studentdata" element={<StudentData />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/list-course" element={<CourseTable />} />
        <Route path="/list-course/:id" element={<EditCourse />} />
        <Route
          path="/list-course/:courseId/lecture"
          element={<CreateLecture />}
        />
        <Route
          path="/list-course/:courseId/lecture/:lectureId"
          element={<EditLecture />}
        />
      </Routes>
    </Router>
  );
};

export default App;
