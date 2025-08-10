'use client'
import { useEffect, useRef, useState, RefObject } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

interface UseMultipleIntersectionObserverOptions {
  elements: Array<{
    ref: RefObject<HTMLElement>
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
  }>
}

// Common intersection observer configurations
export const COMMON_THRESHOLDS = {
  subtle: 0.1,
  medium: 0.3,
  prominent: 0.5
} as const

export const COMMON_ROOT_MARGINS = {
  mobile: '0px 0px -50px 0px',
  tablet: '0px 0px -100px 0px',
  desktop: '0px 0px -150px 0px'
} as const

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  
  const {
    threshold = COMMON_THRESHOLDS.medium,
    rootMargin = COMMON_ROOT_MARGINS.mobile,
    triggerOnce = true
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { isVisible, elementRef }
}

export function useMultipleIntersectionObserver(options: UseMultipleIntersectionObserverOptions) {
  const [visibilityStates, setVisibilityStates] = useState<{ [key: string]: boolean }>({})
  const elementRefs = useRef<{ [key: string]: RefObject<HTMLElement> }>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    options.elements.forEach((elementConfig, index) => {
      const key = `element-${index}`
      elementRefs.current[key] = elementConfig.ref

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibilityStates(prev => ({ ...prev, [key]: true }))
            if (elementConfig.triggerOnce !== false) {
              observer.unobserve(entry.target)
            }
          } else if (elementConfig.triggerOnce !== false) {
            setVisibilityStates(prev => ({ ...prev, [key]: false }))
          }
        },
        { 
          threshold: elementConfig.threshold || COMMON_THRESHOLDS.medium,
          rootMargin: elementConfig.rootMargin || COMMON_ROOT_MARGINS.mobile
        }
      )

      if (elementConfig.ref.current) {
        observer.observe(elementConfig.ref.current)
      }
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [options.elements])

  return { visibilityStates, elementRefs }
}

// Convenience hook for common section animations
export function useSectionAnimation<T extends HTMLElement = HTMLElement>(options: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
} = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<T>(null)
  
  const {
    threshold = COMMON_THRESHOLDS.medium,
    rootMargin = COMMON_ROOT_MARGINS.tablet,
    triggerOnce = options.triggerOnce !== false
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce])

  return { isVisible, elementRef }
}
