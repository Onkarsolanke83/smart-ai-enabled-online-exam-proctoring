import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Play, Pause, AlertTriangle, Camera, 
  Download, ChevronRight, ChevronLeft, Flag
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const SessionReview = () => {
  const { id } = useParams<{ id: string }>();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Mock session data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSession({
        id: id,
        student: {
          id: 'STU-1234',
          name: 'Jane Smith',
          email: 'jane.smith@example.com'
        },
        exam: {
          id: 'EX-2025-0734',
          title: 'Advanced Mathematics',
          duration: '90 minutes'
        },
        date: 'Jul 15, 2025',
        startTime: '10:30 AM',
        endTime: '12:00 PM',
        totalDuration: '1h 30m',
        status: 'completed',
        events: [
          { id: 1, time: '00:12:45', type: 'Multiple Faces', severity: 'high', screenshot: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
          { id: 2, time: '00:25:16', type: 'Phone Detected', severity: 'high', screenshot: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
          { id: 3, time: '00:37:22', type: 'Face Not Visible', severity: 'medium', screenshot: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
          { id: 4, time: '00:51:49', type: 'Inactivity', severity: 'low', screenshot: 'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        ],
        recordingUrl: 'https://example.com/recording/session-123.mp4',
      });
      setIsLoading(false);
    }, 1500);
  }, [id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      showAlert('Playing recording', 'info');
    }
  };

  const jumpToEvent = (time: string) => {
    // Convert time string to seconds
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
    setCurrentTime(timeInSeconds);
    showAlert(`Jumped to event at ${time}`, 'info');
  };

  const generateReport = () => {
    showAlert('Generating session report...', 'info');
    // Simulate report generation
    setTimeout(() => {
      showAlert('Session report ready for download', 'success');
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to="/admin/monitoring" 
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Session Review</h1>
      </div>

      {/* Session Info */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Session Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Session ID</p>
                <p className="font-medium">{session.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Exam</p>
                <p className="font-medium">{session.exam.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{session.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{session.startTime} - {session.endTime}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Student Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="font-medium">{session.student.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{session.student.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{session.student.email}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Session Summary</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{session.totalDuration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">AI Alerts</p>
                <p className="font-medium">{session.events.length} events</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={generateReport}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                >
                  <Download size={14} className="mr-1" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player & Timeline */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <h2 className="text-lg font-medium text-gray-900">Session Recording</h2>
            <div className="flex space-x-2">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={handlePlayPause}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          {/* Session recording placeholder */}
          <div className="text-center text-gray-400">
            <Camera size={48} className="mx-auto mb-2 opacity-50" />
            <p>Session recording not available in this demo</p>
            <p className="text-sm">Time: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</p>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="p-4">
          <div className="relative h-12">
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
            {/* Event markers on timeline */}
            {session.events.map((event: any) => {
              const [hours, minutes, seconds] = event.time.split(':').map(Number);
              const timeInSeconds = hours * 3600 + minutes * 60 + seconds;
              const totalSessionTime = 90 * 60; // 90 minutes in seconds
              const position = (timeInSeconds / totalSessionTime) * 100;
              
              return (
                <div
                  key={event.id}
                  className={`absolute top-0 w-3 h-3 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    event.severity === 'high' ? 'bg-red-500' : 
                    event.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                  } ${selectedEvent === event.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                  style={{ left: `${position}%`, top: '50%' }}
                  onClick={() => {
                    setSelectedEvent(event.id);
                    jumpToEvent(event.time);
                  }}
                  title={`${event.type} at ${event.time}`}
                ></div>
              );
            })}
            
            {/* Current time indicator */}
            <div 
              className="absolute top-0 w-1 h-full bg-blue-600"
              style={{ left: `${(currentTime / (90 * 60)) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>00:00</span>
            <span>00:30</span>
            <span>01:00</span>
            <span>01:30</span>
          </div>
        </div>
      </div>

      {/* AI Events */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">AI Detected Events</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {session.events.map((event: any) => (
            <div 
              key={event.id} 
              className={`p-4 hover:bg-gray-50 ${selectedEvent === event.id ? 'bg-blue-50' : ''}`}
              onClick={() => {
                setSelectedEvent(event.id);
                jumpToEvent(event.time);
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex">
                  <div 
                    className={`p-2 rounded-full mr-3 ${
                      event.severity === 'high' 
                        ? 'bg-red-100 text-red-500' 
                        : event.severity === 'medium'
                          ? 'bg-amber-100 text-amber-500'
                          : 'bg-blue-100 text-blue-500'
                    }`}
                  >
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{event.type}</span>
                      <span 
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          event.severity === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : event.severity === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {event.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Detected at {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      showAlert('Event flagged for review', 'success');
                    }}
                  >
                    <Flag size={16} />
                  </button>
                </div>
              </div>
              
              {/* Event screenshot */}
              <div className="mt-3 overflow-hidden rounded border border-gray-200">
                <img 
                  src={event.screenshot} 
                  alt={`Screenshot of ${event.type}`}
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionReview;