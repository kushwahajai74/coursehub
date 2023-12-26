import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Layouts/Header";
import Course from "./components/Courses/Courses";
import Footer from "./components/Layouts/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Contact from "./components/Contact/Contact";
import Request from "./components/Request/request";
import Subscribe from "./components/Payments/Subscribe";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentFail from "./components/Payments/PaymentFail";
import NotFound from "./components/NotFound/NotFound";
import CoursePage from "./components/CoursePage/CoursePage";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/updateProfile";
import ChangePassword from "./components/Profile/changePassword";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse";
import Users from "./components/Admin/Users/Users";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";

function App() {
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* home route */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<Request />} />
          {/* payement routes */}
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfail" element={<PaymentFail />} />
          <Route path="/course/:id" element={<CoursePage />} />
          {/* profile routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          {/* admin routes*/}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/createcourse" element={<CreateCourse />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;