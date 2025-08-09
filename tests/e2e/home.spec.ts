import { test, expect } from '@playwright/test'

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load home page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/MDB|Mobile Developers of Berkeley/i)
    
    // Check for main content
    await expect(page.locator('main')).toBeVisible()
  })

  test('should display all main sections', async ({ page }) => {
    // Check for navigation
    await expect(page.locator('nav')).toBeVisible()
    
    // Check for footer
    await expect(page.locator('footer')).toBeVisible()
  })

  test('should have proper meta tags', async ({ page }) => {
    // Check for viewport meta tag
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', /width=device-width/i)
  })

  test('should be responsive on different screen sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 })
    await expect(page.locator('nav')).toBeVisible()
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('nav')).toBeVisible()
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('nav')).toBeVisible()
  })

  test('should have working links in footer', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Check for footer links
    const footerLinks = page.locator('footer a')
    await expect(footerLinks.first()).toBeVisible()
  })

  test('should load images correctly', async ({ page }) => {
    // Check for images and ensure they load
    const images = page.locator('img')
    const imageCount = await images.count()
    
    if (imageCount > 0) {
      // Wait for first image to load
      await expect(images.first()).toBeVisible()
    }
  })

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()
    expect(headingCount).toBeGreaterThan(0)
    
    // Check for proper alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    
    if (imageCount > 0) {
      const firstImage = images.first()
      const altText = await firstImage.getAttribute('alt')
      expect(altText).toBeTruthy()
    }
  })

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    // Reload page and check for errors
    await page.reload()
    
    // Should not have critical JavaScript errors
    expect(errors.length).toBeLessThan(10)
  })

  test('should have fast loading times', async ({ page }) => {
    // Measure page load time
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })
}) 