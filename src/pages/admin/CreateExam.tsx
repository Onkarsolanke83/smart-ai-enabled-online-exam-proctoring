import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Clock, Calendar, Users, Save, 
  Plus, Trash2, AlertTriangle 
} from 'lucide-react';
import { useAlert } from '../../context/AlertContext';

const CreateExam = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  
  const [examData, setExamData] = useState({
    title: '',
    course: '',
    duration: '',
    date: '',
    startTime: '',
    totalMarks: '',
    passingMarks: '',
    instructions: '',
    sections: [
      {
        title: 'Section 1',
        questions: [
          { type: 'multiple_choice', question: '', options: ['', '', '', ''], answer: '', marks: '' }
        ]
      }
    ]
  });

  const addSection = () => {
    setExamData(prev => ({
      ...prev,
      sections: [...prev.sections, {
        title: `Section ${prev.sections.length + 1}`,
        questions: [
          { type: 'multiple_choice', question: '', options: ['', '', '', ''], answer: '', marks: '' }
        ]
      }]
    }));
  };

  const addQuestion = (sectionIndex: number) => {
    const newSections = [...examData.sections];
    newSections[sectionIndex].questions.push(
      { type: 'multiple_choice', question: '', options: ['', '', '', ''], answer: '', marks: '' }
    );
    setExamData({ ...examData, sections: newSections });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showAlert('Exam created successfully!', 'success');
    navigate('/admin/exams');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
          <p className="text-gray-600">Set up a new proctored examination</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Exam Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={examData.title}
                onChange={(e) => setExamData({ ...examData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={examData.course}
                onChange={(e) => setExamData({ ...examData, course: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={examData.duration}
                onChange={(e) => setExamData({ ...examData, duration: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={examData.date}
                onChange={(e) => setExamData({ ...examData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={examData.startTime}
                onChange={(e) => setExamData({ ...examData, startTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Marks</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={examData.totalMarks}
                onChange={(e) => setExamData({ ...examData, totalMarks: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Exam Instructions</h2>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter exam instructions..."
            value={examData.instructions}
            onChange={(e) => setExamData({ ...examData, instructions: e.target.value })}
          ></textarea>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {examData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                <button
                  type="button"
                  onClick={() => addQuestion(sectionIndex)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                  <Plus size={16} className="mr-1" />
                  Add Question
                </button>
              </div>

              <div className="space-y-6">
                {section.questions.map((question, questionIndex) => (
                  <div key={questionIndex} className="border rounded-lg p-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Question</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Enter question..."
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <label className="block text-sm font-medium text-gray-700">
                            Option {optionIndex + 1}
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Correct Answer
                        </label>
                        <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                          <option value="">Select correct option</option>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                          <option value="4">Option 4</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Marks
                        </label>
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter marks"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addSection}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus size={16} className="mr-1" />
            Add Section
          </button>

          <div className="space-x-3">
            <button
              type="button"
              onClick={() => navigate('/admin/exams')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save size={16} className="mr-1" />
              Create Exam
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;