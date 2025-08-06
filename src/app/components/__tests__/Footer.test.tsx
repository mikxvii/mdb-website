import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('displays organization name', () => {
    render(<Footer />)
    expect(screen.getByText('Mobile Developers of Berkeley')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    
    // Check for footer links
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('displays copyright information', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 Mobile Developers of Berkeley/i)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    
    // Should have contact email
    const emailLink = screen.getByText('Email')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@mdb.berkeley.edu')
  })

  it('displays all page links', () => {
    render(<Footer />)
    
    const expectedPages = ['Home', 'About', 'Projects', 'Training Program', 'Apply']
    expectedPages.forEach(page => {
      expect(screen.getByText(page)).toBeInTheDocument()
    })
  })

  it('has contact us link', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })
}) 