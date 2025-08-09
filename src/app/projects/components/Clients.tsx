'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Client } from '../../constants/projects'

interface ClientsProps {
  client: Client
  className?: string
}

export default function Clients({ client, className = '' }: ClientsProps) {
  return (
    <div className={`mdb-glass mdb-glass-hover p-4 sm:p-6 md:p-8 ${className}`}>
      {/* Header with Logo and App Info */}
      <div className="flex flex-col space-y-3 mb-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={client.image}
              alt={`${client.name} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl md:text-2xl font-raleway-bold text-gray-800 truncate">{client.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 truncate">{client.type}</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Link 
            href={client.link}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-mdb-gold hover:text-mdb-blue transition-colors text-sm sm:text-base"
          >
            View Project
          </Link>
        </div>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="text-xl sm:text-2xl mb-2">🐍</div>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">TECH STACK</p>
          <p className="text-xs text-gray-600 leading-tight">{client.techStack.join(', ')}</p>
        </div>
        
        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="text-xl sm:text-2xl mb-2">🏆</div>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">PURPOSE</p>
          <p className="text-xs text-gray-600 leading-tight">{client.purpose}</p>
        </div>
        
        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="text-xl sm:text-2xl mb-2">📅</div>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">DATE</p>
          <p className="text-xs text-gray-600 leading-tight">{client.date}</p>
        </div>
        
        <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="text-xl sm:text-2xl mb-2">👥</div>
          <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-1">PM&apos;S</p>
          <p className="text-xs text-gray-600 leading-tight">{client.pms.join(' & ')}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Description</h4>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{client.description}</p>
      </div>

      {/* Screenshots */}
      {client.screenshots.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Screenshots</h4>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide touch-scroll">
            {client.screenshots.map((screenshot, index) => (
              <div key={index} className="relative w-28 h-48 sm:w-32 sm:h-56 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={screenshot}
                  alt={`${client.name} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 