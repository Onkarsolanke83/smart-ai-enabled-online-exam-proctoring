import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Save, CheckCircle, AlertTriangle, Flag
} from 'lucide-react';
import Webcam from 'react-webcam';
import { useAlert } from '../../context/AlertContext';
import * as tf from '@tensorflow/tfjs';

// Mock YOLOv8 detection function using TensorFlow.js
const mockDetectViolations = (videoElement: HTMLVideoElement | null) => {
  if (!videoElement) return null;
  
  // In a real implementation, this would use a YOLOv8 model loaded with TensorFlow.js
  // Here we're just simulating random detections for demo purposes
  const types = ['none', 'none', 'none', 'none', 'phone', 'multiple_faces', 'no_face'];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

const ExamInterface = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { showAlert } = useAlert();
  const webcamRef = useRef<Webcam>(null);
  const detectionIntervalRef = useRef<number | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [violations, setViolations] = useState<string[]>([]);
  const [violationCount, setViolationCount] = useState(0);
  const [isFlagged, setIsFlagged] = useState(false);
  
  // Mock exam data
  const examData = {
    title: 'Advanced Mathematics',
    course: 'MATH-401',
    questions: [
      {
        id: 1,
        text: 'What is the derivative of f(x) = x² with respect to x?',
        options: [
          { id: 'a', text: 'f\'(x) = x' },
          { id: 'b', text: 'f\'(x) = 2x' },
          { id: 'c', text: 'f\'(x) = 2' },
          { id: 'd', text: 'f\'(x) = 0' },
        ],
      },
      {
        id: 2,
        text: 'Solve the equation: 3x + 7 = 22',
        options: [
          { id: 'a', text: 'x = 5' },
          { id: 'b', text: 'x = 6' },
          { id: 'c', text: 'x = 7' },
          { id: 'd', text: 'x = 8' },
        ],
      },
      {
        id: 3,
        text: 'If f(x) = 2x + 3 and g(x) = x² - 1, what is (f ∘ g)(2)?',
        options: [
          { id: 'a', text: '7' },
          { id: 'b', text: '9' },
          { id: 'c', text: '11' },
          { id: 'd', text: '13' },
        ],
      },
      {
        id: 4,
        text: 'What is the integral of f(x) = 2x with respect to x?',
        options: [
          { id: 'a', text: 'f(x) = x² + C' },
          { id: 'b', text: 'f(x) = x² - 1 + C' },
          { id: 'c', text: 'f(x) = x³/3 + C' },
          { id: 'd', text: 'f(x) = 2 ln|x| + C' },
        ],
      },
      {
        id: 5,
        text: 'Find the limit: lim(x→0) sin(x)/x',
        options: [
          { id: 'a', text: '0' },
          { id: 'b', text: '1' },
          { id: 'c', text: '∞' },
          { id: 'd', text: 'The limit does not exist' },
        ],
      },
    ],
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    });
  };

  // Navigate to next/previous question
  const goToQuestion = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit exam
  const handleSubmitExam = () => {
    // Check if all questions are answered
    const answeredCount = Object.keys(answers).length;
    
    if (answeredCount < examData.questions.length) {
      const missingCount = examData.questions.length - answeredCount;
      if (confirm(`You haven't answered ${missingCount} question(s). Are you sure you want to submit?`)) {
        navigate(`/student/exam/${examId}/complete`);
      }
    } else {
      navigate(`/student/exam/${examId}/complete`);
    }
  };

  // Flag question for review
  const toggleFlagQuestion = () => {
    setIsFlagged(!isFlagged);
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          showAlert('Time is up! Submitting your exam.', 'warning');
          navigate(`/student/exam/${examId}/complete`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examId, navigate, showAlert]);

  // Initialize TensorFlow.js and start violation detection
  useEffect(() => {
    const initTF = async () => {
      try {
        await tf.ready();
        console.log("TensorFlow.js initialized");
        
        // In a real implementation, we would load a YOLOv8 model here
        // For demo purposes, we'll use our mock detection function
        
        // Start periodic violation detection
        detectionIntervalRef.current = window.setInterval(() => {
          if (webcamRef.current?.video) {
            const violation = mockDetectViolations(webcamRef.current.video);
            
            if (violation && violation !== 'none') {
              let message = '';
              
              switch (violation) {
                case 'phone':
                  message = 'Phone detected in camera view';
                  break;
                case 'multiple_faces':
                  message = 'Multiple faces detected';
                  break;
                case 'no_face':
                  message = 'Your face is not visible';
                  break;
                default:
                  return; // No violation
              }
              
              // Add new violation
              setViolations(prev => [message, ...prev]);
              setViolationCount(prev => prev + 1);
              showAlert(message, 'warning');
              
              // If too many violations, auto-submit
              if (violationCount >= 5) {
                showAlert('Too many violations detected. Exam will be submitted.', 'error');
                setTimeout(() => {
                  navigate(`/student/exam/${examId}/complete`);
                }, 3000);
              }
            }
          }
        }, 15000); // Check every 15 seconds
      } catch (error) {
        console.error("Error initializing TensorFlow.js:", error);
      }
    };
    
    initTF();
    
    return () => {
      if (detectionIntervalRef.current !== null) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [examId, navigate, showAlert, violationCount]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main exam content - 3/4 width on large screens */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Exam header */}
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-xl font-semibold">{examData.title}</h1>
            <p className="text-sm">{examData.course}</p>
          </div>
          
          {/* Question navigator */}
          <div className="border-b border-gray-200 p-4 bg-gray-50 flex flex-wrap gap-2">
            {examData.questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium 
                  ${currentQuestion === index ? 'bg-blue-600 text-white' : 
                    answers[question.id] ? 'bg-green-100 text-green-800 border border-green-300' : 
                    'bg-white text-gray-700 border border-gray-300'}`}
              >
                {question.id}
              </button>
            ))}
          </div>
          
          {/* Current question */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Question {examData.questions[currentQuestion].id} of {examData.questions.length}
              </h2>
              {isFlagged ? (
                <button 
                  onClick={toggleFlagQuestion}
                  className="flex items-center text-amber-600 hover:text-amber-700"
                >
                  <Flag size={16} className="mr-1 fill-current" />
                  <span className="text-sm">Flagged</span>
                </button>
              ) : (
                <button 
                  onClick={toggleFlagQuestion}
                  className="flex items-center text-gray-500 hover:text-amber-600"
                >
                  <Flag size={16} className="mr-1" />
                  <span className="text-sm">Flag for review</span>
                </button>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-900 mb-4">{examData.questions[currentQuestion].text}</p>
              
              <div className="space-y-3">
                {examData.questions[currentQuestion].options.map((option) => (
                  <label 
                    key={option.id} 
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${answers[examData.questions[currentQuestion].id] === option.id ? 
                        'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'}`}
                  >
                    <input
                      type="radio"
                      name={`question-${examData.questions[currentQuestion].id}`}
                      value={option.id}
                      checked={answers[examData.questions[currentQuestion].id] === option.id}
                      onChange={() => handleAnswerSelect(examData.questions[currentQuestion].id, option.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-900">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Question navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => goToQuestion('prev')}
                disabled={currentQuestion === 0}
                className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium 
                ${currentQuestion === 0 ? 
                  'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 
                  'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              
              <button
                onClick={() => {
                  // Auto-save answer
                  if (answers[examData.questions[currentQuestion].id]) {
                    showAlert('Answer saved', 'success');
                  }
                }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium bg-white text-gray-700 hover:bg-gray-50"
              >
                <Save size={16} className="mr-1" />
                Save
              </button>
              
              {currentQuestion === examData.questions.length - 1 ? (
                <button
                  onClick={handleSubmitExam}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                >
                  <CheckCircle size={16} className="mr-1" />
                  Submit Exam
                </button>
              ) : (
                <button
                  onClick={() => goToQuestion('next')}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar - 1/4 width */}
      <div className="lg:col-span-1 space-y-6">
        {/* Webcam feed */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-medium text-gray-900">Proctoring Camera</h2>
          </div>
          <div className="aspect-video bg-gray-900 relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
              <div className="bg-red-600 h-2 w-2 rounded-full animate-pulse"></div>
              <span className="text-white text-xs bg-black bg-opacity-50 px-2 py-0.5 rounded">Recording</span>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border-t border-blue-100 text-sm text-blue-700">
            Keep your face visible in the camera at all times
          </div>
        </div>
        
        {/* Exam progress */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <h2 className="font-medium text-gray-900 mb-3">Exam Progress</h2>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-500">Answered</span>
              <span className="font-medium">{Object.keys(answers).length} of {examData.questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(Object.keys(answers).length / examData.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Timer */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <h2 className="font-medium text-gray-900 mb-2">Time Remaining</h2>
            <div className="text-2xl font-mono font-semibold text-center py-2">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        
        {/* AI Warnings */}
        {violations.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-3 border-b border-amber-100 bg-amber-50 flex items-center">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
              <h2 className="font-medium text-amber-800">Proctoring Alerts</h2>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {violations.map((violation, index) => (
                <div key={index} className="p-3 border-b border-gray-100 text-sm">
                  <p className="text-gray-900">{violation}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamInterface;