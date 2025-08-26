'use client'
import { useRef } from 'react'
import { useSectionAnimation } from '../../hooks/useIntersectionObserver'


interface Tool {
  name: string
  logoUrl: string
}

const tools: Tool[] = [
  {
    name: "Figma",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
  },
  {
    name: "Twilio",
    logoUrl: "/logos/twilio.png"
  },
  {
    name: "React",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  },
  {
    name: "React Native",
    logoUrl: "https://reactnative.dev/img/header_logo.svg"
  },
  {
    name: "Swift",
    logoUrl: "/logos/swift.svg"
  },
  {
    name: "Supabase",
    logoUrl: "https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png"
  },
  {
    name: "Firebase",
    logoUrl: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"
  },
  {
    name: "PyTorch",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg"
  },
  {
    name: "Tailwind CSS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
  },
  {
    name: "Expo",
    logoUrl: "/logos/expo.svg"
  },
  {
    name: "Xcode",
    logoUrl: "/logos/xcode.png"
  },
  {
    name: "Git & GitHub",
    logoUrl: "/logos/github.png"
  }
]

export default function TrainingTools() {
  const { isVisible, elementRef: sectionRef } = useSectionAnimation<HTMLElement>()

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
                <div className="flex items-center justify-center mb-2 h-12">
                  <img 
                    src={tool.logoUrl} 
                    alt={tool.name + ' logo'} 
                    className="h-10 object-contain mx-auto"
                    style={{ maxWidth: 48, maxHeight: 48 }}
                  />
                </div>
                <div className="font-semibold text-gray-800 text-sm">{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 