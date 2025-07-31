import React from "react";
import Auth from "../components/Auth";

const textGradientStyle = {
  background: 'linear-gradient(to right, #6366F1, #8B5CF6, #EC4899)', 
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

function Home({ onLogin }) {
  return (
    // Ensure this outermost div covers the entire viewport with a pure black background
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black p-4">
      <div className="container mx-auto max-w-6xl py-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl leading-tight font-extrabold md:text-6xl" style={textGradientStyle}>
            Showcase Your <br />
            Developer Projects
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300 opacity-90 md:text-2xl">
            Connect with developers, share your work, and get valuable feedback
            from the community.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="flex flex-col items-center rounded-xl bg-gray-800/50 p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-700/60 border border-gray-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Showcase Projects
            </h3>
            <p className="text-lg text-gray-300">
              Display your best work with descriptions, links, and tech stacks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center rounded-xl bg-gray-800/50 p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-700/60 border border-gray-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
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
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Get Feedback
            </h3>
            <p className="text-lg text-gray-300">
              Receive constructive comments and suggestions from other
              developers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center rounded-xl bg-gray-800/50 p-8 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gray-700/60 border border-gray-700">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg">
              <svg
                className="h-8 w-8 text-white"
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
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Discover & Connect
            </h3>
            <p className="text-lg text-gray-300">
              Find inspiring projects and connect with like-minded developers.
            </p>
          </div>
        </div>

        {/* Authentication Section */}
        <div className="mx-auto max-w-md">
          <Auth onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
}

export default Home;