'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function PurpAndComm() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ semesters: 0, projects: 0, members: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const duration = 2000 // 2 seconds
      const steps = 60
      const stepDuration = duration / steps
      
      const targets = { semesters: 8, projects: 29, members: 42 }
      const increments = {
        semesters: targets.semesters / steps,
        projects: targets.projects / steps,
        members: targets.members / steps
      }

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        setCounters({
          semesters: Math.min(Math.floor(increments.semesters * currentStep), targets.semesters),
          projects: Math.min(Math.floor(increments.projects * currentStep), targets.projects),
          members: Math.min(Math.floor(increments.members * currentStep), targets.members)
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setCounters(targets) // Ensure exact final values
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="w-screen bg-gradient-to-b from-white to-mdb-light-blue py-16 relative left-1/2 -translate-x-1/2">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-mdb-light-blue z-0"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Our Purpose Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-mdb-blue">
              Our Purpose
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To foster a diverse and welcoming community driven by learning software development and building real-world applications, leaving members with bonds and memories highlighting all aspects of the college experience and lasting beyond the club.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src="/images/mdb8.jpg"
              alt="MDB Community at the beach"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl shadow-lg hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative py-16 mb-20">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-20 transition-all duration-1000 ${isVisible ? 'scale-100 rotate-45' : 'scale-0 rotate-0'}`}></div>
            <div className={`absolute top-20 right-20 w-24 h-24 bg-yellow-400 rounded-full opacity-30 transition-all duration-1500 delay-300 ${isVisible ? 'scale-100 -rotate-45' : 'scale-0 rotate-0'}`}></div>
            <div className={`absolute bottom-10 left-1/4 w-20 h-20 bg-orange-400 rounded-full opacity-25 transition-all duration-1200 delay-500 ${isVisible ? 'scale-100 rotate-90' : 'scale-0 rotate-0'}`}></div>
            <div className={`absolute bottom-20 right-1/3 w-16 h-16 bg-yellow-300 rounded-full opacity-20 transition-all duration-1000 delay-700 ${isVisible ? 'scale-100 -rotate-90' : 'scale-0 rotate-0'}`}></div>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 text-center">
            {/* Semesters */}
            <div className="relative">
              <div className="text-6xl lg:text-7xl font-bold text-orange-500 mb-2">
                {counters.semesters}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Semesters of</h3>
              <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
            </div>

            {/* Projects */}
            <div className="relative">
              <div className="text-6xl lg:text-7xl font-bold text-orange-500 mb-2">
                {counters.projects}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Projects Completed</h3>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-orange-300 rounded-full opacity-50"></div>
            </div>

            {/* Members */}
            <div className="relative">
              <div className="text-6xl lg:text-7xl font-bold text-orange-500 mb-2">
                {counters.members}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Members</h3>
              <div className="absolute -top-6 -left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>

        {/* Our Community Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-1 lg:order-1">
            <Image
              src="/images/mdb-hawaii.jpg"
              alt="MDB Community gathering"
              width={600}
              height={400}
              className="w-full h-auto rounded-2xl shadow-lg hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center"
            />
          </div>
          <div className="order-2 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-mdb-blue">
              Our Community
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At MDB, we prioritize and cultivate a diverse and welcoming community. Through team bonding activities, retreats, and club socials, our members form lasting bonds and unforgettable memories that enhance the college experience.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
} 