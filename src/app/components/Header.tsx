'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-mdb-light-blue/40 text-mdb-blue shadow-2xl backdrop-blur-xl backdrop-saturate-150 border-b border-white/10">
      <nav className="font-raleway-semibold container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/mdb-logo-simple.png"
              alt="MDB Website"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/about" className="block px-3 py-2 hover:text-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="block px-3 py-2 hover:text-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/training-program" className="block px-3 py-2 hover:text-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center">
                Training Program
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block px-3 py-2 hover:text-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/apply" className="block px-4 py-2 bg-mdb-blue text-white rounded-xl hover:bg-mdb-gold hover:text-mdb-blue hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center">
                Apply
              </Link>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
            aria-label="Toggle mobile menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-mdb-blue transition-all duration-300 transform origin-center ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-2'
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-mdb-blue transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-mdb-blue transition-all duration-300 transform origin-center ${
                isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
                     <ul className="flex flex-col space-y-4 py-4 bg-white/10 backdrop-blur-sm rounded-lg px-4 text-center">
             <li>
               <Link 
                 href="/about" 
                 className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 About
               </Link>
             </li>
             <li>
               <Link 
                 href="/projects" 
                 className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Projects
               </Link>
             </li>
             <li>
               <Link 
                 href="/training-program" 
                 className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Training Program
               </Link>
             </li>
             <li>
               <Link 
                 href="/contact" 
                 className="block hover:text-mdb-blue/80 hover:scale-105 hover:translate-x-2 transition-all duration-300 transform py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Contact
               </Link>
             </li>
             <li>
               <Link 
                 href="/apply" 
                 className="block px-4 py-2 bg-mdb-blue text-white rounded-xl hover:bg-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center text-center"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Apply
               </Link>
             </li>
           </ul>
        </div>
      </nav>
    </header>
  )
} 