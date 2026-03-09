import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./pages/Authcontext";

import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Zoom from "./pages/Zoom";
import Scoop from "./pages/Scoop";
import Employees from "./pages/Employees";
import Announcements from "./pages/Announcements";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Office from "./pages/Office";
import Location from "./pages/Location";
import Layout from "./pages/Layout";
import Articles from "./pages/Articules";
import CalendarPage from "./pages/Calendar";
import MonthlyNewspaperArchive from "./pages/Archive";
import EMCDigitalMedia from "./pages/heropage";

import "./App.css";

/* =======================
   Protected Route
======================= */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/eMCDigitalMedia" replace />;
  }

  return children;
};

/* =======================
   App
======================= */
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/eMCDigitalMedia" replace />} />
          <Route path="/eMCDigitalMedia" element={<EMCDigitalMedia />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected routes */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/zoom" element={<Zoom />} />
            <Route path="/office" element={<Office />} />
            <Route path="/scoop" element={<Scoop />} />
            <Route path="/location" element={<Location />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/archive" element={<MonthlyNewspaperArchive />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
