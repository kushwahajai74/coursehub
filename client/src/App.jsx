import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
const Home = lazy(() => import("./components/Home/Home"));
const Header = lazy(() => import("./components/Layouts/Header"));
const Course = lazy(() => import("./components/Courses/Courses"));
const Footer = lazy(() => import("./components/Layouts/Footer"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ForgetPassword = lazy(() => import("./components/Auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./components/Auth/ResetPassword"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Request = lazy(() => import("./components/Request/Request"));
const Subscribe = lazy(() => import("./components/Payments/Subscribe"));
const PaymentSuccess = lazy(() =>
  import("./components/Payments/PaymentSuccess")
);
const PaymentFail = lazy(() => import("./components/Payments/PaymentFail"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const CoursePage = lazy(() => import("./components/CoursePage/CoursePage"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const UpdateProfile = lazy(() => import("./components/Profile/UpdateProfile"));
const ChangePassword = lazy(() =>
  import("./components/Profile/ChangePassword")
);
const Dashboard = lazy(() => import("./components/Admin/Dashboard/Dashboard"));
const CreateCourse = lazy(() =>
  import("./components/Admin/CreateCourse/CreateCourse")
);
const Users = lazy(() => import("./components/Admin/Users/Users"));
const AdminCourses = lazy(() =>
  import("./components/Admin/AdminCourses/AdminCourses")
);
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
    <>
      <Toaster />
      <Loader />
    </>
  ) : (
    <>
      <Router>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Suspense fallback={<Loader />}>
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
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect={"/profile"}
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect={"/profile"}
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<Request />} />

            {/* payement routes */}
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Subscribe user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />
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
                  <UpdateProfile user={user} />
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
        </Suspense>
      </Router>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
