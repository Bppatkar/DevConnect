import React from "react";
import Auth from "../components/Auth";

function Home({ onLogin }) {
  return (
    <div className="from-primary to-accent-teal flex min-h-screen flex-col items-center justify-center bg-gradient-to-br p-4">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-16 text-center">
          <h1 className="text-text-white mb-6 text-5xl leading-tight font-extrabold md:text-6xl">
            Showcase Your <br />
            <span className="text-light-background mt-2 block">
              Developer Projects
            </span>
          </h1>
          <p className="text-light-background mx-auto mb-8 max-w-2xl text-xl opacity-90 md:text-2xl">
            Connect with developers, share your work, and get valuable feedback
            from the community.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="bg-dark-secondary flex flex-col items-center rounded-xl p-8 text-center shadow-lg">
            <div className="bg-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-md">
              <svg
                className="text-text-white h-8 w-8"
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
            <h3 className="text-text-white mb-2 text-2xl font-semibold">
              Showcase Projects
            </h3>
            <p className="text-light-background text-lg opacity-80">
              Display your best work with descriptions, links, and tech stacks.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-dark-secondary flex flex-col items-center rounded-xl p-8 text-center shadow-lg">
            <div className="bg-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-md">
              <svg
                className="text-text-white h-8 w-8"
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
            <h3 className="text-text-white mb-2 text-2xl font-semibold">
              Get Feedback
            </h3>
            <p className="text-light-background text-lg opacity-80">
              Receive constructive comments and suggestions from other
              developers.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-dark-secondary flex flex-col items-center rounded-xl p-8 text-center shadow-lg">
            <div className="bg-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-md">
              <svg
                className="text-text-white h-8 w-8"
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
            <h3 className="text-text-white mb-2 text-2xl font-semibold">
              Discover & Connect
            </h3>
            <p className="text-light-background text-lg opacity-80">
              Find inspiring projects and connect with like-minded developers.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-md">
          <Auth onLogin={onLogin} />
        </div>
      </div>
    </div>
  );
}

export default Home;
