import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, FileText, Home } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const ExamComplete = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { showAlert } = useAlert();
  const [isSubmitting, setIsSubmitting] = useState(true);
  
  // Mock exam data
  const examData = {
    title: 'Advanced Mathematics',
    course: 'MATH-401',
    totalQuestions: 5,
    answeredQuestions: 5,
    startTime: '11:00 AM',
    endTime: '12:15 PM',
    duration: '1h 15m',
    date: 'July 15, 2025',
  };

  // Simulate submission
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSubmitting(false);
      showAlert('Exam submitted successfully!', 'success');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div className="max-w-2xl mx-auto">
      {isSubmitting ? (
        // Submitting state
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Submitting Your Exam</h2>
          <p className="text-gray-600">
            Please wait while we process your responses and end your proctored session.
          </p>
        </div>
      ) : (
        // Complete state
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-green-50 p-8 text-center border-b border-green-100">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Completed!</h2>
            <p className="text-gray-600">
              Your proctored session has ended and your responses have been recorded.
            </p>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Exam Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Exam</p>
                <p className="font-medium">{examData.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="font-medium">{examData.course}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{examData.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{examData.startTime} - {examData.endTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{examData.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Questions Answered</p>
                <p className="font-medium">{examData.answeredQuestions} of {examData.totalQuestions}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-blue-50 border-b border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">What Happens Next?</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Your responses are now being processed. Results will be available after your instructor
                    reviews the exam. You'll receive a notification once your score is available.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3">
            <Link
              to="/"
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Home size={18} className="mr-2" />
              Return to Dashboard
            </Link>
            <button
              onClick={() => showAlert('Feedback form opened', 'info')}
              className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FileText size={18} className="mr-2" />
              Provide Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamComplete;