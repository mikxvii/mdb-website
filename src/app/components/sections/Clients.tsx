import Image from 'next/image'
import Link from 'next/link'

interface Client {
  name: string
  link: string
  type: string
  logo: string
  description: string
  techStack: string[]
  purpose: string
  date: string
  pms: string[]
  screenshots: string[]
}

interface ClientsProps {
  client: Client
  className?: string
}

export default function Clients({ client, className = '' }: ClientsProps) {
  return (
    <div className={`bg-white/40 backdrop-blur-xl backdrop-saturate-150 border border-white/20 rounded-xl shadow-lg p-8 hover:shadow-xl hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center hover:bg-mdb-gold/40 hover:border-mdb-gold/30 ${className}`}>
      {/* Header with Logo and App Info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-raleway-bold text-gray-800">{client.name}</h3>
            <p className="text-gray-600">{client.type}</p>
          </div>
        </div>
        <Link 
          href={client.link}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-mdb-gold hover:text-mdb-blue transition-colors"
        >
          View
        </Link>
      </div>

      {/* Project Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">🐍</div>
          <p className="text-sm font-semibold text-gray-700">TECH STACK</p>
          <p className="text-xs text-gray-600">{client.techStack.join(', ')}</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">🏆</div>
          <p className="text-sm font-semibold text-gray-700">PURPOSE</p>
          <p className="text-xs text-gray-600">{client.purpose}</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">📅</div>
          <p className="text-sm font-semibold text-gray-700">DATE</p>
          <p className="text-xs text-gray-600">{client.date}</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-2">👥</div>
          <p className="text-sm font-semibold text-gray-700">PM'S</p>
          <p className="text-xs text-gray-600">{client.pms.join(' & ')}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{client.description}</p>
      </div>

      {/* Screenshots */}
      {client.screenshots.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Screenshots</h4>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {client.screenshots.map((screenshot, index) => (
              <div key={index} className="relative w-32 h-56 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200">
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