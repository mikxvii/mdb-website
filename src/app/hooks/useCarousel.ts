import { useMemo } from 'react'
import { CAROUSEL_ITEMS } from '../constants/carousel'
import { CarouselItem } from '../types/members'

export const useCarousel = () => {
  // Memoized results for better performance
  const memoizedCarouselItems = useMemo(() => CAROUSEL_ITEMS, [])

  // Get items by strip
  const getItemsByStrip = (strip: number) => {
    return memoizedCarouselItems
      .filter(item => item.strip === strip)
      .sort((a, b) => a.order - b.order)
  }

  // Get all strips
  const getStrips = () => {
    const strips = [1, 2, 3]
    return strips.map(strip => ({
      id: strip,
      items: getItemsByStrip(strip)
    }))
  }

  return {
    carouselItems: memoizedCarouselItems,
    loading: false,
    error: null,
    loadCarouselItems: () => Promise.resolve(),
    addCarouselItem: () => Promise.reject(new Error('Static data - cannot add carousel items')),
    updateCarouselItemById: () => Promise.reject(new Error('Static data - cannot update carousel items')),
    removeCarouselItem: () => Promise.reject(new Error('Static data - cannot remove carousel items')),
    reorderItems: () => Promise.reject(new Error('Static data - cannot reorder carousel items')),
    getItemsByStrip,
    getStrips
  }
}
