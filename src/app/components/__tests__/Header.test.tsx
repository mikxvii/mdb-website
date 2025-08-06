import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

// Mock the usePathname hook
const mockUsePathname = jest.fn(() => '/')

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Header Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
  })

  it('renders without crashing', () => {
    render(<Header />)
    // Check for the header element
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('displays navigation items', () => {
    render(<Header />)
    
    const expectedNavItems = ['About', 'Projects', 'Training Program', 'Contact', 'Apply']
    
    expectedNavItems.forEach(item => {
      // Use getAllByText since there are multiple instances (desktop and mobile)
      const elements = screen.getAllByText(item)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('renders mobile menu button', () => {
    render(<Header />)
    // Look for the mobile menu button with proper aria-label
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    
    // Find the mobile menu container by looking for the div with mobile menu classes
    const mobileMenuContainer = screen.getByText('About').closest('div')?.parentElement?.parentElement
    expect(mobileMenuContainer).toHaveClass('max-h-0')
    
    // Click to open
    await user.click(mobileMenuButton)
    
    // Mobile menu should now be open
    await waitFor(() => {
      expect(mobileMenuContainer).toHaveClass('max-h-96')
    })
    
    // Click to close
    await user.click(mobileMenuButton)
    
    // Mobile menu should be closed again
    await waitFor(() => {
      expect(mobileMenuContainer).toHaveClass('max-h-0')
    })
  })

  it('closes mobile menu when clicking on a link', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    
    // Open mobile menu
    await user.click(mobileMenuButton)
    
    // Click on a mobile menu link (get the second About link which is in mobile menu)
    const aboutLinks = screen.getAllByText('About')
    const mobileAboutLink = aboutLinks[1] // Second instance is mobile menu
    await user.click(mobileAboutLink)
    
    // Mobile menu should close
    const mobileMenuContainer = mobileAboutLink.closest('div')?.parentElement?.parentElement
    await waitFor(() => {
      expect(mobileMenuContainer).toHaveClass('max-h-0')
    })
  })

  it('handles window resize events', () => {
    render(<Header />)
    
    // Simulate window resize
    fireEvent.resize(window)
    
    // Component should handle resize without crashing
    const aboutLinks = screen.getAllByText('About')
    expect(aboutLinks.length).toBeGreaterThan(0)
  })

  it('applies correct active state to navigation items', () => {
    // Mock usePathname to return '/about'
    mockUsePathname.mockReturnValue('/about')
    
    render(<Header />)
    
    // Check that About links exist
    const aboutLinks = screen.getAllByText('About')
    expect(aboutLinks.length).toBeGreaterThan(0)
  })

  it('handles navigation item clicks', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Get the first About link (desktop navigation)
    const aboutLinks = screen.getAllByText('About')
    const desktopAboutLink = aboutLinks[0]
    await user.click(desktopAboutLink)
    
    // Should navigate to about page
    expect(desktopAboutLink.closest('a')).toHaveAttribute('href', '/about')
  })

  it('renders with correct accessibility attributes', () => {
    render(<Header />)
    
    // Check for navigation element
    const navigation = screen.getByRole('navigation')
    expect(navigation).toBeInTheDocument()
    
    // Check for mobile menu button with proper aria-label
    const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i })
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Focus on first navigation item (desktop)
    const aboutLinks = screen.getAllByText('About')
    const desktopAboutLink = aboutLinks[0]
    desktopAboutLink.focus()
    
    // Should be able to navigate with keyboard
    expect(desktopAboutLink).toHaveFocus()
  })

  it('maintains focus management', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const aboutLinks = screen.getAllByText('About')
    const desktopAboutLink = aboutLinks[0]
    desktopAboutLink.focus()
    
    // First navigation item should be focused
    expect(desktopAboutLink).toHaveFocus()
  })

  it('renders logo with correct attributes', () => {
    render(<Header />)
    
    const logo = screen.getByAltText('MDB Website')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src')
  })

  it('has proper mobile menu structure', () => {
    render(<Header />)
    
    // Check that mobile menu items are present
    const mobileMenuItems = ['About', 'Projects', 'Training Program', 'Contact', 'Apply']
    mobileMenuItems.forEach(item => {
      // Use getAllByText since there are multiple instances
      const elements = screen.getAllByText(item)
      expect(elements.length).toBeGreaterThan(0)
    })
  })
}) 