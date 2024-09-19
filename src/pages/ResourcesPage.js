import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const steps = [
  {
    id: 1,
    title: "Step 1: Job Tracker",
    content: "Keep track of all your applications using our tailored job tracker.",
    buttonText: "Download Job Tracker",
  },
  {
    id: 2,
    title: "Step 2: LinkedIn Referrals",
    content: "Leverage your network to get high-quality referrals.",
  },
  {
    id: 3,
    title: "Step 3: Resume Building",
    content: "Craft a resume that stands out to recruiters and hiring managers.",
  },
  {
    id: 4,
    title: "Step 4: Mass Applying",
    content: "Learn strategies to apply to multiple companies without burning out.",
  },
  {
    id: 5,
    title: "Step 5: Interview Prep",
    content: "Get access to system design questions, coding concepts, and mock interviews to ace the technical rounds.",
  },
];

const ResourcesPage = () => {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="py-8 bg-white px-4 md:px-10"> {/* Reduced py-16 to py-8 */}
        {/* Step Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {steps.map(step => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step)}
              className={`px-4 py-2 rounded-full font-semibold text-center ${
                activeStep.id === step.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{activeStep.title}</h2>
          <p className="mb-6">{activeStep.content}</p>
          {activeStep.buttonText && (
            <a
              href="#"
              className="bg-purple-600 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:bg-purple-800"
            >
              {activeStep.buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
