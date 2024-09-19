import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  // Import the Navbar

const testimonials = [
  { text: "This platform helped me land a job at Google!", author: "Google Engineer" },
  { text: "The resources here were crucial for me to ace my interviews at Amazon.", author: "Amazon Engineer" },
  { text: "I got amazing referrals through cs-mentor, and it made all the difference at Facebook.", author: "Facebook Engineer" },
  { text: "Thanks to cs-mentor, I could organize my job hunt and get my dream role at Microsoft.", author: "Microsoft Engineer" },
  { text: "The mock interview questions were top-notch and helped me secure a job at Apple.", author: "Apple Engineer" },
  { text: "Without cs-mentor's structured approach, I wouldn't have made it to LinkedIn.", author: "LinkedIn Engineer" },
  { text: "The system design materials were key in nailing my interviews at Netflix.", author: "Netflix Engineer" },
  { text: "I got great guidance on how to prepare for technical interviews at Uber.", author: "Uber Engineer" },
  { text: "The resume building tips helped me stand out to recruiters at Twitter.", author: "Twitter Engineer" },
  { text: "I highly recommend cs-mentor for anyone serious about getting into tech.", author: "Airbnb Engineer" }
];

const LandingPage = () => {

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
<header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-40">
  <h1 className="text-6xl font-extrabold mb-6 tracking-tight">Level Up Your CS/DS Recruitment</h1>
  <p className="text-xl font-light mb-8">Helping CS & Data Science students land their dream jobs.</p>
  <a href="/sample-questions" className="bg-white text-blue-600 hover:text-blue-800 py-3 px-10 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
    Explore Sample Questions
  </a>
</header>


        {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Personalized Guidance</h3>
              <p className="text-gray-600">
                Get step-by-step mentorship tailored to your unique job-seeking needs.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Industry Insights</h3>
              <p className="text-gray-600">
                Learn what top tech companies are looking for from experts in the field.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-gray-600">
                Join a community of like-minded individuals to help each other succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 1: Job Tracker</h3>
              <p>Keep track of all your applications using our tailored job tracker.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 2: LinkedIn Referrals</h3>
              <p>Leverage your network to get high-quality referrals.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 3: Resume Building</h3>
              <p>Craft a resume that stands out to recruiters and hiring managers.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 4: Mass Applying</h3>
              <p>Learn strategies to apply to multiple companies without burning out.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md md:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Step 5: Interview Prep</h3>
              <p>Get access to system design questions, coding concepts, and mock interviews to ace the technical rounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Community Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Join the cs-mentor Community</h2>
          <p className="text-lg mb-8">
            Get exclusive access to resources, mentorship, and updates straight to your inbox.
          </p>
          <a
            href="#"
            className="bg-white text-purple-600 hover:text-purple-800 py-3 px-10 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            Join Now
          </a>
        </div>
      </section>

      {/* Scrolling Testimonials Section */}
      <section className="py-12 bg-white text-center">
  <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
  <div className="overflow-hidden relative">
    <div className="flex space-x-4 animate-scroll pl-6"> {/* Adjusted space-x to 4 for tighter spacing */}
      {testimonials.concat(testimonials).map((testimonial, index) => (
        <div 
          key={index}
          className="min-w-[300px] bg-white p-6 shadow-xl rounded-lg transform transition-transform hover:-translate-y-1 hover:shadow-2xl mb-6"
        >
          <p className="italic mb-4">"{testimonial.text}"</p>
          <p className="mt-4 font-bold">{testimonial.author}</p>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
};

export default LandingPage;
