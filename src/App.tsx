import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Home Page
import Home from './pages/Home';

// Auth Pages
import Login from './pages/auth/Login';
import AdminLogin from './pages/auth/AdminLogin';
import StudentLogin from './pages/auth/StudentLogin';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import LiveMonitoring from './pages/admin/LiveMonitoring';
import ExamManagement from './pages/admin/ExamManagement';
import SessionReview from './pages/admin/SessionReview';
import CreateExam from './pages/admin/CreateExam';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import ExamInstructions from './pages/student/ExamInstructions';
import SystemCheck from './pages/student/SystemCheck';
import ExamInterface from './pages/student/ExamInterface';
import ExamComplete from './pages/student/ExamComplete';

// Context
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/student/login" element={<StudentLogin />} />
            
            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="monitoring" element={<LiveMonitoring />} />
              <Route path="exams" element={<ExamManagement />} />
              <Route path="exams/new" element={<CreateExam />} />
              <Route path="sessions/:id" element={<SessionReview />} />
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>
            
            {/* Student Protected Routes */}
            <Route path="/student" element={<ProtectedRoute role="student" />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="exam/:examId/instructions" element={<ExamInstructions />} />
              <Route path="exam/:examId/system-check" element={<SystemCheck />} />
              <Route path="exam/:examId" element={<ExamInterface />} />
              <Route path="exam/:examId/complete" element={<ExamComplete />} />
              <Route index element={<Navigate to="/student/dashboard" replace />} />
            </Route>
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;