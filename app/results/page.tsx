'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CompanyData {
  CompanyName?: string
  FoundedYear?: string
  Founders?: string
  CEO?: string
  Industry?: string
  Description?: string
  Revenue?: string
  Employees?: string
  ProductsServices?: string
  StockExchange?: string
  MarketReputation?: string
  Partnerships?: string
  Awards?: string
  ParentCompany?: string
  City?: string
  State?: string
  Country?: string
  PhoneNumbers?: string
  Emails?: string
  url?: string
  company_summary?: string
  LinkedIn?: string
  Twitter?: string
  Facebook?: string
  Instagram?: string
  YouTube?: string
  Twitter_Username?: string
  Twitter_Followers?: string
  Twitter_Following?: string
  Facebook_Username?: string
  Facebook_Followers?: string
  Facebook_Following?: string
  Instagram_Username?: string
  Instagram_Followers?: string
  Instagram_Following?: string
  YouTube_Username?: string
  YouTube_Subscribers?: string
  linkdein_followers?: string
  employeeCount?: string
  linkdein_slogan?: string
  Issues?: Array<{
    Issue?: string
    Problem_pain_points?: string
  }>
}

export default function ResultsPage() {
  const router = useRouter()
  const [data, setData] = useState<CompanyData | null>(null)

  useEffect(() => {
    const result = localStorage.getItem('currentResult')
    if (result) {
      const parsed = JSON.parse(result)
      setData(parsed.data)
    } else {
      router.push('/research')
    }
  }, [router])

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
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
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => router.push('/research')}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Search</span>
              <span className="sm:hidden">New</span>
            </button>
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Page Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Company Data</h2>
          <p className="text-sm sm:text-base text-gray-600">Comprehensive analysis and insights</p>
        </div>

        {/* Company Data Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn">
          <div className="border-l-4 border-blue-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Company Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {data.CompanyName && <DataItem label="Company Name" value={data.CompanyName} />}
            {data.FoundedYear && <DataItem label="Founded Year" value={data.FoundedYear} />}
            {data.Founders && <DataItem label="Founders" value={data.Founders} />}
            {data.CEO && <DataItem label="CEO" value={data.CEO} />}
            {data.Industry && <DataItem label="Industry" value={data.Industry} />}
            {data.Revenue && <DataItem label="Revenue" value={data.Revenue} />}
            {data.Employees && <DataItem label="Employees" value={data.Employees} />}
            {data.StockExchange && <DataItem label="Stock Exchange" value={data.StockExchange} />}
            {data.ParentCompany && <DataItem label="Parent Company" value={data.ParentCompany} />}
            {data.City && <DataItem label="City" value={data.City} />}
            {data.State && <DataItem label="State" value={data.State} />}
            {data.Country && <DataItem label="Country" value={data.Country} />}
            {data.PhoneNumbers && <DataItem label="Phone" value={data.PhoneNumbers} />}
            {data.Emails && <DataItem label="Email" value={data.Emails} />}
            {data.url && <DataItem label="Website URL" value={data.url} />}
          </div>
          
          {data.Description && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">{data.Description}</p>
            </div>
          )}
          
          {data.ProductsServices && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Products & Services</h4>
              <p className="text-gray-600 leading-relaxed">{data.ProductsServices}</p>
            </div>
          )}
          
          {data.MarketReputation && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Market Reputation</h4>
              <p className="text-gray-600 leading-relaxed">{data.MarketReputation}</p>
            </div>
          )}
          
          {data.Partnerships && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Partnerships</h4>
              <p className="text-gray-600 leading-relaxed">{data.Partnerships}</p>
            </div>
          )}
          
          {data.Awards && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Awards</h4>
              <p className="text-gray-600 leading-relaxed">{data.Awards}</p>
            </div>
          )}
          
          {data.url && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">Website</h4>
              <a 
                href={data.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 hover:underline break-all"
              >
                {data.url}
              </a>
            </div>
          )}
        </div>

        {/* Company Summary Section */}
        {data.company_summary && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn">
            <div className="border-l-4 border-indigo-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Company Summary</h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">{data.company_summary}</p>
          </div>
        )}

        {/* Social Accounts Section */}
        {(data.LinkedIn || data.Twitter || data.Facebook || data.Instagram || data.YouTube) && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn">
            <div className="border-l-4 border-green-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Social Accounts</h3>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
              {data.LinkedIn && <SocialLink platform="LinkedIn" url={data.LinkedIn} color="bg-blue-700" />}
              {data.Twitter && <SocialLink platform="Twitter" url={data.Twitter} color="bg-sky-500" />}
              {data.Facebook && <SocialLink platform="Facebook" url={data.Facebook} color="bg-blue-600" />}
              {data.Instagram && <SocialLink platform="Instagram" url={data.Instagram} color="bg-pink-600" />}
              {data.YouTube && <SocialLink platform="YouTube" url={data.YouTube} color="bg-red-600" />}
            </div>
          </div>
        )}

        {/* Followers & Following Section */}
        {(data.Twitter_Followers || data.Facebook_Followers || data.Instagram_Followers || data.YouTube_Subscribers || data.linkdein_followers) && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn">
            <div className="border-l-4 border-purple-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Followers & Following Details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.Twitter_Username && <DataItem label="Twitter Username" value={data.Twitter_Username} />}
              {data.Twitter_Followers && <DataItem label="Twitter Followers" value={data.Twitter_Followers} />}
              {data.Twitter_Following && <DataItem label="Twitter Following" value={data.Twitter_Following} />}
              {data.Facebook_Username && <DataItem label="Facebook Username" value={data.Facebook_Username} />}
              {data.Facebook_Followers && <DataItem label="Facebook Followers" value={data.Facebook_Followers} />}
              {data.Facebook_Following && <DataItem label="Facebook Following" value={data.Facebook_Following} />}
              {data.Instagram_Username && <DataItem label="Instagram Username" value={data.Instagram_Username} />}
              {data.Instagram_Followers && <DataItem label="Instagram Followers" value={data.Instagram_Followers} />}
              {data.Instagram_Following && <DataItem label="Instagram Following" value={data.Instagram_Following} />}
              {data.YouTube_Username && <DataItem label="YouTube Username" value={data.YouTube_Username} />}
              {data.YouTube_Subscribers && <DataItem label="YouTube Subscribers" value={data.YouTube_Subscribers} />}
              {data.linkdein_followers && <DataItem label="LinkedIn Followers" value={data.linkdein_followers} />}
            </div>
          </div>
        )}

        {/* Pain Points - Issues & Problems Table */}
        {data.Issues && data.Issues.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 animate-fadeIn">
            <div className="border-l-4 border-red-600 pl-3 sm:pl-4 mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Pain Points</h3>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Company pain points and challenges</p>
            </div>
            
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full border-collapse min-w-[600px] sm:min-w-0">
                <thead>
                  <tr className="bg-red-50">
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-red-800 border-b-2 border-red-200 w-12 sm:w-16">
                      #
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-red-800 border-b-2 border-red-200">
                      Issue
                    </th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-red-800 border-b-2 border-red-200">
                      Problem / Pain Points
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.Issues.map((issue, index) => (
                    <tr 
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-red-50 transition-colors`}
                    >
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 border-b border-gray-200 font-semibold">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-800 border-b border-gray-200">
                        {issue.Issue || '-'}
                      </td>
                      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-800 border-b border-gray-200">
                        {issue.Problem_pain_points || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-right">
              Total Pain Points: <span className="font-semibold text-gray-700">{data.Issues.length}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <button
            onClick={() => router.push('/research')}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl transform hover:scale-105 transition-all text-sm sm:text-base"
          >
            New Research
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 sm:px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base"
          >
            Print Report
          </button>
        </div>
      </main>
    </div>
  )
}

function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
      <div className="text-xs sm:text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-sm sm:text-base text-gray-800 font-medium break-words">{value}</div>
    </div>
  )
}

function SocialLink({ platform, url, color }: { platform: string; url: string; color: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md text-sm sm:text-base`}
    >
      <span>{platform}</span>
      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  )
}

