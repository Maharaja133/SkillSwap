import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900 flex flex-col">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 flex justify-between items-center p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">SkillSwap</h1>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Login</Link>
          <Link to="/register" className="relative px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </Link>
        </div>
      </header>

      <main className="flex-1 min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">
        <div className="max-w-4xl">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-1 bg-blue-100 rounded-lg blur opacity-75 animate-pulse"></div>
            <span className="relative px-4 py-2 bg-white rounded-lg text-blue-600 font-medium shadow-sm">
              Beta Now Live!
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-blue-600">
            Learn. Teach. <span className="whitespace-nowrap">Grow Together.</span>
          </h2>
          
          <p className="text-xl sm:text-2xl mb-8 text-gray-600 leading-relaxed ">
            Connect with passionate mentors and learners worldwide through personalize skill exchange sessions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 overflow-hidden group">
              <span className="relative z-10">Start Swapping Skills — It's free</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
          
          <div className="mt-12 relative">
          </div>
        </div>
      </main>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Why SkillSwap Works</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The perfect platform for reciprocal learning and teaching</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Peer Learning Network</h4>
              <p className="text-gray-600">Connect with like-minded individuals who want to learn what you know and teach what you need.</p>
            </div>
            
            <div className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Flexible Scheduling</h4>
              <p className="text-gray-600">Our smart calendar system finds perfect time slots that work for both you and your learning partner.</p>
            </div>
            
            <div className="bg-gradient-to-b from-white to-blue-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3">Integrated Tools</h4>
              <p className="text-gray-600">Video calls, screen sharing, chat, and progress tracking - all in one place for seamless learning.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Your SkillSwap Journey?</h3>
          <p className="text-xl mb-8 opacity-90">Join thousands of learners and teachers exchanging knowledge right now.</p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-bold">SkillSwap</h1>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
