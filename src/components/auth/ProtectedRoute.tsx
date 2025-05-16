import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from '../layout/AdminLayout';
import StudentLayout from '../layout/StudentLayout';

interface ProtectedRouteProps {
  role: 'admin' | 'student';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== role) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/'} replace />;
  }

  return (
    <>
      {role === 'admin' ? (
        <AdminLayout>
          <Outlet />
        </AdminLayout>
      ) : (
        <StudentLayout>
          <Outlet />
        </StudentLayout>
      )}
    </>
  );
};

export default ProtectedRoute;