'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

export default function Footer() {
  const { isAuthenticated, user } = useAuth()

  return (
    <footer className="w-full bg-mdb-light-blue/80 backdrop-blur-md border-t border-mdb-light-blue shadow-lg py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12">
          
          {/* Logo and Organization Name - Left Side */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center mb-4">
              <Image
                src="/logos/mdb_5.png"
                alt="MDB Logo"
                width={80}
                height={80}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
              <div className="ml-3">
                <h3 className="text-md sm:text-lg lg:text-2xl font-raleway-bold text-mdb-blue drop-shadow-sm leading-tight">
                  Mobile Developers of Berkeley
                </h3>
              </div>
            </div>
          </div>

          {/* Pages and Contact Sections - Right Side */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 w-full sm:w-auto">
            {/* Pages Section */}
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-raleway-bold text-mdb-blue mb-3 sm:mb-4">Pages</h4>
              <div className="space-y-1 sm:space-y-2">
                <Link 
                  href="/" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  About
                </Link>
                <Link 
                  href="/projects" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  Projects
                </Link>
                <Link 
                  href="/training-program" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  Training Program
                </Link>
                <Link 
                  href="/apply" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  Apply
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-raleway-bold text-mdb-blue mb-3 sm:mb-4">Contact</h4>
              <div className="space-y-1 sm:space-y-2">
                <Link 
                  href="/contact" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  Contact Us
                </Link>
                <a 
                  href="mailto:contact@mdb.berkeley.edu" 
                  className="block text-gray-700 hover:text-mdb-blue transition-colors duration-200 text-sm sm:text-base"
                >
                  Email
                </a>
              </div>
            </div>

            {/* Admin Section */}
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-raleway-bold text-mdb-blue mb-3 sm:mb-4">Admin</h4>
              <div className="space-y-1 sm:space-y-2">
                <Link 
                  href="/admin-login" 
                  className="block text-gray-700 hover:text-mdb-blue transition-all duration-200 text-sm sm:text-base hover:scale-110"
                >
                  {isAuthenticated ? 'Dashboard' : 'Log in'}
                </Link>
                {isAuthenticated && (
                  <div className="text-xs text-green-600 font-medium">
                    ✓ {user?.email}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-blue-300 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <p className="text-center text-gray-600 text-xs sm:text-sm">
            &copy; 2025 Mobile Developers of Berkeley. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 