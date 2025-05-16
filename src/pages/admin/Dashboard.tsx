import React from 'react';
import { 
  Users, AlertTriangle, CheckCircle, Clock, 
  ArrowUpRight, FileText, MonitorPlay, BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for stats
  const stats = [
    { title: 'Active Exams', value: '8', icon: <FileText />, color: 'bg-blue-500' },
    { title: 'Active Students', value: '287', icon: <Users />, color: 'bg-green-500' },
    { title: 'Alerts', value: '14', icon: <AlertTriangle />, color: 'bg-amber-500' },
    { title: 'Completed Today', value: '12', icon: <CheckCircle />, color: 'bg-purple-500' },
  ];

  // Mock data for upcoming exams
  const upcomingExams = [
    { 
      id: 1, 
      title: 'Advanced Mathematics', 
      time: '11:00 AM', 
      date: 'Jul 15, 2025', 
      students: 45,
      status: 'active' 
    },
    { 
      id: 2, 
      title: 'Computer Science Fundamentals', 
      time: '02:30 PM', 
      date: 'Jul 15, 2025', 
      students: 32,
      status: 'scheduled' 
    },
    { 
      id: 3, 
      title: 'Engineering Physics', 
      time: '09:00 AM', 
      date: 'Jul 16, 2025', 
      students: 28,
      status: 'scheduled' 
    },
  ];

  // Mock data for recent alerts
  const recentAlerts = [
    { 
      id: 1, 
      type: 'Multiple Faces', 
      student: 'John Doe', 
      examId: 'EX-2025-0734', 
      time: '10:45 AM',
      severity: 'high'
    },
    { 
      id: 2, 
      type: 'Phone Detected', 
      student: 'Alice Smith', 
      examId: 'EX-2025-0734', 
      time: '10:42 AM',
      severity: 'high'
    },
    { 
      id: 3, 
      type: 'Face Not Visible', 
      student: 'Bob Johnson', 
      examId: 'EX-2025-0731', 
      time: '10:35 AM',
      severity: 'medium'
    },
    { 
      id: 4, 
      type: 'Inactivity Detected', 
      student: 'Sarah Williams', 
      examId: 'EX-2025-0730', 
      time: '10:30 AM',
      severity: 'low'
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin User</p>
        </div>
        <div className="flex space-x-2">
          <Link
            to="/admin/monitoring"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <MonitorPlay size={18} className="mr-2" />
            Live Monitoring
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Active & Upcoming Exams
            </h2>
            <Link 
              to="/admin/exams" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              View All
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{exam.title}</h3>
                    <div className="flex items-center mt-1">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-500 ml-1">
                        {exam.time} - {exam.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-3">
                      {exam.students} students
                    </span>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        exam.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {exam.status === 'active' ? 'Active' : 'Scheduled'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Recent AI Alerts
            </h2>
            <Link 
              to="/admin/alerts" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              View All
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div 
                      className={`mt-0.5 p-1.5 rounded-full mr-3 ${
                        alert.severity === 'high' 
                          ? 'bg-red-100 text-red-500' 
                          : alert.severity === 'medium'
                            ? 'bg-amber-100 text-amber-500'
                            : 'bg-blue-100 text-blue-500'
                      }`}
                    >
                      <AlertTriangle size={14} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">{alert.type}</span>
                        <span 
                          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            alert.severity === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : alert.severity === 'medium'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {alert.student} - {alert.examId}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 text-white">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Start Live Monitoring</h3>
            <MonitorPlay size={20} />
          </div>
          <p className="text-blue-100 text-sm mt-2">
            Monitor active exam sessions in real-time with AI-assisted alerts
          </p>
          <Link 
            to="/admin/monitoring"
            className="mt-4 inline-flex items-center px-3 py-1.5 bg-white text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition"
          >
            Go to Monitoring
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">Create New Exam</h3>
            <FileText size={20} />
          </div>
          <p className="text-purple-100 text-sm mt-2">
            Set up a new exam with customized proctoring settings and invites
          </p>
          <Link 
            to="/admin/exams/new"
            className="mt-4 inline-flex items-center px-3 py-1.5 bg-white text-purple-600 rounded-md text-sm font-medium hover:bg-purple-50 transition"
          >
            Create Exam
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-sm p-6 text-white">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">View Documentation</h3>
            <BookOpen size={20} />
          </div>
          <p className="text-teal-100 text-sm mt-2">
            Access guides on how to set up and manage proctored examinations
          </p>
          <Link 
            to="/admin/documentation"
            className="mt-4 inline-flex items-center px-3 py-1.5 bg-white text-teal-600 rounded-md text-sm font-medium hover:bg-teal-50 transition"
          >
            View Docs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;