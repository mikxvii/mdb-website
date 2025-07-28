'use client'
import { useState } from 'react'

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Student Success Stories",
      description: "See how our graduates have transformed their careers",
      image: "🎓",
      bgColor: "from-blue-500 to-purple-600"
    },
    {
      title: "Industry Partnerships", 
      description: "Connected with top tech companies for job placements",
      image: "🤝",
      bgColor: "from-green-500 to-blue-600"
    },
    {
      title: "Cutting-Edge Curriculum",
      description: "Learn the latest technologies and best practices",
      image: "💻",
      bgColor: "from-purple-500 to-pink-600"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="py-16 mb-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Discover Our Impact
      </h2>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 bg-gradient-to-r ${slide.bgColor} text-white p-16 text-center`}
              >
                <div className="text-8xl mb-6">{slide.image}</div>
                <h3 className="text-3xl font-bold mb-4">{slide.title}</h3>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">{slide.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        >
          →
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 