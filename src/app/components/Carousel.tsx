'use client'
import { useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useTypingAnimation } from '../hooks/useTypingAnimation'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselRef2 = useRef<HTMLDivElement>(null)
  const carouselRef3 = useRef<HTMLDivElement>(null)
  
  const words = useMemo(() => ['Beasts.', 'Bots.', 'Baddies.', 'Ballers.', 'Boomers.', 'Bruzz.', 'B.'], [])
  const { currentText } = useTypingAnimation({ words })

  // First carousel media and captions (top strip) - mixed images and videos
  const media1 = [
    { type: 'image', src: "/images/lafayette5.jpg" },
    { type: 'image', src: "/images/edan-goat.jpeg" },
    { type: 'video', src: "/videos/mdb-video.MP4" },
    { type: 'image', src: "/images/table1.jpeg" },
    { type: 'image', src: "/images/mdb-ride.jpg" },
    { type: 'image', src: "/images/car2.jpeg" },
    { type: 'image', src: "/images/stpat.jpeg" },
    { type: 'image', src: "/images/wnc.jpg" },
    { type: 'image', src: "/images/noah-goat.jpeg" },
    { type: 'image', src: "/images/jefflineage5.jpg" },
    { type: 'image', src: "/images/newbies.jpeg" }
  ]

  const captions1 = [
    "Lafayette Square Contract Team",
    "PM Edan planning out our W against Codebase",
    "MDB Picnic at the Glade",
    "MDB Banquet Dinner",
    "Riding the Superman at Six Flags",
    "MDB in Hawaii, Kevin's Car",
    "St. Patty's Day!",
    "Wine and Cheese Night!",
    "Noah our beloved 2024-2025 President",
    "Jeff's Lineage - MDB Legacy",
    "Newbie Hike!"
  ]

  // Second carousel media and captions (middle strip) - mixed images and videos
  const media2 = [
    { type: 'image', src: "/images/mdb-goats.jpeg" },
    { type: 'video', src: "/videos/mdb-goal.MP4" },
    { type: 'image', src: "/images/8ball.jpeg" },
    { type: 'image', src: "/images/wbn1.jpeg" },
    { type: 'image', src: "/images/circuit7.jpg" },
    { type: 'image', src: "/images/table3.jpeg" },
    { type: 'image', src: "/images/mdb-hawaii.jpg" },
    { type: 'image', src: "/images/car1.jpeg" },
    { type: 'image', src: "/images/mdb5 2.jpg" },
    { type: 'image', src: "/images/pms2.jpg" },
    { type: 'image', src: "/images/6flags-selfie.jpg" }
  ]

  const captions2 = [
    "MDB LShip GOATs.",
    "GOOOOOOOOOOOOOOOOOOOOOL",
    "8-Ball, Jai taking the L against Riana",
    "Welcome Back Night (Chryssa, Morrell, Elisa, Sarah)",
    "Circuit Contract Team",
    "MDB Banquet Dinner",
    "MDB HAWAII RETREAT SPRING 2025",
    "MDB in Hawaii, Preston's Car",
    "Mobile Developers of Berkeley",
    "Project Manager Team Spring 2025",
    "MDB Selfie @The Joker"
  ]

  // Third carousel media and captions (bottom strip) - mixed images and videos
  const media3 = [
    { type: 'video', src: "/videos/gitlit.mp4" },
    { type: 'image', src: "/images/soccer-w.jpg" },
    { type: 'image', src: "/images/tp-over.jpg" },
    { type: 'image', src: "/images/wbn2.jpeg" },
    { type: 'image', src: "/images/sur7.jpg" },
    { type: 'image', src: "/images/mdb-newnite.jpg" },
    { type: 'image', src: "/images/mdb-6flags.jpeg" },
    { type: 'image', src: "/images/car3.jpeg" },
    { type: 'image', src: "/images/edan-pair.jpg" },
    { type: 'image', src: "/images/table2.jpeg" }
  ]

  const captions3 = [
    "Git Lit? Got Lit.",
    "MDB supporting our IM Soccer Team",
    "TP Instructor MO ending the semester with a bang",
    "Welcome Back Night (Cathryn, Angie, Val, Renata, Emma, Danica)",
    "Sur Contract Team",
    "Newbie Night <3",
    "MDB @Six Flags",
    "MDB in Hawaii, Mike's Car",
    "Edan and his Little Alp",
    "MDB Banquet Dinner"
  ]

  // Duplicate media and captions for seamless infinite scroll
  const duplicatedMedia1 = [...media1, ...media1, ...media1]
  const duplicatedCaptions1 = [...captions1, ...captions1, ...captions1]
  const duplicatedMedia2 = [...media2, ...media2, ...media2]
  const duplicatedCaptions2 = [...captions2, ...captions2, ...captions2]
  const duplicatedMedia3 = [...media3, ...media3, ...media3]
  const duplicatedCaptions3 = [...captions3, ...captions3, ...captions3]

  useEffect(() => {
    const carousel1 = carouselRef.current
    const carousel2 = carouselRef2.current
    const carousel3 = carouselRef3.current
    if (!carousel1 || !carousel2 || !carousel3) return

    let animationId: number
    let lastTime = 0
    const speed = 60 // pixels per second
    const imageWidth = 432 // 400px width + 32px margin (mx-4 = 16px each side)
    
    // Use the same cycle length for all carousels to keep them synchronized
    const maxItems = Math.max(media1.length, media2.length, media3.length)
    const cycleWidth = imageWidth * maxItems
    
    let translateX1 = 0
    let translateX2 = -cycleWidth // Start second carousel from left
    let translateX3 = 0 // Start third carousel same as first (right to left movement)

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime
      const deltaTime = (currentTime - lastTime) / 1000 // Convert to seconds
      lastTime = currentTime

      // Move all carousels at consistent speed
      const moveDistance = speed * deltaTime
      
      // First carousel moves right to left
      translateX1 -= moveDistance
      
      // Second carousel moves left to right
      translateX2 += moveDistance
      
      // Third carousel moves right to left (same as first)
      translateX3 -= moveDistance
      
      // Reset positions smoothly when they complete a cycle
      if (translateX1 <= -cycleWidth) {
        translateX1 = 0
      }
      if (translateX2 >= 0) {
        translateX2 = -cycleWidth
      }
      if (translateX3 <= -cycleWidth) {
        translateX3 = 0
      }
      
      carousel1.style.transform = `translateX(${translateX1}px)`
      carousel2.style.transform = `translateX(${translateX2}px)`
      carousel3.style.transform = `translateX(${translateX3}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [media1.length, media2.length, media3.length])

  return (
    <section className="w-screen bg-gradient-to-b from-mdb-light-blue to-white py-8 sm:py-12 md:py-16 relative left-1/2 -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mdb-light-blue to-white z-0"></div>
      <div className="mb-8 sm:mb-12 md:mb-16 relative z-10">
        <h2 className="text-5xl font-raleway-bold text-center text-mdb-blue">
          MD{currentText}
          <span className="animate-pulse text-mdb-blue">|</span>
        </h2>
      </div>
      
      {/* Full-width continuous sliding strip with alternating heights */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 z-10">
        <div className="overflow-hidden h-[800px] sm:h-[900px] md:h-[1000px] lg:h-[1200px]">
          {/* First carousel strip - moves right to left */}
          <div 
            ref={carouselRef}
            className="flex items-start"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedMedia1.map((mediaItem: any, index: number) => (
              <div 
                key={index} 
                className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] relative mx-2 sm:mx-3 md:mx-4 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center mt-6"
              >
                {/* Media container */}
                <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px]">
                  {mediaItem.type === 'video' ? (
                    <video
                      src={mediaItem.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Video failed to load:', mediaItem.src, e)
                        // Fallback to showing a placeholder or error message
                        const videoElement = e.target as HTMLVideoElement
                        videoElement.style.display = 'none'
                        const parent = videoElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Video unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', mediaItem.src)
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', mediaItem.src)
                      }}
                    />
                  ) : (
                    <Image
                      src={mediaItem.src}
                      alt={`MDB Community Photo ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="400px"
                      priority={index < 6} // Prioritize first 6 images
                    />
                  )}
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[171px] sm:top-[191px] md:top-[221px] lg:top-[271px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 transition-all duration-300 ease-out z-10 text-center">
                  {duplicatedCaptions1[index]}
                </div>
              </div>
            ))}
          </div>

          {/* Second carousel strip - moves left to right */}
          <div 
            ref={carouselRef2}
            className="flex items-start mt-4 sm:mt-6 md:mt-8"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedMedia2.map((mediaItem: any, index: number) => (
              <div 
                key={`second-${index}`} 
                className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] relative mx-2 sm:mx-3 md:mx-4 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center mt-6"
              >
                {/* Media container */}
                <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px]">
                  {mediaItem.type === 'video' ? (
                    <video
                      src={mediaItem.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Video failed to load:', mediaItem.src, e)
                        // Fallback to showing a placeholder or error message
                        const videoElement = e.target as HTMLVideoElement
                        videoElement.style.display = 'none'
                        const parent = videoElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Video unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', mediaItem.src)
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', mediaItem.src)
                      }}
                    />
                  ) : (
                    <Image
                      src={mediaItem.src}
                      alt={`MDB Community Photo ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="400px"
                      priority={false} // Don't prioritize second strip
                    />
                  )}
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[171px] sm:top-[191px] md:top-[221px] lg:top-[271px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 transition-all duration-300 ease-out z-10 text-center">
                  {duplicatedCaptions2[index]}
                </div>
              </div>
            ))}
          </div>

          {/* Third carousel strip - moves right to left */}
          <div 
            ref={carouselRef3}
            className="flex items-start mt-4 sm:mt-6 md:mt-8"
            style={{ 
              width: 'fit-content',
              willChange: 'transform' // Optimize for animations
            }}
          >
            {duplicatedMedia3.map((mediaItem: any, index: number) => (
              <div 
                key={`third-${index}`} 
                className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] relative mx-2 sm:mx-3 md:mx-4 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-xl origin-center mt-6"
              >
                {/* Media container */}
                <div className="relative w-full h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px]">
                  {mediaItem.type === 'video' ? (
                    <video
                      src={mediaItem.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        console.error('Video failed to load:', mediaItem.src, e)
                        // Fallback to showing a placeholder or error message
                        const videoElement = e.target as HTMLVideoElement
                        videoElement.style.display = 'none'
                        const parent = videoElement.parentElement
                        if (parent) {
                          const fallback = document.createElement('div')
                          fallback.className = 'w-full h-full bg-gray-200 rounded-2xl flex items-center justify-center'
                          fallback.innerHTML = '<span class="text-gray-500">Video unavailable</span>'
                          parent.appendChild(fallback)
                        }
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', mediaItem.src)
                      }}
                      onCanPlay={() => {
                        console.log('Video can play:', mediaItem.src)
                      }}
                    />
                  ) : (
                    <Image
                      src={mediaItem.src}
                      alt={`MDB Community Photo ${index + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="400px"
                      priority={false} // Don't prioritize third strip
                    />
                  )}
                </div>
                {/* Caption card - slides out from underneath */}
                <div className="absolute top-[171px] sm:top-[191px] md:top-[221px] lg:top-[271px] left-0 right-0 bg-mdb-blue text-white text-sm px-4 py-3 rounded-b-2xl shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-4 group-hover:opacity-100 transition-all duration-300 ease-out z-10 text-center">
                  {duplicatedCaptions3[index]}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
} 