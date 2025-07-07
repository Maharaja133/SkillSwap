export default function NotFound() {
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white p-6 text-center">
  <div className="max-w-md mx-auto">
    <div className="relative">
      <h1 className="text-9xl font-bold text-gray-300 opacity-30">404</h1>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">Page Not Found</h2>
      </div>
    </div>

    <p className="text-xl text-gray-600 mt-6 mb-8">
      Oops! The page you're looking for doesn't exist or has been moved.
    </p>

    <div className="mb-8">
      <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z" fill="#F3F4F6"/>
        <path d="M100 50L50 150H150L100 50Z" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
        <path d="M100 70L60 150H140L100 70Z" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="2"/>
        <circle cx="100" cy="100" r="30" fill="#F9FAFB" stroke="#9CA3AF" strokeWidth="2"/>
        <circle cx="100" cy="100" r="10" fill="#9CA3AF"/>
        <path d="M70 70L30 30M130 70L170 30" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Go Back
      </button>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Return Home
      </button>
    </div>
  </div>
</div>
  );
}
