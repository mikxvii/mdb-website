'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTypingAnimation } from '../../hooks/useTypingAnimation'
import { useAnimationLoad } from '../../hooks/useAnimationLoad'

export default function TitleSection() {
  const { isLoaded } = useAnimationLoad()
  
  const words = ['MDB.', 'a Community.', 'Chillers.', 'a Network.', 'Tight-knit.', 'Diverse.', 'Creators.', 'MDBesties.', 'Developers.', 'Brainrotted.', 'Family.']
  const { currentText } = useTypingAnimation({ words })

  return (
    <section className="min-h-screen w-screen bg-gradient-to-b from-mdb-light-blue to-white flex items-center -mt-20 relative mb-0 py-8 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue to-white z-0"></div>
      <div className="w-full px-4 py-8 pt-20 md:pt-24 lg:pt-28 relative z-10">
        <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left Section - Image */}
          <div className="relative flex justify-center lg:justify-start -mt-6 md:-mt-8 lg:-mt-40">
            <Image
              src="/images/mdb-logo-large.png"
              alt="MDB Mobile Development"
              width={2000}
              height={2000}
              priority
              sizes="(max-width: 640px) 340px, (max-width: 768px) 400px, (max-width: 1024px) 460px, (max-width: 1280px) 600px, 720px"
              className={`w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] md:w-[460px] md:h-[460px] lg:w-[600px] lg:h-[600px] xl:w-[720px] xl:h-[720px] object-contain transition-all duration-1000 ease-out ${
                isLoaded 
                  ? 'translate-y-0' 
                  : '-translate-y-12'
              }`}
            />
          </div>

        {/* Right Section - Content */}
          <div className={`order-2 lg:order-2 text-center lg:text-left -mt-6 md:-mt-8 lg:-mt-40 transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'translate-y-0' 
              : 'translate-y-8'
          }`}>
            <h1 className="text-[clamp(1.5rem,4.5vw,2.75rem)] md:text-[clamp(1.75rem,5.5vw,3.5rem)] lg:text-[clamp(2rem,6.5vw,4.5rem)] mb-6 text-mdb-blue font-raleway-bold leading-tight">
              <div className="block">
                We are
              </div>
              <div className="block min-h-[1.2em]">
                <span className="inline-block">
                  {currentText}
                  <span className="animate-pulse text-mdb-blue">|</span>
                </span>
              </div>
            </h1>
            <p className="text-[clamp(0.85rem,2.2vw,1.05rem)] md:text-[clamp(0.875rem,2.5vw,1.125rem)] lg:text-[clamp(1rem,3vw,1.25rem)] mb-8 text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0">
            MDB is a community of passionate and innovative mobile developers at UC Berkeley!
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Apply Button */}
              <Link 
                href="/apply"
                className="bg-mdb-blue text-white px-6 md:px-8 py-3 md:py-3 rounded-xl font-semibold text-[clamp(0.6875rem,1.75vw,0.875rem)] hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center flex items-center justify-center gap-2 min-w-[120px] md:min-w-[140px]"
              >
                Apply Now
                <span className="text-[clamp(0.75rem,1.75vw,1rem)]">→</span>
              </Link>
              
              {/* Contact Button */}
              <Link 
                href="/contact"
                className="border-2 border-mdb-blue text-mdb-blue bg-white/80 backdrop-blur-sm px-6 md:px-8 py-3 md:py-3 rounded-xl font-semibold text-[clamp(0.6875rem,2.2vw,1.05rem)] hover:bg-mdb-blue hover:text-white hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center min-w-[120px] md:min-w-[140px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 