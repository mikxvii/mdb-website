'use client'
import { useEffect, useRef, useState } from 'react'

interface Tool {
  name: string
  logo: string
}

const tools: Tool[] = [
  { name: "React Native", logo: "⚛️" },
  { name: "Expo", logo: "📲" },
  { name: "Xcode", logo: "🍎" },
  { name: "Android Studio", logo: "🤖" },
  { name: "Firebase", logo: "🔥" },
  { name: "Git & GitHub", logo: "🐙" }
]

export default function TrainingTools() {
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
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Technologies</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Master the industry-standard tools and technologies used by professional mobile developers.
          </p>
        </div>
        
        <div className={`max-w-6xl mx-auto transition-all duration-[1500ms] ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index} 
                className="mdb-glass mdb-glass-hover p-4 text-center"
              >
                <div className="text-3xl mb-2">{tool.logo}</div>
                <div className="font-semibold text-gray-800 text-sm">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 