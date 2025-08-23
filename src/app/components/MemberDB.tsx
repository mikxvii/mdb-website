'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface MemberDBProps {
  name: string
  title: string
  image: string
  size?: 'small' | 'medium' | 'large'
  className?: string
  calendly?: string
  major?: string
  interests?: string[]
  email?: string
  funFacts?: string[]
}

export default function MemberDB({ 
  name, 
  title, 
  image, 
  size = 'medium', 
  className = '', 
  calendly,
  major,
  interests,
  email,
  funFacts
}: MemberDBProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  
  // Mark as client-side to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const sizeClasses = {
    small: {
      container: 'w-28 h-28',
      name: 'text-sm',
      title: 'text-xs',
      card: 'p-3'
    },
    medium: {
      container: 'w-32 h-32',
      name: 'text-base',
      title: 'text-sm',
      card: 'p-4'
    },
    large: {
      container: 'w-40 h-40',
      name: 'text-lg',
      title: 'text-base',
      card: 'p-5'
    }
  }

  const currentSize = sizeClasses[size]

  // Only show tooltip if calendly exists and we have additional member info
  const hasMemberInfo = calendly && (major || interests?.length || email || funFacts?.length)

  return (
    <div 
      className={`text-center hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center ${className} relative py-2`}
      onMouseEnter={() => hasMemberInfo && setShowTooltip(true)}
      onMouseLeave={() => hasMemberInfo && setShowTooltip(false)}
    >
      <div className={`mdb-glass relative mx-auto mb-3 overflow-hidden rounded-lg border-8 ${currentSize.container} transition-all duration-300 ${
        showTooltip ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Always render the same structure to prevent hydration mismatch */}
        {!isClient || (!imageLoaded && !imageError) ? (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        ) : null}
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover rounded-lg transition-opacity duration-300 ${
            isClient && imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isClient && imageError && (
          <div className="absolute inset-0 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-xs">Image not available</span>
          </div>
        )}
      </div>
      <div className={`${currentSize.card} relative z-10 transition-all duration-300 ${
        showTooltip ? 'opacity-0' : 'opacity-100'
      }`}>
        <h3 className={`font-semibold text-gray-800 mb-2 ${currentSize.name}`}>{name}</h3>
        <p className={`text-gray-600 ${currentSize.title}`}>{title}</p>
      </div>

      {/* Hover Tooltip - Positioned to the right side */}
      {hasMemberInfo && (
        <div className={`absolute inset-0 z-50 transition-all duration-300 ease-out ${
          showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          {/* Remove the arrow since it's overlaying the component */}
          
          <div className="mdb-glass p-4 rounded-xl border-2 shadow-2xl backdrop-blur-lg min-w-full min-h-full flex items-center justify-center">
            <div className="text-left space-y-3 max-w-sm">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-2">
                <h4 className="text-base font-raleway-bold text-mdb-blue">{name}</h4>
                <p className="text-xs text-gray-600">{title}</p>
              </div>

              {/* Member Information */}
              <div className="space-y-2">
                {major && (
                  <div>
                    <h5 className="text-xs font-raleway-semibold text-mdb-blue mb-1">Major</h5>
                    <p className="text-xs text-gray-700">{major}</p>
                  </div>
                )}

                {interests && interests.length > 0 && (
                  <div>
                    <h5 className="text-xs font-raleway-semibold text-mdb-blue mb-1">Interests</h5>
                    <div className="flex flex-wrap gap-1">
                      {interests.map((interest, index) => (
                        <span 
                          key={index}
                          className="px-2 py-0.5 bg-mdb-light-blue text-mdb-blue text-xs rounded-full font-medium"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {email && (
                  <div>
                    <h5 className="text-xs font-raleway-semibold text-mdb-blue mb-1">Email</h5>
                    <p className="text-xs text-gray-700 break-all">{email}</p>
                  </div>
                )}

                {funFacts && funFacts.length > 0 && (
                  <div>
                    <h5 className="text-xs font-raleway-semibold text-mdb-blue mb-1">Fun Facts</h5>
                    <ul className="text-xs text-gray-700 space-y-0.5">
                      {funFacts.map((fact, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-mdb-gold mr-1 mt-0.5 text-xs">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Calendly Link */}
              <div className="pt-2 border-t border-gray-200">
                <a
                  href={calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-mdb-blue text-white px-3 py-1.5 rounded-lg font-raleway-semibold text-xs hover:bg-mdb-gold hover:text-mdb-blue transition-all duration-300 transform hover:scale-105"
                >
                  Schedule Coffee Chat
                  <span className="ml-1 text-xs">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 