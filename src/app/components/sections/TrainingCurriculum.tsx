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
    title: "Introduction to Mobile Development",
    description: "Introducing the club, onboarding students to MDB tech stack, and general software engineering concepts."
  },
  {
    week: "Weeks 2/3",
    title: "General Mobile Development with React Native",
    description: "General software development in React Native, including mini projects."
  },
  {
    week: "Week 3/4",
    title: "Native Mobile Development with Swift",
    description: "Native features, hardware integration, and introducing app development in Swift."
  },
  {
    week: "Week 4/5",
    title: "Applied Mobile Development with Machine Learning and Edge Computing",
    description: "TensorFlow Lite and Apple's CreateML, and the intersection of CNNs with mobile development."
  },
  {
    week: "Weeks 7/8/9/10",
    title: "Newbie Project",
    description: "A newbie project involving students working as a giant team."
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
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
                  className="mdb-glass mdb-glass-hover p-8"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {module.week} - {module.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
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