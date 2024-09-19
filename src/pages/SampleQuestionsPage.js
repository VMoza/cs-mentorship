import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';  
import sampleQuestions from './QuestionsData';

const SampleQuestionsPage = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [completedParts, setCompletedParts] = useState([]);
  const [expandedParts, setExpandedParts] = useState([]);
  const [expandedHints, setExpandedHints] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
  const navigate = useNavigate();  

  // Check if the user is logged in when the component mounts
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from localStorage
  
      const response = await fetch('https://cs-mentor-worker.<your-subdomain>.workers.dev/check-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch auth status');
      }
  
      const data = await response.json();
  
      if (data.isAuthenticated) {
        console.log('User is logged in:', data.user);
        setIsAuthenticated(true); // Set your authentication state here
      } else {
        console.log('User is not logged in');
        setIsAuthenticated(false); // Set the state to unauthenticated
      }
    } catch (error) {
      console.error('Failed to fetch:', error);
      setIsAuthenticated(false); // Ensure this gets set on error
    }
  };
  

useEffect(() => {
  checkAuthStatus();
}, []);

  

  const handleQuestionClick = (index) => {
    setSelectedQuestionIndex(index);
    setCompletedParts([]); 
    setExpandedParts([]);   
    setExpandedHints([]);   
  };

  const handleCompletePart = (partIndex) => {
    const updatedCompletedParts = completedParts.includes(partIndex)
      ? completedParts.filter(i => i !== partIndex)
      : [...completedParts, partIndex];
    setCompletedParts(updatedCompletedParts);
  };

  const toggleSolution = (partIndex) => {
    const updatedExpandedParts = expandedParts.includes(partIndex)
      ? expandedParts.filter(i => i !== partIndex)
      : [...expandedParts, partIndex];
    setExpandedParts(updatedExpandedParts);
  };

  const toggleHint = (partIndex) => {
    const updatedExpandedHints = expandedHints.includes(partIndex)
      ? expandedHints.filter(i => i !== partIndex)
      : [...expandedHints, partIndex];
    setExpandedHints(updatedExpandedHints);
  };

  const question = sampleQuestions[selectedQuestionIndex];
  const progressPercentage = (completedParts.length / question.parts.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar: List of questions */}
        <div className="w-full md:w-1/4 bg-gray-50 p-6 shadow-lg h-full border-r-2 border-gray-200 mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Questions</h2>
          <ul>
            {sampleQuestions.map((question, index) => (
              <li
                key={index}
                onClick={() => handleQuestionClick(index)}
                className={`cursor-pointer p-3 mb-2 rounded-lg hover:bg-gray-200 relative ${
                  index === selectedQuestionIndex ? 'bg-blue-100 font-bold' : 'bg-white'
                }`}
              >
                {question.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Content: Display the selected question or lock prompt */}
        <div className="w-full md:w-3/4 p-6 relative">
          {!isAuthenticated && question.locked ? (
            <>
              {/* Blurred Question Content */}
              <div className="blur-md">
                <h1 className="text-4xl font-bold mb-8">{question.title}</h1>
                {question.parts.map((part, index) => (
                  <div key={index} className="mb-8 bg-white p-6 shadow-lg rounded-lg">
                    <p className="text-lg font-medium">{`Part ${index + 1}: ${part.question}`}</p>
                  </div>
                ))}
              </div>

              {/* Locked Overlay */}
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
                <div className="text-center p-8 rounded-lg bg-gray-100 shadow-lg">
                  <div className="text-6xl mb-4 text-blue-500">&#x1f512;</div>
                  <h2 className="text-3xl font-bold mb-4">
                    This Question is Locked
                  </h2>
                  <p className="text-lg mb-6">
                    Subscribe to unlock this question and access 100+ more. Unlock your full potential with cs-mentor!
                  </p>
                  <button
                    onClick={() => navigate('/loginsignup')}  // Redirect to login/signup page
                    className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-8">{question.title}</h1>

              {/* Progress bar */}
              <div className="relative w-full bg-gray-200 rounded-full h-6 mb-6">
                <div
                  className={`absolute top-0 left-0 h-6 rounded-full transition-all duration-500 ease-in-out ${
                    progressPercentage === 100 ? 'bg-green-500 animate-pulse' : 'bg-blue-600'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
                <span className="absolute w-full text-center text-white font-bold">
                  {Math.round(progressPercentage)}%
                </span>
              </div>

              {question.parts.map((part, index) => (
                <div key={index} className="mb-8 bg-white p-6 shadow-lg rounded-lg">
                  <div className="flex items-center mb-4">
                    {/* Circular checkbox for completion */}
                    <input
                      type="checkbox"
                      className="h-5 w-5 mr-4 cursor-pointer"
                      checked={completedParts.includes(index)}
                      onChange={() => handleCompletePart(index)}
                    />
                    <p className="text-lg font-medium">{`Part ${index + 1}: ${part.question}`}</p>
                  </div>

                  {/* View Hint Button */}
                  <p
                    className="text-blue-600 cursor-pointer mb-4"
                    onClick={() => toggleHint(index)}
                  >
                    {expandedHints.includes(index) ? "Hide Hint" : "View Hint"}
                  </p>

                  {/* Hint */}
                  {expandedHints.includes(index) && (
                    <p className="text-sm text-gray-600 mb-4">{part.hint}</p>
                  )}

                  {/* View Solution Button */}
                  <p
                    className="text-blue-600 cursor-pointer"
                    onClick={() => toggleSolution(index)}
                  >
                    {expandedParts.includes(index) ? "Hide Solution" : "View Solution"}
                  </p>

                  {/* Solution */}
                  {expandedParts.includes(index) && (
                    <p className="mt-2 text-gray-800">{part.solution}</p>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleQuestionsPage;
