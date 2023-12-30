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
import Request from "./components/Request/Request";
import Subscribe from "./components/Payments/Subscribe";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentFail from "./components/Payments/PaymentFail";
import NotFound from "./components/NotFound/NotFound";
import CoursePage from "./components/CoursePage/CoursePage";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import ChangePassword from "./components/Profile/ChangePassword";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse";
import Users from "./components/Admin/Users/Users";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearError, clearMessage, getMyProfile } from "./features/userSlice";
import Loader from "./components/Layouts/Loader";
import { ProtectedRoute } from "protected-route-react";

function App() {
  // window.addEventListener("contextmenu", (e) => {
  //   e.preventDefault();
  // });
  const dispatch = useDispatch();
  const { isAuthenticated, user, error, message, isLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [message, dispatch]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          {/* home route */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          {/* Auth routes */}
          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect={"/profile"}
              >
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                redirect={"/profile"}
              >
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request" element={<Request />} />

          {/* payement routes */}
          <Route
            path="/subscribe"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Subscribe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentsuccess"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentfail"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PaymentFail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          {/* profile routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/changepassword"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* admin routes*/}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <AdminCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/createcourse"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
