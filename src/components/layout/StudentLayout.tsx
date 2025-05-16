import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // For demo purposes, we'll create a simple timer component
  const [timeLeft, setTimeLeft] = React.useState('00:45:00');
  const [warnings, setWarnings] = React.useState<string[]>([]);
  
  // Simulate warnings
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setWarnings(prev => [...prev, 'Please center your face in the camera view']);
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Minimal header for student exam view */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-900">ProctorAI Exam</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-700">
                <Clock size={18} className="mr-2" />
                <span className="font-mono">{timeLeft}</span>
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-600">
                  {user?.name} | {user?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Warning notification */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                {warnings[warnings.length - 1]}
              </p>
            </div>
            <button 
              onClick={() => setWarnings([])}
              className="ml-auto pl-3"
            >
              <span className="text-amber-500 hover:text-amber-600">Dismiss</span>
            </button>
          </div>
        </div>
      )}

      {/* AI monitoring indicator */}
      <div className="fixed top-20 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
        <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
        <span>AI Monitoring Active</span>
      </div>

      {/* Main content */}
      <main className="flex-1 relative overflow-y-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;