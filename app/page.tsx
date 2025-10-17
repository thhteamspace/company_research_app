'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleStartResearch = () => {
    router.push('/research')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="text-center animate-fadeIn max-w-6xl mx-auto w-full">
        {/* Logo/Title Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Company Research
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className="mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            Advanced Company Intelligence Platform
          </p>
          <p className="text-sm sm:text-md text-gray-500 mt-3 sm:mt-4">
            Unlock comprehensive insights about any company with our AI-powered research tool
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-4">
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔍</div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Deep Analysis</h3>
            <p className="text-xs sm:text-sm text-gray-600">Comprehensive company data and insights</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Visual Reports</h3>
            <p className="text-xs sm:text-sm text-gray-600">Beautiful, organized data visualization</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Fast Results</h3>
            <p className="text-xs sm:text-sm text-gray-600">Get instant company intelligence</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartResearch}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden w-full sm:w-auto max-w-xs mx-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            Start Research
            <svg 
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Footer Note */}
        <p className="mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 px-4">
          Powered by AI • Secure • Professional
        </p>
      </div>
    </main>
  )
}

