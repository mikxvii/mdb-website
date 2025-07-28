'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselRef2 = useRef<HTMLDivElement>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeed, setTypeSpeed] = useState(100)

  const words = ['Beasts.', 'Bots.', 'Baddies.', 'Ballers.', 'Boomers.', 'Bruzz.', 'B.']
  
  // First carousel images and captions (top strip)
  const images1 = [
    "/images/mdb5 2.jpg",
    "/images/edan-goat.jpeg",
    "/images/mdb-goats.jpeg",
    "/images/mdb-ride.jpg",
    "/images/mdb-newnite.jpg",
    "/images/mdb-6flags.jpeg",
    "/images/noah-goat.jpeg"
  ]

  const captions1 = [
    "Mobile Developers of Berkeley",
    "PM Edan planning out our W against Codebase",
    "MDB LShip GOATs.",
    "Riding the Superman at Six Flags",
    "Newbie Night <3",
    "MDB @Six Flags",
    "Noah our beloved 2024-2025 President"
  ]

  // Second carousel images and captions (bottom strip)
  const images2 = [
    "/images/soccer-w.jpg",
    "/images/stpat.jpeg",
    "/images/tp-over.jpg",
    "/images/mdb-hawaii.jpg",
    "/images/wbn1.jpeg",
    "/images/wbn2.jpeg"
  ]

  const captions2 = [
    "MDB supporting our IM Soccer Team",
    "St. Patty's Day!",
    "TP Instructor MO ending the semester with a bang",
    "MDB HAWAII RETREAT SPRING 2025",
    "Welcome Back Night (Chryssa, Morrell, Elisa, Sarah)",
    "Welcome Back Night (Cathryn, Angie, Val, Renata, Emma, Danica)"
  ]

  // Duplicate images and captions for seamless infinite scroll
  const duplicatedImages1 = [...images1, ...images1, ...images1]
  const duplicatedCaptions1 = [...captions1, ...captions1, ...captions1]
  const duplicatedImages2 = [...images2, ...images2, ...images2]
  const duplicatedCaptions2 = [...captions2, ...captions2, ...captions2]

  useEffect(() => {
    const carousel1 = carouselRef.current
    const carousel2 = carouselRef2.current
    if (!carousel1 || !carousel2) return

    let animationId: number
    const speed = 1 // Speed for both carousels
    const imageWidth = 432 // 400px width + 32px margin (mx-4 = 16px each side)
    let translateX1 = 0
    let translateX2 = -(imageWidth * images2.length) // Start second carousel from left for proper infinite scroll

    const animate = () => {
      // First carousel moves right to left
      translateX1 -= speed
      
      // Second carousel moves left to right
      translateX2 += speed
      
      // Reset position when we've scrolled through one full set of images
      const totalWidth1 = imageWidth * images1.length
      const totalWidth2 = imageWidth * images2.length
      if (Math.abs(translateX1) >= totalWidth1) {
        translateX1 = 0
      }
      if (translateX2 >= 0) {
        translateX2 = -totalWidth2
      }
      
      carousel1.style.transform = `translateX(${translateX1}px)`
      carousel2.style.transform = `translateX(${translateX2}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [images1.length, images2.length])

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex]
    
    const handleType = () => {
      if (isDeleting) {
        // Backspace effect
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypeSpeed(50) // Faster deletion
        
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
          setTypeSpeed(100) // Normal typing speed
        }
      } else {
        // Typing effect
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        setTypeSpeed(100)
        
        if (currentText === currentWord) {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), 2000)
          return
        }
      }
    }

    const timer = setTimeout(handleType, typeSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, typeSpeed, words])

  return (
    <section className="w-screen bg-gradient-to-b from-mdb-light-blue to-white py-16 relative left-1/2 -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue to-white z-0"></div>
      <div className="mb-16 relative z-10">
        <h2 className="text-5xl font-bold text-center text-mdb-blue">
          MD{currentText}
          <span className="animate-pulse text-mdb-blue">|</span>
        </h2>
      </div>
      
      {/* Full-width continuous sliding strip with alternating heights */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 z-10">
        <div className="overflow-hidden h-[800px]">
          {/* First carousel strip - moves right to left */}
          <div 
            ref={carouselRef}
            className="flex items-start"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedImages1.map((imageSrc: string, index: number) => (
              <div 
                key={index} 
                className="group flex-shrink-0 w-[400px] relative mx-4 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center mt-6"
              >
                {/* Image container */}
                <div className="relative w-full h-[300px]">
                  <Image
                    src={imageSrc}
                    alt={`MDB Community Photo ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="400px"
                    priority={index < 6} // Prioritize first 6 images
                  />
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[271px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 transition-all duration-300 ease-out z-10 text-center">
                  {duplicatedCaptions1[index]}
                </div>
              </div>
            ))}
          </div>

          {/* Second carousel strip - moves left to right */}
          <div 
            ref={carouselRef2}
            className="flex items-start mt-8"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedImages2.map((imageSrc: string, index: number) => (
              <div 
                key={`second-${index}`} 
                className="group flex-shrink-0 w-[400px] relative mx-4 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center mt-6"
              >
                {/* Image container */}
                <div className="relative w-full h-[300px]">
                  <Image
                    src={imageSrc}
                    alt={`MDB Community Photo ${index + 1}`}
                    fill
                    className="object-cover rounded-2xl"
                    sizes="400px"
                    priority={false} // Don't prioritize second strip
                  />
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[271px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 transition-all duration-300 ease-out z-10 text-center">
                  {duplicatedCaptions2[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
} 