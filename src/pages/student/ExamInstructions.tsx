import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Info, Lock, AlertTriangle } from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const ExamInstructions = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { showAlert } = useAlert();
  const [acceptedRules, setAcceptedRules] = useState(false);
  
  // Mock exam data
  const examData = {
    title: 'Advanced Mathematics',
    course: 'MATH-401',
    duration: '90 minutes',
    questions: 45,
    totalMarks: 100,
    passingMarks: 40,
    instructor: 'Dr. John Smith',
    date: 'July 15, 2025',
    time: '11:00 AM - 12:30 PM',
  };
  
  const rules = [
    'You must be alone in a quiet room during the entire exam.',
    'Your face must be clearly visible in the camera at all times.',
    'No headphones, earbuds, or any audio devices are allowed.',
    'No mobile phones or secondary devices are permitted.',
    'No taking screenshots, recording, or copying exam content.',
    'No leaving your seat during the exam. For emergencies, use the chat feature.',
    'No talking, whispering, or mouthing words.',
    'No other applications or browser tabs should be open except the exam.',
    'Proper lighting must be maintained throughout the exam period.'
  ];
  
  const handleContinue = () => {
    if (!acceptedRules) {
      showAlert('Please accept the exam rules to continue', 'warning');
      return;
    }
    
    navigate(`/student/exam/${examId}/system-check`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">{examData.title}</h1>
        <p className="mt-1">{examData.course}</p>
      </div>
      
      {/* Exam details */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Exam Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{examData.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-medium">{examData.time}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium">{examData.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Questions</p>
            <p className="font-medium">{examData.questions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Marks</p>
            <p className="font-medium">{examData.totalMarks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Passing Marks</p>
            <p className="font-medium">{examData.passingMarks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Instructor</p>
            <p className="font-medium">{examData.instructor}</p>
          </div>
        </div>
      </div>
      
      {/* Proctoring info */}
      <div className="p-6 bg-blue-50 border-b border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Info className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-base font-medium text-blue-800">AI Proctoring Information</h3>
            <p className="mt-2 text-sm text-blue-700">
              This exam is monitored by an AI proctor that will detect any violations of exam rules. 
              The system will require access to your webcam and microphone. Any suspicious activity 
              will be flagged and may result in exam disqualification.
            </p>
          </div>
        </div>
      </div>
      
      {/* Exam rules */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <Lock className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Exam Rules</h2>
        </div>
        
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{rule}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex items-start">
          <input
            id="accept-rules"
            name="accept-rules"
            type="checkbox"
            checked={acceptedRules}
            onChange={(e) => setAcceptedRules(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
          />
          <label htmlFor="accept-rules" className="ml-2 block text-sm text-gray-700">
            I have read and understood the exam rules and proctoring guidelines. I agree to follow
            them throughout the exam.
          </label>
        </div>
      </div>
      
      {/* Warning */}
      <div className="p-6 bg-amber-50 border-b border-amber-100">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-base font-medium text-amber-800">Important Notice</h3>
            <p className="mt-2 text-sm text-amber-700">
              Any violation of the exam rules may result in immediate disqualification. The AI proctoring
              system records the entire exam session, which may be reviewed later by the instructor.
              Ensure you have a stable internet connection before starting the exam.
            </p>
          </div>
        </div>
      </div>
      
      {/* Button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={handleContinue}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            !acceptedRules ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue to System Check
        </button>
      </div>
    </div>
  );
};

export default ExamInstructions;