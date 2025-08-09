'use client'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { clientProjects } from '../../constants/projects'
import Clients from './Clients'
import Link from 'next/link'

export default function ProjectClients() {
  const { isVisible, elementRef } = useIntersectionObserver({
    threshold: [0, 0.1, 0.2],
    rootMargin: '0px 0px -50px 0px'
  })

  return (
    <section ref={elementRef} className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[#D1DFF2] to-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-raleway-bold text-blue-900 mb-3 sm:mb-4">Our Projects</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto px-2 sm:px-4">
            Explore our portfolio of innovative projects that showcase our expertise in building 
            cutting-edge solutions for real-world problems.
          </p>
        </div>
        
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ease-out transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {clientProjects.map((client, index) => (
              <Clients
                key={index}
                client={client}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-8 sm:mt-12 md:mt-16 transition-all duration-1000 ease-out delay-500 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="mdb-glass-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-raleway-bold text-mdb-blue mb-4 sm:mb-6">
              Need an Innovative App or Web Solution?
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
              Let Berkeley&apos;s Brightest Build It for You.
            </p>
            <Link 
              href="/contact"
              className="inline-block bg-mdb-blue text-white px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 rounded-xl font-raleway-semibold text-base sm:text-lg md:text-xl hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center shadow-xl"
            >
              Schedule a Meeting Now
              <span className="ml-2 text-lg sm:text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 