import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Clock, Users, 
  FileText, MoreVertical, Edit, Trash2, Copy, Eye
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

// Mock data for exams
const mockExams = [
  { 
    id: 'EX-2025-0734', 
    title: 'Advanced Mathematics', 
    date: 'Jul 15, 2025',
    time: '11:00 AM - 12:30 PM', 
    duration: '90 min',
    students: 45,
    status: 'active',
    createdAt: '2025-07-10'
  },
  { 
    id: 'EX-2025-0735', 
    title: 'Computer Science Fundamentals', 
    date: 'Jul 15, 2025',
    time: '02:30 PM - 04:30 PM', 
    duration: '120 min',
    students: 32,
    status: 'scheduled',
    createdAt: '2025-07-10'
  },
  { 
    id: 'EX-2025-0736', 
    title: 'Engineering Physics', 
    date: 'Jul 16, 2025',
    time: '09:00 AM - 11:00 AM', 
    duration: '120 min',
    students: 28,
    status: 'scheduled',
    createdAt: '2025-07-11'
  },
  { 
    id: 'EX-2025-0728', 
    title: 'Data Structures and Algorithms', 
    date: 'Jul 10, 2025',
    time: '10:00 AM - 12:00 PM', 
    duration: '120 min',
    students: 36,
    status: 'completed',
    createdAt: '2025-07-05'
  },
  { 
    id: 'EX-2025-0729', 
    title: 'Database Management Systems', 
    date: 'Jul 12, 2025',
    time: '01:00 PM - 03:00 PM', 
    duration: '120 min',
    students: 30,
    status: 'completed',
    createdAt: '2025-07-05'
  }
];

const ExamManagement = () => {
  const { showAlert } = useAlert();
  const [exams, setExams] = useState(mockExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Filter exams based on search term and status
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exam.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Toggle dropdown menu for each exam
  const toggleMenu = (examId: string) => {
    if (openMenu === examId) {
      setOpenMenu(null);
    } else {
      setOpenMenu(examId);
    }
  };

  // Handle delete exam (mock implementation)
  const handleDeleteExam = (examId: string) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== examId));
      showAlert('Exam deleted successfully', 'success');
    }
    setOpenMenu(null);
  };

  // Handle duplicate exam (mock implementation)
  const handleDuplicateExam = (examId: string) => {
    const examToDuplicate = exams.find(exam => exam.id === examId);
    if (examToDuplicate) {
      const newExam = {
        ...examToDuplicate,
        id: `EX-${Date.now().toString().substring(6)}`,
        title: `${examToDuplicate.title} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setExams([newExam, ...exams]);
      showAlert('Exam duplicated successfully', 'success');
    }
    setOpenMenu(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
          <p className="text-gray-600">Manage and monitor your exams</p>
        </div>
        <Link
          to="/admin/exams/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          <Plus size={18} className="mr-2" />
          Create Exam
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search exams by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Status:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                statusFilter === 'all' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                statusFilter === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setStatusFilter('scheduled')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                statusFilter === 'scheduled' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                statusFilter === 'completed' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Exams table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                        <div className="text-sm text-gray-500">{exam.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{exam.date}</div>
                    <div className="text-sm text-gray-500">{exam.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{exam.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{exam.students}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      exam.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : exam.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                    }`}>
                      {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => toggleMenu(exam.id)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {openMenu === exam.id && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            <button
                              onClick={() => {
                                showAlert('Viewing exam details', 'info');
                                setOpenMenu(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Eye size={16} className="mr-2" />
                              View Details
                            </button>
                            <button
                              onClick={() => {
                                showAlert('Edit exam form opened', 'info');
                                setOpenMenu(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Edit size={16} className="mr-2" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDuplicateExam(exam.id)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Copy size={16} className="mr-2" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDeleteExam(exam.id)}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredExams.length === 0 && (
          <div className="py-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No exams found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new exam.
            </p>
            <div className="mt-6">
              <Link
                to="/admin/exams/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Exam
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamManagement;