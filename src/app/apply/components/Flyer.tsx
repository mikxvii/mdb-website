'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Flyer() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animation on next frame to prevent flash
    const timer = requestAnimationFrame(() => {
      setIsLoaded(true)
    })
    
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-mdb-light-blue to-white flex items-center -mt-20 relative mb-0 py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue to-white z-0"></div>
      <div className="w-full px-4 py-8 pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className={`max-w-7xl mx-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <h1 className="text-[clamp(2rem,5vw,4rem)] md:text-[clamp(2.5rem,6vw,5rem)] font-raleway-bold text-mdb-blue mb-6 leading-tight">
              Join MDB
            </h1>
            <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Become part of UC Berkeley's premier mobile development community. 
              Learn, build, and grow with passionate developers who share your vision.
            </p>
          </div>

          {/* Large Image */}
          <div className={`relative mb-12 transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/recruit-fall-25.png"
                alt="MDB Mobile Development Community"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Recruitment Information */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-1000 ease-out delay-500 ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <div className="mdb-glass mdb-glass-hover p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-3">What We Do</h3>
              <p className="text-gray-700 leading-relaxed">
                We build mobile applications, learn cutting-edge technologies, and create innovative solutions 
                that make a real impact in the world.
              </p>
            </div>

            <div className="mdb-glass mdb-glass-hover p-6">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-3">Why Join Us</h3>
              <p className="text-gray-700 leading-relaxed">
                Access to industry mentors, real-world projects, networking opportunities, and a supportive 
                community of like-minded developers.
              </p>
            </div>

            <div className="mdb-glass mdb-glass-hover p-6 md:col-span-2 lg:col-span-1">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-raleway-semibold text-mdb-blue mb-3">What You'll Learn</h3>
              <p className="text-gray-700 leading-relaxed">
                iOS/Android development, UI/UX design, backend integration, project management, and the 
                latest mobile development frameworks and tools.
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className={`mdb-glass-lg p-8 mb-12 transition-all duration-1000 ease-out delay-700 ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <h2 className="text-2xl md:text-3xl font-raleway-bold text-mdb-blue mb-6 text-center">
              Application Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-raleway-semibold text-mdb-blue mb-4">What We're Looking For</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Passion for mobile development and technology</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Willingness to learn and grow with the community</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Commitment to attending weekly meetings and socials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Taken or are currently enrolled in CS 61A (or equivalent prior coding experience)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>At least 3 semesters left at Cal</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-raleway-semibold text-mdb-blue mb-4">What You'll Get</h3>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Hands-on mobile development experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Mentorship from industry professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Networking with tech companies and alumni</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-mdb-blue font-bold">•</span>
                    <span>Portfolio of real mobile applications</span>
                  </li>
                </ul>
                
                {/* Training Program Information - now part of the same column */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-raleway-semibold text-mdb-blue mb-3">
                    Training Program
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    All of our new members undergo a semester-long training program where they will be introduced to mobile development using React Native and Swift, exposed to useful tools in machine learning / edge computing, and expected to curate a final project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className={`text-center transition-all duration-1000 ease-out delay-900 ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <Link 
              href="#application-form"
              className="inline-block bg-mdb-blue text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-raleway-semibold text-lg md:text-xl hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
            >
              Apply Now
              <span className="ml-2 text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 