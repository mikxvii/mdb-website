'use client'
import { useState, useEffect, useMemo } from 'react'

interface UseTypingAnimationOptions {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
  loop?: boolean
}

export function useTypingAnimation({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true
}: UseTypingAnimationOptions) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeedState, setTypeSpeedState] = useState(typeSpeed)

  const memoizedWords = useMemo(() => words, [words])

  useEffect(() => {
    const currentWord = memoizedWords[currentWordIndex]
    
    const handleType = () => {
      if (isDeleting) {
        // Backspace effect
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        setTypeSpeedState(deleteSpeed)
        
        if (currentText === '') {
          setIsDeleting(false)
          if (loop) {
            setCurrentWordIndex((prev) => (prev + 1) % memoizedWords.length)
          } else if (currentWordIndex < memoizedWords.length - 1) {
            setCurrentWordIndex(prev => prev + 1)
          }
          setTypeSpeedState(typeSpeed)
        }
      } else {
        // Typing effect
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        setTypeSpeedState(typeSpeed)
        
        if (currentText === currentWord) {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), pauseDuration)
          return
        }
      }
    }

    const timer = setTimeout(handleType, typeSpeedState)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, typeSpeedState, memoizedWords, typeSpeed, deleteSpeed, pauseDuration, loop])

  const reset = () => {
    setCurrentWordIndex(0)
    setCurrentText('')
    setIsDeleting(false)
    setTypeSpeedState(typeSpeed)
  }

  return {
    currentText,
    currentWordIndex,
    isDeleting,
    reset,
    isComplete: !loop && currentWordIndex === memoizedWords.length - 1 && currentText === memoizedWords[memoizedWords.length - 1]
  }
}
