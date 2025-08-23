'use client'
import { useState, useEffect, useRef } from 'react'
import { useSectionAnimation } from '../../hooks/useIntersectionObserver'
import Image from 'next/image'

export default function Destinations() {
  const { isVisible, elementRef: sectionRef } = useSectionAnimation<HTMLElement>()
  const { isVisible: logosVisible, elementRef: logosRef } = useSectionAnimation<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section ref={sectionRef} className="w-full bg-gradient-to-b from-white to-blue-100 py-16">
      <div className={`max-w-6xl mx-auto px-4 mb-12 -mt-16 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}>
        <h2 className="text-4xl md:text-5xl font-raleway-bold text-center text-mdb-blue mb-6 drop-shadow-sm">
          Our Destinations
        </h2>
      </div>
      
      <div className={`max-w-6xl mx-auto px-4 transition-all duration-1000 ease-out delay-200 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 mb-4">
            At MDB, our members and alumni have a track record of success,
            <br />
            moving on to positions in leading companies and innovative startups.
          </p>
          <p className="text-xl text-gray-700">
            Here&apos;s a glimpse of the companies where our members make an impact.
          </p>
        </div>

        {/* Company Logos Grid */}
        <div ref={logosRef} className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center mb-16 transition-all duration-1000 ease-out delay-400 ${
          logosVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          {/* Row 1 */}
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
              alt="Google" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/janestreet.png" 
              alt="Jane Street" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
              alt="Amazon" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" 
              alt="Microsoft" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
              alt="Apple" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          
          {/* Row 2 */}
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/atlassian.png" 
              alt="Atlassian" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png" 
              alt="Databricks" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
              alt="LinkedIn" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'LI'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" 
              alt="Tesla" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'Tesla'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/bloomberg.png" 
              alt="Bloomberg" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          
          {/* Row 3 */}
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/retool.png" 
              alt="Retool" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg" 
              alt="SpaceX" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'SpaceX'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/imc.png" 
              alt="IMC" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
              alt="Visa" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'Visa'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg" 
              alt="Goldman Sachs" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'GS'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          
          {/* Row 4 */}
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/blackrock.png" 
              alt="BlackRock" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" 
              alt="Stripe" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'Stripe'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/blackstone.png" 
              alt="Blackstone" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" 
              alt="Meta" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
              onError={(e) => {
                const imgElement = e.target as HTMLImageElement
                imgElement.style.display = 'none'
                const parent = imgElement.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs font-semibold'
                  fallback.textContent = 'Meta'
                  parent.appendChild(fallback)
                }
              }}
            />
          </div>
          <div className="flex items-center justify-center h-20 group">
            <Image 
              src="/logos/delve.png" 
              alt="Delve" 
              width={48}
              height={48}
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-2xl group-hover:brightness-110" 
            />
          </div>
        </div>
      </div>
    </section>
  )
} 