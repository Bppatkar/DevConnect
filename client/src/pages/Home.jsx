import Auth from '../components/Auth';

function Home({ onLogin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">
              Showcase Your
              <span className="text-primary block">Developer Projects</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Connect with developers, share your work, and get valuable feedback from the community.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="card p-8 text-center">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Showcase Projects</h3>
              <p className="text-text-secondary">Display your best work with descriptions, links, and tech stacks.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-2 4H9a3 3 0 01-3-3V7a3 3 0 013-3h6a3 3 0 013 3v6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Feedback</h3>
              <p className="text-text-secondary">Receive constructive comments and suggestions from other developers.</p>
            </div>

            <div className="card p-8 text-center">
              <div className="w-12 h-12 bg-primary-dark rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover & Connect</h3>
              <p className="text-text-secondary">Find inspiring projects and connect with like-minded developers.</p>
            </div>
          </div>

          {/* Auth Section */}
          <div className="max-w-md mx-auto">
            <Auth onLogin={onLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;