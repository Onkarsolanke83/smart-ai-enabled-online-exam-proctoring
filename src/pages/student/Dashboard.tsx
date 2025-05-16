import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  BookOpen,
  MessageSquare,
  History,
  Award,
  FileText,
  AlertTriangle,
  ChevronRight,
  User,
  Book,
  GraduationCap
} from 'lucide-react';

const StudentDashboard = () => {
  // Mock data
  const upcomingExams = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      date: 'Jul 15, 2025',
      time: '11:00 AM',
      duration: '90 minutes',
      course: 'MATH-401'
    },
    {
      id: 2,
      title: 'Computer Science Fundamentals',
      date: 'Jul 16, 2025',
      time: '02:30 PM',
      duration: '120 minutes',
      course: 'CS-301'
    }
  ];

  const pastExams = [
    {
      id: 1,
      title: 'Database Management',
      date: 'Jul 10, 2025',
      score: '85/100',
      status: 'passed'
    },
    {
      id: 2,
      title: 'Operating Systems',
      date: 'Jul 8, 2025',
      score: '92/100',
      status: 'passed'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New exam schedule released',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 2,
      title: 'System maintenance scheduled',
      time: '1 day ago',
      type: 'warning'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Student!</h1>
            <p className="mt-1 text-blue-100">Your upcoming exams and academic progress</p>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Student"
              className="h-20 w-20 rounded-full object-cover border-4 border-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Upcoming Exams */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Exams</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-500">{exam.course}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        <span>{exam.date} at {exam.time}</span>
                        <Clock size={16} className="ml-3 mr-1" />
                        <span>{exam.duration}</span>
                      </div>
                    </div>
                    <Link
                      to={`/student/exam/${exam.id}/instructions`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Start Exam
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Exams */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Past Exams</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {pastExams.map((exam) => (
                <div key={exam.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">{exam.title}</h3>
                      <p className="text-sm text-gray-500">{exam.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {exam.score}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{exam.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/student/schedule"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="mt-2 text-sm text-gray-900">Schedule</span>
              </Link>
              <Link
                to="/student/resources"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <BookOpen className="h-6 w-6 text-blue-600" />
                <span className="mt-2 text-sm text-gray-900">Resources</span>
              </Link>
              <Link
                to="/student/chat"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <span className="mt-2 text-sm text-gray-900">Chat</span>
              </Link>
              <Link
                to="/student/progress"
                className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50"
              >
                <History className="h-6 w-6 text-blue-600" />
                <span className="mt-2 text-sm text-gray-900">Progress</span>
              </Link>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Announcements</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${
                      announcement.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      {announcement.type === 'warning' ? (
                        <AlertTriangle className={`h-4 w-4 ${
                          announcement.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                        }`} />
                      ) : (
                        <FileText className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{announcement.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{announcement.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Guide */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Study Guide</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <Link
                  to="/student/guide/exam-tips"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-blue-600" />
                    <span className="ml-3 text-sm text-gray-900">Exam Tips</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  to="/student/guide/study-materials"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <span className="ml-3 text-sm text-gray-900">Study Materials</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link
                  to="/student/guide/faqs"
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="ml-3 text-sm text-gray-900">FAQs</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;