'use client'
import { useState, useEffect } from 'react'

interface UseAnimationLoadOptions {
  delay?: number
  useRequestAnimationFrame?: boolean
}

export function useAnimationLoad(options: UseAnimationLoadOptions = {}) {
  const { delay = 0, useRequestAnimationFrame = true } = options
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (delay === 0 && !useRequestAnimationFrame) {
      setIsLoaded(true)
      return
    }

    if (useRequestAnimationFrame) {
      // Use requestAnimationFrame for smoother animations
      const timer = requestAnimationFrame(() => {
        if (delay > 0) {
          setTimeout(() => setIsLoaded(true), delay)
        } else {
          setIsLoaded(true)
        }
      })
      
      return () => cancelAnimationFrame(timer)
    } else {
      // Use regular timeout
      const timer = setTimeout(() => setIsLoaded(true), delay)
      return () => clearTimeout(timer)
    }
  }, [delay, useRequestAnimationFrame])

  const reset = () => setIsLoaded(false)

  return { isLoaded, reset }
}
