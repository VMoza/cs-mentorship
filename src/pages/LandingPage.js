import React from 'react';
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
    <div className="overflow-hidden"> {/* Prevents horizontal scrolling */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20 md:py-40">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Level Up Your CS/DS Recruitment</h1>
        <p className="text-lg md:text-xl font-light mb-8">Helping CS & Data Science students land their dream jobs.</p>
        <a href="/sample-questions" className="bg-white text-blue-600 hover:text-blue-800 py-3 px-6 md:px-10 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:bg-glow">
          Explore Sample Questions
        </a>
      </header>

      {/* Logos of Tech Companies */}
      <section className="py-12 bg-white text-center"> {/* Changed bg-gray-100 to bg-white */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Engineers at</h2> {/* Changed to h2 and updated font size */}
        <div className="flex justify-center items-center space-x-8 md:space-x-12 lg:space-x-16 max-w-full overflow-x-auto"> {/* Adjust spacing based on screen size */}
          {/* Logos */}
          {['google', 'amazon', 'meta', 'msft'].map((logo, index) => (
            <div key={index} className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 flex items-center justify-center"> {/* Adjust size based on screen size */}
              <img
                src={`/imgs/${logo}-logo.png`}
                alt={`${logo} company logo`}
                className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out transform hover:scale-125 hover:z-10"
              />
            </div>
          ))}
        </div>
      </section>


      {/* Separator Line */}
      <hr className="border-t border-black mx-4" /> {/* Thin black line with horizontal margins */}

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white"> {/* Changed bg-gray-50 to bg-white */}
        <div className="container mx-auto text-center max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us?</h2> {/* Changed to h2 and updated font size */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
              <h3 className="text-xl font-semibold mb-4 group-hover:text-white">
                Personalized Guidance
              </h3>
              <p className="text-gray-600 group-hover:text-white">
                Get step-by-step mentorship tailored to your unique job-seeking needs.
              </p>
            </div>
            <div className="card group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
              <h3 className="text-xl font-semibold mb-4 group-hover:text-white">
                Industry Insights
              </h3>
              <p className="text-gray-600 group-hover:text-white">
                Learn what top tech companies are looking for from experts in the field.
              </p>
            </div>
            <div className="card group p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500">
              <h3 className="text-xl font-semibold mb-4 group-hover:text-white">
                Community Support
              </h3>
              <p className="text-gray-600 group-hover:text-white">
                Join a community of like-minded individuals to help each other succeed.
              </p>
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
            className="bg-white text-purple-600 hover:text-purple-800 py-3 px-10 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out hover:bg-glow"
          >
            Join Now
          </a>
        </div>
      </section>

      {/* Scrolling Testimonials Section */}
      <section className="py-16 bg-white text-center"> {/* Increased py-12 to py-16 */}
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
        <div className="overflow-x-hidden relative"> {/* Ensure horizontal overflow is hidden but vertical is visible */}
          <div className="flex space-x-4 animate-scroll pl-6 pb-8">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div 
                key={index}
                className="min-w-[300px] bg-white p-6 shadow-xl rounded-lg transform transition-transform hover:-translate-y-1 hover:shadow-2xl mb-6"
                style={{ paddingTop: '20px', paddingBottom: '20px', marginTop: '10px', marginBottom: '10px', height: 'auto' }} // Ensure auto height
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
