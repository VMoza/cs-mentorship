import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SampleQuestionsPage from './pages/SampleQuestionsPage';
import Login from './components/LoginSignup';
import SubscriptionPage from './pages/SubscriptionPage';
import ConsultationsPage from './pages/ConsultationsPage'; // Import the new page
import React from 'react';
import ConsultationSuccessPage from './pages/ConsultationSuccessPage';
import ConsultationCancelPage from './pages/ConsultationCancelPage';
import ResourcesPage from './pages/ResourcesPage';  // Import the new page

// Inside your routes:



function App() {
  return (
    <Router>
      <Routes>
        {/* Open Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginsignup" element={<Login />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route path="/consultations" element={<ConsultationsPage />} /> {/* New route */}
        <Route path="/resources" element={<ResourcesPage />} />

        {/* Sample Questions Route is now open */}
        <Route path="/sample-questions" element={<SampleQuestionsPage />} />
        <Route path="/consultations/success" element={<ConsultationSuccessPage />} />
        <Route path="/consultations/cancel" element={<ConsultationCancelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
