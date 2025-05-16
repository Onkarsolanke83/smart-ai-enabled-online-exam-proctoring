import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Users } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">ProctorAI</h1>
          <p className="mt-2 text-gray-600">AI-Powered Secure Online Proctoring</p>
        </div>

        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Select User Type</h2>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <button
                onClick={() => navigate('/admin/login')}
                className="flex items-center justify-center py-4 px-6 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition duration-200"
              >
                <User className="h-6 w-6 text-blue-600 mr-3" />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Administrator</h3>
                  <p className="text-sm text-gray-500">Manage exams and monitor students</p>
                </div>
              </button>
              
              <button
                onClick={() => navigate('/student/login')}
                className="flex items-center justify-center py-4 px-6 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition duration-200"
              >
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Student</h3>
                  <p className="text-sm text-gray-500">Take secure, proctored exams</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              By logging in, you agree to our <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;