'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function ResearchPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text')
  const [companyName, setCompanyName] = useState('')
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!companyName.trim()) {
      setError('Please enter a company name')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        'https://n8n.srv812138.hstgr.cloud/webhook/chat_webhook',
        { company_name: companyName },
        { headers: { 'Content-Type': 'application/json' } }
      )

      // Handle array or object response
      let responseData = response.data
      
      // If response is an array, extract Issues and merge other data
      if (Array.isArray(responseData)) {
        if (responseData.length > 0) {
          // Extract Issues (if Issue and Problem_pain_points exist)
          const issues = responseData
            .filter(item => item.Issue || item.Problem_pain_points)
            .map(item => ({
              Issue: item.Issue,
              Problem_pain_points: item.Problem_pain_points
            }))
          
          // Take first item as base data and add Issues array
          responseData = {
            ...responseData[0],
            Issues: issues.length > 0 ? issues : undefined
          }
        } else {
          responseData = responseData[0]
        }
      }

      // Store result in localStorage
      const result = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: 'text',
        query: companyName,
        data: responseData
      }
      
      const history = JSON.parse(localStorage.getItem('researchHistory') || '[]')
      history.unshift(result)
      localStorage.setItem('researchHistory', JSON.stringify(history))
      localStorage.setItem('currentResult', JSON.stringify(result))

      router.push('/results')
    } catch (err: any) {
      // Log error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Webhook Error:', err)
      }
      
      // Handle different error types
      let errorMessage = 'Failed to fetch company data. Please try again.'
      
      if (err.response) {
        // Server responded with error status
        const status = err.response.status
        const data = err.response.data
        
        if (status === 400) {
          errorMessage = `Bad Request: ${data?.message || data?.error || 'Invalid company name or request format'}`
        } else if (status === 404) {
          errorMessage = `Not Found: ${data?.message || 'Webhook endpoint not found or company data unavailable'}`
        } else if (status === 500) {
          errorMessage = `Server Error: ${data?.message || data?.error || 'The webhook server encountered an error processing your request'}`
        } else if (status === 503) {
          errorMessage = 'Service Unavailable: The webhook service is temporarily unavailable. Please try again later.'
        } else {
          errorMessage = data?.message || data?.error || `Error ${status}: ${err.response.statusText || 'Unknown error occurred'}`
        }
      } else if (err.request) {
        // Request made but no response received
        errorMessage = 'Network Error: Unable to reach the webhook server. Please check your internet connection and try again.'
      } else {
        // Something else happened
        errorMessage = err.message || 'An unexpected error occurred. Please try again.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!frontImage && !backImage) {
      setError('Please upload at least one image')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      if (frontImage) formData.append('front_image', frontImage)
      if (backImage) formData.append('back_image', backImage)

      const response = await axios.post(
        'https://n8n.srv812138.hstgr.cloud/webhook/image_send',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      // Handle array or object response
      let responseData = response.data
      
      // If response is an array, extract Issues and merge other data
      if (Array.isArray(responseData)) {
        if (responseData.length > 0) {
          // Extract Issues (if Issue and Problem_pain_points exist)
          const issues = responseData
            .filter(item => item.Issue || item.Problem_pain_points)
            .map(item => ({
              Issue: item.Issue,
              Problem_pain_points: item.Problem_pain_points
            }))
          
          // Take first item as base data and add Issues array
          responseData = {
            ...responseData[0],
            Issues: issues.length > 0 ? issues : undefined
          }
        } else {
          responseData = responseData[0]
        }
      }

      // Store result in localStorage
      const result = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: 'image',
        query: `${frontImage?.name || ''} ${backImage?.name || ''}`.trim(),
        data: responseData
      }
      
      const history = JSON.parse(localStorage.getItem('researchHistory') || '[]')
      history.unshift(result)
      localStorage.setItem('researchHistory', JSON.stringify(history))
      localStorage.setItem('currentResult', JSON.stringify(result))

      router.push('/results')
    } catch (err: any) {
      // Log error for debugging
      if (process.env.NODE_ENV === 'development') {
        console.error('Webhook Error:', err)
      }
      
      // Handle different error types
      let errorMessage = 'Failed to process images. Please try again.'
      
      if (err.response) {
        // Server responded with error status
        const status = err.response.status
        const data = err.response.data
        
        if (status === 400) {
          errorMessage = `Bad Request: ${data?.message || data?.error || 'Invalid image format or request'}`
        } else if (status === 404) {
          errorMessage = `Not Found: ${data?.message || 'Webhook endpoint not found'}`
        } else if (status === 413) {
          errorMessage = 'File Too Large: The uploaded images are too large. Please use smaller files.'
        } else if (status === 415) {
          errorMessage = 'Unsupported Media Type: Please upload valid image files (JPG, PNG, etc.)'
        } else if (status === 500) {
          errorMessage = `Server Error: ${data?.message || data?.error || 'The webhook server encountered an error processing your images'}`
        } else if (status === 503) {
          errorMessage = 'Service Unavailable: The webhook service is temporarily unavailable. Please try again later.'
        } else {
          errorMessage = data?.message || data?.error || `Error ${status}: ${err.response.statusText || 'Unknown error occurred'}`
        }
      } else if (err.request) {
        // Request made but no response received
        errorMessage = 'Network Error: Unable to reach the webhook server. Please check your internet connection and try again.'
      } else {
        // Something else happened
        errorMessage = err.message || 'An unexpected error occurred. Please try again.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'front') setFrontImage(file)
      else setBackImage(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <h1 
            className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer"
            onClick={() => router.push('/')}
          >
            Company Research
          </h1>
          <button
            onClick={() => router.push('/history')}
            className="px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden sm:inline">History</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-3">Get Company Data</h2>
          <p className="text-sm sm:text-base text-gray-600">Choose your preferred research method</p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              activeTab === 'text'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📝 Text Search
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
              activeTab === 'image'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🖼️ Image Upload
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-lg animate-fadeIn">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="font-semibold text-red-800 mb-1">Webhook Error</h4>
                <p className="text-red-700 text-sm leading-relaxed">{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-400 hover:text-red-600 transition-colors"
                aria-label="Close error"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Text Form */}
        {activeTab === 'text' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            <form onSubmit={handleTextSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name (e.g., Apple, Google, Tesla)"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Company...
                  </span>
                ) : (
                  'Send to Webhook'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Image Form */}
        {activeTab === 'image' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            <form onSubmit={handleImageSubmit}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Front Image */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Front Card Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'front')}
                      className="hidden"
                      id="front-image"
                      disabled={loading}
                    />
                    <label htmlFor="front-image" className="cursor-pointer">
                      {frontImage ? (
                        <div>
                          <div className="text-4xl mb-2">✓</div>
                          <p className="text-sm text-gray-600">{frontImage.name}</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-4xl mb-2">📷</div>
                          <p className="text-gray-600">Click to upload</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Back Image */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">
                    Back Card Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'back')}
                      className="hidden"
                      id="back-image"
                      disabled={loading}
                    />
                    <label htmlFor="back-image" className="cursor-pointer">
                      {backImage ? (
                        <div>
                          <div className="text-4xl mb-2">✓</div>
                          <p className="text-sm text-gray-600">{backImage.name}</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-4xl mb-2">📷</div>
                          <p className="text-gray-600">Click to upload</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6 text-center">
                * You can upload one or both images
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-lg hover:shadow-xl transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Images...
                  </span>
                ) : (
                  'Send to Webhook'
                )}
              </button>
            </form>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your data is processed securely and instantly</p>
        </div>
      </main>
    </div>
  )
}

