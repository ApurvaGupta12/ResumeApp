import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import FAQpage from "./pages/FAQpage";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./pages/Unauthorized";

import ResumeScreen from "./pages/ResumeScreen";
import GenerateResume from "./pages/GenerateResume";
import ResumeTemplatesPage from "./pages/ResumeTemplatesPage";
import EditableResumePage from "./pages/EditableResumePage";
import ResumePreviewPage from './pages/ResumePreviewPage';
import MyResumes from "./pages/MyResumes";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import AdminTemplateList from "./components/ui/AdminTemplateList";
import AdminTemplatePreview from "./pages/admin/AdminTemplatePreview";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import PublicLayout from "./Layout/PublicLayout";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import SelectRolePage from "./pages/SelectRolePage";
const App: React.FC = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes (unauthenticated) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="/select-role" element={<SelectRolePage />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="faqpage" element={<FAQpage />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/sign-in" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>

          {/* User Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route element={<UserLayout />}>
              <Route path="/my-resumes" element={<MyResumes />} />
              <Route path="resumeScreen" element={<ResumeScreen />} />
              <Route path="/preview/:id" element={<ResumePreviewPage />} />
              <Route path="generateResume" element={<GenerateResume />} />
              <Route path="resumeTemp" element={<ResumeTemplatesPage />} />
              <Route path="/edit-template/:id" element={<EditableResumePage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route index element={<UsersPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="templates" element={<AdminTemplateList />} />
              </Route>
              <Route path="/admin/template-preview/:id" element={<AdminTemplatePreview />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
