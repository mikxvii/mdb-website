/**
 * Utility functions for image optimization and responsive sizing
 */

/**
 * Generate responsive sizes attribute for images based on breakpoints
 * @param breakpoints - Array of breakpoint widths and corresponding image sizes
 * @returns Formatted sizes string for Next.js Image component
 */
export function generateImageSizes(breakpoints: Array<{ width: number; size: string }>): string {
  return breakpoints
    .map(({ width, size }) => `(max-width: ${width}px) ${size}`)
    .join(', ')
}

/**
 * Common responsive size presets for different image types
 */
export const IMAGE_SIZES = {
  hero: '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw',
  logo: '(max-width: 640px) 200px, (max-width: 768px) 250px, (max-width: 1024px) 300px, 400px',
  card: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw',
  thumbnail: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
} as const

/**
 * Get optimal image quality based on image type and context
 * @param type - Type of image (hero, logo, card, thumbnail)
 * @param isPriority - Whether the image is above the fold
 * @returns Quality value between 60-95
 */
export function getImageQuality(type: keyof typeof IMAGE_SIZES, isPriority: boolean = false): number {
  if (isPriority) return 90
  if (type === 'hero') return 85
  if (type === 'logo') return 90
  if (type === 'card') return 80
  return 75
}
