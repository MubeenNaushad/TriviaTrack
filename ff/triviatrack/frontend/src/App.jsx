import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
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
import EnrolledStudents from "./homecomponents/Dashboard/EnrolledStudents.jsx";
import Forum from "./Forum/Forum.jsx";
import PostPage from "./Forum/Posts.jsx";
import CreateLecture from "./Pages/admin/lecture/CreateLecture.jsx";
import EditLecture from "./Pages/admin/lecture/EditLecture.jsx";
import SearchPage from "./Pages/Student/SearchPage.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import CourseProgress from "./Pages/Student/CourseProgress.jsx";
import StudentDashboard from "./homecomponents/Student_Dashboard/StudentDashboard.jsx";
import Quiz from "./Pages/Student/Quiz.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import VerifyAccount from "./auth/VerifyAccount.jsx";
import StudentProfile from "./homecomponents/Dashboard/StudentProfile.jsx";
import Setting from "./Pages/Setting.jsx";
import ProgressTracker from "./homecomponents/Student_Dashboard/ProgressTracker.jsx";
import CategoryPage from "./Forum/Categories.jsx";
import Leaderboard from "./homecomponents/Dashboard/Leaderboard.jsx";
import FinancialAidForm from "./Pages/admin/course/FinancialAid.jsx";
import Chatbot from "./homecomponents/Chatbot.jsx";
import Game from "./homecomponents/Student_Dashboard/SpaceGame.jsx";
import FinancialAidTable from "./homecomponents/Dashboard/financialAidTable.jsx";
import FinancialAidView from "./homecomponents/Dashboard/financialAidView.jsx";
import QuizBuilder from "./homecomponents/Quiz/quiz-builder.jsx";
import CourseAidTable from "./homecomponents/Dashboard/courseAidTable.jsx";
import RecommendationSystem from "./homecomponents/Student_Dashboard/RecommendationSystem.jsx";
import { ToastContainer } from "react-toastify";
import ForumSearchPage from "./Forum/ForumSearchPage.jsx";

const BannerData = {
  image: Img1,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Personalized Games to help you.",
  subtitle:
    "At Trivia Track, we believe learning should be as fun, engaging, and effective as playing a game. That’s why we offer personalized, gamified experiences tailored to your unique learning style and progress.",
  link: "#",
};

const BannerData2 = {
  image: Img2,
  tag: "CUSTOMIZE WITH YOUR SCHEDULE",
  title: "Games to help",
  subtitle:
    "Learning should be exciting, engaging, and effective. That’s why we bring you games designed to help you improve, challenge yourself, and master new skills effortlessly.",
  link: "#",
};

function AppRoutes() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/game";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <ToastContainer />
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
              <Chatbot />
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <div>
              <HeroSection />
              <div className="flex min-h-screen">
                <div className="flex justify-center items-center h-full w-full">
                  <div className="w-full">
                    <Courses />
                  </div>
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
        <Route path="/forum/categories/:slug" element={<CategoryPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/financial-aid/:courseId" element={<FinancialAidForm />} />
        <Route path="/game" element={<Game />} />
        <Route
          path="/course-financial-aid-applications"
          element={<CourseAidTable />}
        />
        <Route
          path="/financial-aid-applications"
          element={<FinancialAidTable />}
        />
        <Route
          path="/financial-aid-view/:appId"
          element={<FinancialAidView />}
        />
        <Route path="/forum/posts/:postId" element={<PostPage />} />
        <Route path="/forum/search" element={<ForumSearchPage />} />
        <Route path="/course/search" element={<SearchPage />} />
        <Route path="/students/signup" element={<SignUp />} />
        <Route path="/students/login" element={<Login />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/room/:roomid" element={<Roompage />} />
        <Route path="/students/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<Dashboard />} />
        <Route path="/generate-quiz/new" element={<QuizBuilder />} />

        <Route path="/generate-quiz/:id" element={<QuizBuilder />} />

        <Route path="/quiz/test" element={<Filter />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />

        <Route path="/settings" element={<Setting />} />
        <Route path="/students/progresstrack" element={<ProgressTracker />} />
        <Route path="/students/my-learning" element={<MyLearning />} />
        <Route
          path="/recommendation-system"
          element={<RecommendationSystem />}
        />
        <Route
          path="/students/student-details/:studentId"
          element={<StudentProfile />}
        />
        <Route path="/students/profile" element={<Profile />} />
        <Route path="/students/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/students/verify-account/:token"
          element={<VerifyAccount />}
        />
        <Route
          path="/students/reset-password/:id/:token"
          element={<ResetPassword />}
        />
        <Route path="/progress/:courseId" element={<CourseProgress />} />
        <Route path="/live" element={<Livesession />} />
        <Route path="/Studentdata" element={<StudentData />} />
        <Route path="/enrolledstudents" element={<EnrolledStudents />} />
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
    </>
  );
}

const App = () => (
  <UserProvider>
    <Router>
      <AppRoutes />
    </Router>
  </UserProvider>
);

export default App;
