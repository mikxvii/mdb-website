'use client'
import { useEffect, useRef, useState } from 'react'

interface CurriculumModule {
  week: string
  title: string
  description: string
}

const curriculumModules: CurriculumModule[] = [
  {
    week: "Week 1",
    title: "Intro to Mobile Development",
    description: "Kick off the semester with an introduction to mobile development, MDB's tech stack, and essential software engineering concepts."
  },
  {
    week: "Week 2-3",
    title: "General Mobile Dev with React Native",
    description: "Learn the fundamentals of building cross-platform mobile apps using React Native, including hands-on mini projects."
  },
  {
    week: "Week 3-4",
    title: "General Mobile Dev with Swift",
    description: "Dive into native iOS development with Swift, exploring hardware integration and app development best practices."
  },
  {
    week: "Week 4-5",
    title: "Applied Mobile Dev, Machine Learning, and Edge Computing",
    description: "Explore the intersection of mobile development with machine learning and edge computing using tools like TensorFlow Lite and Apple's CreateML."
  },
  {
    week: "Week 6-10",
    title: "Newbie Project",
    description: "Work in teams to build and launch a real mobile app, applying everything you've learned throughout the training program."
  }
]

export default function TrainingCurriculum() {
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
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-[#D1DFF2] to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Training Program</h2>
          </div>
          
          <div className={`transition-all duration-[1500ms] ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          }`}>
            <div className="space-y-6">
              {curriculumModules.map((module, index) => (
                <div 
                  key={index} 
                  className="mdb-glass mdb-glass-hover p-8 flex items-start gap-6"
                >
                  <div className="flex flex-col items-center min-w-[90px]">
                    <span className="block text-lg font-bold text-mdb-blue mb-1 tracking-wide">{module.week}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-blue-900 tracking-wide mb-1">{module.title}</h3>
                    <p className="text-gray-700 leading-relaxed mt-1">{module.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="flex justify-center">
                <a
                  href="https://learn.mdb.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-mdb-blue text-white rounded-xl hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center font-semibold min-w-[120px]"
                >
                  Training Program Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 