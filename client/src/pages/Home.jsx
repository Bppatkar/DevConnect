
import React from 'react';
import Auth from '../components/Auth'; 

function Home({ onLogin }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary to-accent-teal p-4">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-white mb-6 leading-tight">
            Showcase Your <br />
            <span className="text-light-background block mt-2">Developer Projects</span>
          </h1>
          <p className="text-xl md:text-2xl text-light-background max-w-2xl mx-auto mb-8 opacity-90">
            Connect with developers, share your work, and get valuable
            feedback from the community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Feature Card 1 */}
          <div className="bg-dark-secondary rounded-xl p-8 shadow-lg text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-text-white">
              Showcase Projects
            </h3>
            <p className="text-lg text-light-background opacity-80">
              Display your best work with descriptions, links, and tech stacks.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-dark-secondary rounded-xl p-8 shadow-lg text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2 4H9a3 3 0 01-3-3V7a3 3 0 013-3h6a3 3 0 013 3v6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-text-white">
              Get Feedback
            </h3>
            <p className="text-lg text-light-background opacity-80">
              Receive constructive comments and suggestions from other
              developers.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-dark-secondary rounded-xl p-8 shadow-lg text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-text-white">
              Discover & Connect
            </h3>
            <p className="text-lg text-light-background opacity-80">
              Find inspiring projects and connect with like-minded
              developers.
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Auth onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
}

export default Home;
