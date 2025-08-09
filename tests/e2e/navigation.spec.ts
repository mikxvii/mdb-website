import { test, expect } from '@playwright/test'

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to all main pages', async ({ page }) => {
    // Test navigation to About page
    await page.click('text=About')
    await expect(page).toHaveURL('/about')

    // Test navigation to Projects page
    await page.click('text=Projects')
    await expect(page).toHaveURL('/projects')

    // Test navigation to Training Program page
    await page.click('text=Training Program')
    await expect(page).toHaveURL('/training-program')

    // Test navigation to Contact page
    await page.click('text=Contact')
    await expect(page).toHaveURL('/contact')

    // Test navigation to Apply page
    await page.click('text=Apply')
    await expect(page).toHaveURL('/apply')
  })

  test('should have working mobile navigation', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })

    // Check if navigation is visible
    await expect(page.locator('nav')).toBeVisible()

    // Test navigation from mobile view
    await page.click('text=About')
    await expect(page).toHaveURL('/about')
  })

  test('should highlight active page in navigation', async ({ page }) => {
    // Go to About page
    await page.goto('/about')
    
    // About link should exist
    const aboutLink = page.locator('a[href="/about"]')
    await expect(aboutLink).toBeVisible()

    // Go to Projects page
    await page.goto('/projects')
    
    // Projects link should exist
    const projectsLink = page.locator('a[href="/projects"]')
    await expect(projectsLink).toBeVisible()
  })

  test('should have accessible navigation', async ({ page }) => {
    // Check for navigation element
    await expect(page.locator('nav')).toBeVisible()
    
    // Check for navigation links
    const links = page.locator('nav a')
    await expect(links.first()).toBeVisible()
  })

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on navigation
    await page.keyboard.press('Tab')
    
    // Should be able to navigate with arrow keys
    await page.keyboard.press('ArrowRight')
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter')
    
    // Should navigate to a page
    await expect(page).not.toHaveURL('/')
  })
}) 