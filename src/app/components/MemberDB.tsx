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
}

export default function MemberDB({ name, title, image, size = 'medium', className = '', calendly }: MemberDBProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
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

  return (
    <div className={`text-center hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center ${className}`}>
      <div className={`mdb-glass relative mx-auto mb-3 overflow-hidden rounded-lg border-8 ${currentSize.container}`}>
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
      <div className={`${currentSize.card} -mt-2 relative z-10`}>
        <h3 className={`font-semibold text-gray-800 mb-1 ${currentSize.name}`}>{name}</h3>
        <p className={`text-gray-600 ${currentSize.title}`}>{title}</p>
        {calendly && (
          <a
            href={calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-mdb-blue text-white px-4 py-2 rounded-xl font-raleway-semibold text-sm hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-lg"
          >
            Schedule Coffee Chat
            <span className="ml-1 text-sm">→</span>
          </a>
        )}
      </div>
    </div>
  )
} 