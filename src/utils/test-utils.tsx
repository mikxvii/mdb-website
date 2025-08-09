import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock Next.js router context
const mockRouter = {
  back: jest.fn(),
  forward: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
}

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Test data
export const mockNavItems = [
  { key: 'about', href: '/about', label: 'About' },
  { key: 'projects', href: '/projects', label: 'Projects' },
  { key: 'training-program', href: '/training-program', label: 'Training Program' },
  { key: 'contact', href: '/contact', label: 'Contact' },
  { key: 'apply', href: '/apply', label: 'Apply' }
]

// Mock window functions
export const mockWindowFunctions = () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  Object.defineProperty(window, 'scrollTo', {
    writable: true,
    value: jest.fn(),
  })

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  })

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })),
  })
}

// Mock Intersection Observer
export const mockIntersectionObserver = () => {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))
}

// Mock Resize Observer
export const mockResizeObserver = () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))
}

// Test helpers
export const waitForElementToBeRemoved = (element: Element) => {
  return new Promise<void>((resolve) => {
    const observer = new MutationObserver(() => {
      if (!document.contains(element)) {
        observer.disconnect()
        resolve()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })
}

// Mock Next.js Image component
export const MockNextImage = ({ src, alt, ...props }: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} {...props} />
}

// Mock Next.js Link component
export const MockNextLink = ({ children, href, ...props }: any) => {
  return <a href={href} {...props}>{children}</a>
}

// Test constants
export const TEST_IDS = {
  HEADER: 'header',
  FOOTER: 'footer',
  NAVIGATION: 'navigation',
  MOBILE_MENU: 'mobile-menu',
  MOBILE_MENU_BUTTON: 'mobile-menu-button',
  TITLE_SECTION: 'title-section',
  PURPOSE_COMMUNITY: 'purpose-community',
  CAROUSEL: 'carousel',
  DESTINATIONS: 'destinations',
} as const

// Accessibility test helpers
export const checkAccessibility = async (container: HTMLElement) => {
  // Check for proper heading structure
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  expect(headings.length).toBeGreaterThan(0)

  // Check for proper alt text on images
  const images = container.querySelectorAll('img')
  images.forEach(img => {
    expect(img).toHaveAttribute('alt')
  })

  // Check for proper ARIA labels
  const elementsWithAriaLabel = container.querySelectorAll('[aria-label]')
  elementsWithAriaLabel.forEach(element => {
    expect(element).toHaveAttribute('aria-label')
  })
}

// Performance test helpers
export const measurePerformance = async (callback: () => void) => {
  const startTime = performance.now()
  await callback()
  const endTime = performance.now()
  return endTime - startTime
} 