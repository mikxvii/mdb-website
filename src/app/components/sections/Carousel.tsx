'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const images = [
    "/images/mdb8.jpg",
    "/images/mdb-hawaii.jpg",
    "/images/mdb-6flags.jpg",
    "/images/mdb-newnite.jpg",
    "/images/mdb8.jpg",
    "/images/mdb-hawaii.jpg",
    "/images/mdb8.jpg",
    "/images/mdb-hawaii.jpg",
    "/images/mdb8.jpg",
    "/images/mdb-hawaii.jpg",
    "/images/mdb8.jpg",
    "/images/mdb-hawaii.jpg"
  ]

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images]

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let animationId: number
    let translateX = 0
    const speed = 1 // Increased speed for better visibility
    const imageWidth = 432 // 400px width + 32px margin (mx-4 = 16px each side)

    const animate = () => {
      translateX -= speed
      
      // Reset position when we've scrolled through one full set of images
      const totalWidth = imageWidth * images.length
      if (Math.abs(translateX) >= totalWidth) {
        translateX = 0
      }
      
      carousel.style.transform = `translateX(${translateX}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [images.length])

  return (
    <section className="py-16 bg-slate-100 overflow-hidden">
      <div className="mb-16">
        <h2 className="text-5xl font-bold text-center text-mdb-blue">
          Carousel
        </h2>
      </div>
      
      {/* Full-width continuous sliding strip with alternating heights */}
      <div className="w-screen relative -mx-4 lg:-mx-8 xl:-mx-16">
        <div className="overflow-hidden h-[500px]">
          <div 
            ref={carouselRef}
            className="flex items-start"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedImages.map((imageSrc, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 w-[400px] h-[300px] relative mx-4 ${
                  index % 2 === 0 
                    ? 'mt-0' /* Even indices: top position */
                    : 'mt-32' /* Odd indices: bottom position with 8rem (128px) offset */
                }`}
              >
                <Image
                  src={imageSrc}
                  alt={`MDB Community Photo ${index + 1}`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="400px"
                  priority={index < 6} // Prioritize first 6 images
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient overlays for edge fade effect */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-100 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none"></div>
      </div>
    </section>
  )
} 