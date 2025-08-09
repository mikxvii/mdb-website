'use client'
import { useEffect, useRef, useState } from 'react'

interface ProjectPhase {
  icon: string
  title: string
  description: string
}

const projectPhases: ProjectPhase[] = [
  {
    icon: "📱",
    title: "Ideation",
    description: "At the beginning of the semester, DevCore comes together to brainstorm fields, pain points, target audiences, and overall issues that can be best addressed with an innovative tech solution."
  },
  {
    icon: "🔧",
    title: "Development",
    description: "Teams reach tangible development benchmarks as part of the Agile framework in the process of completing their project, and have regular standups to the rest of the org."
  },
  {
    icon: "💼",
    title: "Entrepreneurship",
    description: "Our projects solve real-world problems with innovative tech solutions. Our teams seek constant user feedback and rapidly iterate upon our work to create the most polished products possible."
  }
]

export default function ProjectCarousel() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Mobile/Tablet Layout - Stacked Wide Cards */}
        <div className="max-w-4xl mx-auto lg:hidden">
          <div className={`space-y-6 sm:space-y-8 transition-all duration-[1500ms] ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {projectPhases.map((phase, index) => (
              <div
                key={index}
                className="mdb-glass mdb-glass-hover p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl flex-shrink-0">{phase.icon}</div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-raleway-bold text-gray-800 mb-3 sm:mb-4">
                    {phase.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Square Grid */}
        <div className="max-w-6xl mx-auto hidden lg:block">
          <div className={`grid grid-cols-3 gap-8 transition-all duration-[1500ms] ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {projectPhases.map((phase, index) => (
              <div
                key={index}
                className="mdb-glass mdb-glass-hover p-8 flex flex-col h-full"
              >
                <div className="text-6xl mb-6 text-center">{phase.icon}</div>
                <h3 className="text-2xl font-raleway-bold text-gray-800 mb-4 text-center">
                  {phase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow text-center">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 