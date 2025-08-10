'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickedItem, setClickedItem] = useState<string | null>(null)
  const [bubblePosition, setBubblePosition] = useState({ left: 0, width: 0 })
  const [isInitialized, setIsInitialized] = useState(false)
  const navRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})
  const pathname = usePathname()
  const lastActiveItem = useRef<string | null>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleClick = (itemKey: string) => {
    setClickedItem(itemKey)
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      updateBubblePositionImmediate(itemKey)
    })
  }

  const updateBubblePositionImmediate = (itemKey: string) => {
    const itemElement = itemRefs.current[itemKey]
    const navElement = navRef.current
    
    if (itemElement && navElement) {
      const navRect = navElement.getBoundingClientRect()
      const itemRect = itemElement.getBoundingClientRect()
      
      if (navRect.width > 0 && itemRect.width > 0) {
        const left = itemRect.left - navRect.left
        const width = itemRect.width
        
        if (left >= 0 && width > 0) {
          setBubblePosition({
            left: Math.round(left - 2),
            width: Math.round(width + 4)
          })
          return true
        }
      }
    }
    return false
  }

  const updateBubblePositionDelayed = (itemKey: string) => {
    const attemptUpdate = () => {
      const itemElement = itemRefs.current[itemKey]
      const navElement = navRef.current
      
      if (itemElement && navElement) {
        const navRect = navElement.getBoundingClientRect()
        const itemRect = itemElement.getBoundingClientRect()
        
        if (navRect.width > 0 && itemRect.width > 0) {
          const left = itemRect.left - navRect.left
          const width = itemRect.width
          
          if (left >= 0 && width > 0) {
            setBubblePosition({
              left: Math.round(left - 2),
              width: Math.round(width + 4)
            })
            return true
          }
        }
      }
      return false
    }

    // Try immediately first, then with a single delay if needed
    if (!attemptUpdate()) {
      requestAnimationFrame(() => {
        if (!attemptUpdate()) {
          setTimeout(attemptUpdate, 100)
        }
      })
    }
  }

  const navItems = [
    { key: 'about', href: '/about', label: 'About' },
    { key: 'projects', href: '/projects', label: 'Projects' },
    { key: 'training-program', href: '/training-program', label: 'Training Program' },
    { key: 'contact', href: '/contact', label: 'Contact' },
    { key: 'apply', href: '/apply', label: 'Apply' }
  ]

  // Determine which item should show the bubble (current page or clicked item)
  const activeItem = clickedItem || navItems.find(item => item.href === pathname)?.key || null

  // Initialize bubble position on mount and handle pathname changes
  useEffect(() => {
    // Reset clicked item when navigating to a new page
    setClickedItem(null)
    
    if (activeItem) {
      // For page loads, use delayed timing with multiple attempts
      updateBubblePositionDelayed(activeItem)
      lastActiveItem.current = activeItem
    }
    
    // Mark as initialized after first render
    if (!isInitialized) {
      setTimeout(() => setIsInitialized(true), 100)
    }
  }, [pathname, activeItem, isInitialized])

  // Additional effect to handle window resize and ensure bubble stays aligned
  useEffect(() => {
    const handleResize = () => {
      if (activeItem) {
        updateBubblePositionDelayed(activeItem)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeItem])

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-white/20 backdrop-blur-md text-mdb-blue shadow-lg border border-white/20 rounded-2xl">
      <nav className="font-raleway-semibold container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logos/mdb_4.svg"
              alt="MDB Website"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul 
            ref={navRef} 
            className="hidden md:flex space-x-6 relative"
          >
            {/* Sliding Bubble Background */}
            {activeItem && (
              <div 
                className={`absolute top-0 h-full rounded-xl transition-all duration-300 ease-out ${
                  activeItem === 'apply' ? 'bg-mdb-gold' : 'bg-mdb-blue'
                }`}
                style={{
                  left: bubblePosition.width > 0 ? `${bubblePosition.left}px` : '0px',
                  width: bubblePosition.width > 0 ? `${bubblePosition.width}px` : '100px',
                  zIndex: -1
                }}
              />
            )}
            
            {navItems.map((item) => (
              <li key={item.key}>
                <Link 
                  href={item.href}
                  ref={(el) => {
                    itemRefs.current[item.key] = el
                    // Only update on ref set if it's the active item, we're initialized, and it's a new active item
                    if (el && activeItem === item.key && isInitialized && lastActiveItem.current !== item.key) {
                      updateBubblePositionDelayed(item.key)
                      lastActiveItem.current = item.key
                    }
                  }}
                  onClick={() => handleClick(item.key)}
                  className={`block px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:drop-shadow-lg origin-center relative text-center min-w-[80px] ${
                    activeItem === item.key 
                      ? item.key === 'apply' ? 'text-mdb-blue font-semibold' : 'text-white'
                      : 'text-mdb-blue hover:text-mdb-blue/80'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
          <ul className="flex flex-col space-y-4 py-4 mdb-glass backdrop-blur-sm rounded-lg px-4 text-center">
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
                className="block px-4 py-2 bg-mdb-blue text-white rounded-xl hover:bg-mdb-blue/80 hover:scale-110 hover:translate-x-1 transition-all duration-300 transform hover:drop-shadow-lg origin-center text-center mx-auto max-w-[120px]"
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