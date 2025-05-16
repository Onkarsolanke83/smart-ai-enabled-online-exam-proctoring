import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, AlertTriangle, Eye, User } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

// Mock data for student feeds
const mockStudents = Array.from({ length: 12 }, (_, i) => ({
  id: `student-${i + 1}`,
  name: `Student ${i + 1}`,
  examId: `EX-2025-07${(i % 3) + 30}`,
  image: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600`,
  status: i % 5 === 0 ? 'warning' : i % 7 === 0 ? 'alert' : 'normal',
  alertType: i % 5 === 0 ? 'Face not centered' : i % 7 === 0 ? 'Multiple faces detected' : null,
  timeRemaining: `${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
}));

const LiveMonitoring = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();

  // Filter students based on search and status
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.examId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'warning' && student.status === 'warning') || 
                         (selectedStatus === 'alert' && student.status === 'alert') ||
                         (selectedStatus === 'normal' && student.status === 'normal');
    
    return matchesSearch && matchesStatus;
  });

  // Simulate detecting a new alert
  useEffect(() => {
    const timeout = setTimeout(() => {
      const updatedStudents = [...students];
      const randomIndex = Math.floor(Math.random() * students.length);
      
      if (updatedStudents[randomIndex].status === 'normal') {
        updatedStudents[randomIndex] = {
          ...updatedStudents[randomIndex],
          status: 'warning',
          alertType: 'Phone detected'
        };
        
        setStudents(updatedStudents);
        showAlert(`Alert: Phone detected for ${updatedStudents[randomIndex].name}`, 'warning');
      }
    }, 15000);
    
    return () => clearTimeout(timeout);
  }, [students, showAlert]);

  // Handle refresh of the monitoring feeds
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showAlert('Monitoring feeds refreshed', 'success');
    }, 1000);
  };

  // Integration with YOLOv8 would happen here in a real implementation
  // This would involve web socket connections to a backend service running the model

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Monitoring</h1>
          <p className="text-gray-600">Monitoring 12 active students</p>
        </div>
        <button 
          onClick={handleRefresh}
          className={`flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none ${isLoading ? 'opacity-75' : ''}`}
          disabled={isLoading}
        >
          <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Feeds
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search student or exam ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span className="text-gray-700 text-sm font-medium">Filter:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedStatus === 'all' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedStatus('alert')}
              className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
                selectedStatus === 'alert' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <AlertTriangle size={14} className="mr-1" />
              Alerts
            </button>
            <button
              onClick={() => setSelectedStatus('warning')}
              className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
                selectedStatus === 'warning' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <AlertTriangle size={14} className="mr-1" />
              Warnings
            </button>
            <button
              onClick={() => setSelectedStatus('normal')}
              className={`px-3 py-1 rounded-md text-sm font-medium flex items-center ${
                selectedStatus === 'normal' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Eye size={14} className="mr-1" />
              Normal
            </button>
          </div>
        </div>
      </div>

      {/* Student video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <div 
            key={student.id} 
            className={`bg-white rounded-lg shadow-sm overflow-hidden border-2 ${
              student.status === 'alert' 
                ? 'border-red-500' 
                : student.status === 'warning'
                  ? 'border-amber-500'
                  : 'border-gray-200'
            }`}
          >
            <div className="relative">
              {/* Webcam feed - in a real app, this would be a video stream */}
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <img 
                  src={student.image} 
                  alt={student.name} 
                  className="object-cover h-full w-full opacity-90"
                />
                {/* Webcam overlay with facial recognition markers would go here */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  <div className="border-2 border-dashed border-blue-400 w-32 h-32 rounded-full opacity-50"></div>
                </div>
              </div>
              
              {/* Status indicators */}
              <div className="absolute top-2 right-2 flex space-x-2">
                {student.status !== 'normal' && (
                  <div className={`${
                    student.status === 'alert' ? 'bg-red-500' : 'bg-amber-500'
                  } text-white text-xs px-2 py-1 rounded-full flex items-center animate-pulse`}>
                    <AlertTriangle size={12} className="mr-1" />
                    {student.status === 'alert' ? 'Alert' : 'Warning'}
                  </div>
                )}
                
                <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {student.timeRemaining}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.examId}</p>
                </div>
                <button className="text-blue-600 p-1 rounded-full hover:bg-blue-50">
                  <Eye size={18} />
                </button>
              </div>
              
              {student.alertType && (
                <div className={`mt-2 px-3 py-2 rounded-md text-sm ${
                  student.status === 'alert'
                    ? 'bg-red-50 text-red-800'
                    : 'bg-amber-50 text-amber-800'
                }`}>
                  <div className="flex items-center">
                    <AlertTriangle size={14} className="mr-1" />
                    <span>{student.alertType}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <User size={40} className="mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">No students found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default LiveMonitoring;