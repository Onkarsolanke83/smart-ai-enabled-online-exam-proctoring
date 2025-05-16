import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle, 
  Users, 
  Brain,
  MonitorPlay,
  Lock,
  Clock,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: 'AI-Powered Monitoring',
      description: 'Advanced artificial intelligence ensures exam integrity through real-time monitoring and violation detection.'
    },
    {
      icon: <MonitorPlay className="h-6 w-6 text-blue-600" />,
      title: 'Live Proctoring',
      description: 'Real-time video monitoring with instant alerts for suspicious activities.'
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: 'Secure Environment',
      description: 'End-to-end encryption and secure authentication protect exam content and student data.'
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: 'Flexible Scheduling',
      description: 'Schedule exams at your convenience with automated time management.'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '50,000+', label: 'Exams Conducted' },
    { value: '1,000+', label: 'Institutions' },
    { value: '500,000+', label: 'Students' }
  ];

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center py-16 lg:py-24">
            <div className="lg:w-1/2 lg:pr-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Secure Online Exams with AI Proctoring
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Transform your online examinations with our advanced AI-powered proctoring system.
                Ensure academic integrity while providing a seamless experience for students and administrators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/student/login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start Exam
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/admin/login"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Admin Login
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <img
                src="https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Online Exam"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Advanced Features for Modern Education
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our comprehensive solution provides everything you need for secure online examinations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 lg:px-12 lg:py-16 flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-2/3 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Online Examinations?
                </h2>
                <p className="text-blue-100 text-lg">
                  Join thousands of institutions that trust our platform for secure and efficient online assessments.
                </p>
              </div>
              <div className="mt-8 lg:mt-0">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-sm"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">ProctorAI</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-500">© 2025 ProctorAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;