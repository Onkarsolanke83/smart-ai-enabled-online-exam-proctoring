import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Camera, Mic, Monitor, Wifi, Check, X, AlertTriangle, Loader } from 'lucide-react';
import Webcam from 'react-webcam';
import { useAlert } from '../../context/AlertContext';

const SystemCheck = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { showAlert } = useAlert();
  const webcamRef = useRef<Webcam>(null);
  
  const [checks, setChecks] = useState({
    camera: { status: 'pending', message: 'Checking camera access...' },
    microphone: { status: 'pending', message: 'Checking microphone access...' },
    browser: { status: 'pending', message: 'Checking browser compatibility...' },
    internet: { status: 'pending', message: 'Checking internet connection...' },
    faceDetection: { status: 'pending', message: 'Checking face visibility...' }
  });
  
  const [isAllPassed, setIsAllPassed] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [faceDetected, setFaceDetected] = useState(false);

  // Simulate system checks
  useEffect(() => {
    const runChecks = async () => {
      // Check browser
      setTimeout(() => {
        setChecks(prev => ({
          ...prev,
          browser: { 
            status: 'success', 
            message: 'Browser is compatible' 
          }
        }));
      }, 1000);
      
      // Check internet
      setTimeout(() => {
        setChecks(prev => ({
          ...prev,
          internet: { 
            status: 'success', 
            message: 'Internet connection is stable' 
          }
        }));
      }, 2000);
      
      // Check camera (will be set by webcam component)
      
      // Check microphone
      setTimeout(() => {
        setChecks(prev => ({
          ...prev,
          microphone: { 
            status: 'success', 
            message: 'Microphone is working properly' 
          }
        }));
      }, 3000);
      
      // Check face detection
      setTimeout(() => {
        if (faceDetected) {
          setChecks(prev => ({
            ...prev,
            faceDetection: { 
              status: 'success', 
              message: 'Face detected successfully' 
            }
          }));
        } else {
          setChecks(prev => ({
            ...prev,
            faceDetection: { 
              status: 'error', 
              message: 'Please center your face in the camera view' 
            }
          }));
        }
        setIsChecking(false);
      }, 5000);
    };
    
    runChecks();
  }, [faceDetected]);

  // Update isAllPassed when checks change
  useEffect(() => {
    const allPassed = Object.values(checks).every(check => check.status === 'success');
    setIsAllPassed(allPassed);
  }, [checks]);

  // Handle webcam ready
  const handleWebcamReady = () => {
    setChecks(prev => ({
      ...prev,
      camera: { 
        status: 'success', 
        message: 'Camera is working properly' 
      }
    }));
    
    // Simulate face detection
    setTimeout(() => {
      setFaceDetected(true);
    }, 4000);
  };

  // Handle webcam error
  const handleWebcamError = () => {
    setChecks(prev => ({
      ...prev,
      camera: { 
        status: 'error', 
        message: 'Camera access denied or not available' 
      }
    }));
  };

  // Retry system check
  const handleRetry = () => {
    setIsChecking(true);
    setChecks({
      camera: { status: 'pending', message: 'Checking camera access...' },
      microphone: { status: 'pending', message: 'Checking microphone access...' },
      browser: { status: 'pending', message: 'Checking browser compatibility...' },
      internet: { status: 'pending', message: 'Checking internet connection...' },
      faceDetection: { status: 'pending', message: 'Checking face visibility...' }
    });
    
    // Restart the checks
    setTimeout(() => {
      handleWebcamReady();
    }, 1000);
  };

  const handleContinue = () => {
    if (!isAllPassed) {
      showAlert('Please resolve all system check issues before continuing', 'warning');
      return;
    }
    
    navigate(`/student/exam/${examId}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">System Check</h1>
        <p className="mt-1">Please complete the system check before starting your exam</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Camera Preview */}
          <div className="flex flex-col h-full">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Camera Preview</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden flex-grow relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                onUserMedia={handleWebcamReady}
                onUserMediaError={handleWebcamError}
                className="w-full h-full object-cover"
              />
              
              {/* Face detection guide overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`border-2 border-dashed rounded-full w-48 h-48 transition-colors ${
                  faceDetected ? 'border-green-400' : 'border-white'
                }`}></div>
              </div>
              
              {faceDetected && (
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
                  <Check size={12} className="mr-1" />
                  Face Detected
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Make sure your face is clearly visible in the camera.
            </p>
          </div>
          
          {/* System Checks */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-3">System Requirements</h2>
            <div className="space-y-4">
              {/* Camera Check */}
              <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  checks.camera.status === 'success' ? 'bg-green-100 text-green-600' :
                  checks.camera.status === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {checks.camera.status === 'success' ? <Check /> :
                   checks.camera.status === 'error' ? <X /> :
                   <Camera />}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium text-gray-900">Camera</p>
                  <p className="text-sm text-gray-500">{checks.camera.message}</p>
                </div>
                {checks.camera.status === 'pending' && <Loader className="animate-spin" size={18} />}
              </div>
              
              {/* Microphone Check */}
              <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  checks.microphone.status === 'success' ? 'bg-green-100 text-green-600' :
                  checks.microphone.status === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {checks.microphone.status === 'success' ? <Check /> :
                   checks.microphone.status === 'error' ? <X /> :
                   <Mic />}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium text-gray-900">Microphone</p>
                  <p className="text-sm text-gray-500">{checks.microphone.message}</p>
                </div>
                {checks.microphone.status === 'pending' && <Loader className="animate-spin" size={18} />}
              </div>
              
              {/* Browser Check */}
              <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  checks.browser.status === 'success' ? 'bg-green-100 text-green-600' :
                  checks.browser.status === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {checks.browser.status === 'success' ? <Check /> :
                   checks.browser.status === 'error' ? <X /> :
                   <Monitor />}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium text-gray-900">Browser</p>
                  <p className="text-sm text-gray-500">{checks.browser.message}</p>
                </div>
                {checks.browser.status === 'pending' && <Loader className="animate-spin" size={18} />}
              </div>
              
              {/* Internet Check */}
              <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  checks.internet.status === 'success' ? 'bg-green-100 text-green-600' :
                  checks.internet.status === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {checks.internet.status === 'success' ? <Check /> :
                   checks.internet.status === 'error' ? <X /> :
                   <Wifi />}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium text-gray-900">Internet Connection</p>
                  <p className="text-sm text-gray-500">{checks.internet.message}</p>
                </div>
                {checks.internet.status === 'pending' && <Loader className="animate-spin" size={18} />}
              </div>
              
              {/* Face Detection Check */}
              <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  checks.faceDetection.status === 'success' ? 'bg-green-100 text-green-600' :
                  checks.faceDetection.status === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {checks.faceDetection.status === 'success' ? <Check /> :
                   checks.faceDetection.status === 'error' ? <X /> :
                   <Camera />}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="font-medium text-gray-900">Face Detection</p>
                  <p className="text-sm text-gray-500">{checks.faceDetection.message}</p>
                </div>
                {checks.faceDetection.status === 'pending' && <Loader className="animate-spin" size={18} />}
              </div>
            </div>
          </div>
        </div>
        
        {!isAllPassed && !isChecking && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">System Check Issues</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <p>
                    Please fix the issues above before proceeding. Make sure:
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {checks.camera.status === 'error' && (
                      <li>Your camera is connected and you've allowed access.</li>
                    )}
                    {checks.microphone.status === 'error' && (
                      <li>Your microphone is connected and you've allowed access.</li>
                    )}
                    {checks.faceDetection.status === 'error' && (
                      <li>Your face is clearly visible in the center of the camera.</li>
                    )}
                    {checks.browser.status === 'error' && (
                      <li>You're using a supported browser (Chrome, Firefox, or Edge).</li>
                    )}
                    {checks.internet.status === 'error' && (
                      <li>Your internet connection is stable.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-end space-x-4">
          {!isChecking && !isAllPassed && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retry Check
            </button>
          )}
          
          <button
            onClick={handleContinue}
            disabled={!isAllPassed || isChecking}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (!isAllPassed || isChecking) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isChecking ? 'Checking...' : 'Start Exam'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemCheck;