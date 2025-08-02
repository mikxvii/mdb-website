'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface CarouselCard {
  icon: string
  title: string
  description: string
  link: string
  isImage?: boolean
}

const cards: CarouselCard[] = [
  {
    icon: "/assets/proj.svg",
    title: "Projects",
    description: "We take 3 client projects each semester, ranging from Mobile to Web to ML to Game Dev, our members are passionate about many fields and ready to tackle any problem",
    link: "/projects",
    isImage: true
  },
  {
    icon: "/assets/tp.svg",
    title: "Training Program",
    description: "A 13 week intensive program, we teach you the basics of full-stack development, culminating in a newbie app fully ideated and created by the new member class, which is published on the App Store",
    link: "/training-program",
    isImage: true
  },
  {
    icon: "/assets/comm.svg",
    title: "Community",
    description: "We love our MDB Community!! It is the most important part of the club, and is essential to who we are. From social, to study sessions, to retreat, we truly believe in creating a welcoming and supportive community for our members to suit all their needs.",
    link: "/about",
    isImage: true
  }
]

export default function AboutCarousel() {
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
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-[#D1DFF2]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-[1500ms] ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }`}>
            {cards.map((card, index) => (
              <div
                key={index}
                className="mdb-glass mdb-glass-hover p-8 flex flex-col h-full"
              >
                <div className="text-4xl mb-4 text-center">
                  {card.isImage ? (
                    <div className="flex justify-center">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  ) : (
                    card.icon
                  )}
                </div>
                <h3 className="text-2xl font-raleway-bold text-gray-800 mb-4 text-center">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow text-center">
                  {card.description}
                </p>
                {index !== cards.length - 1 && (
                  <div className="text-center mt-auto">
                    <Link
                      href={card.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 relative group"
                    >
                      <span className="relative">
                        Learn More →
                        <span
                          className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"
                          aria-hidden="true"
                        ></span>
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 