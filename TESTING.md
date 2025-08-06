# Testing Guide for MDB Website

This document provides comprehensive information about the testing setup for the MDB website project.

## 🧪 Testing Overview

The MDB website uses a multi-layered testing approach:

- **Unit Tests**: Testing individual components and functions
- **Integration Tests**: Testing component interactions
- **End-to-End Tests**: Testing complete user workflows
- **Accessibility Tests**: Ensuring the site is accessible
- **Performance Tests**: Monitoring loading times and performance

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Run All Tests

```bash
npm run test:all
```

### Run Specific Test Types

```bash
# Unit tests only
npm run test

# Unit tests with coverage
npm run test:coverage

# End-to-end tests
npm run test:e2e

# End-to-end tests with UI
npm run test:e2e:ui

# End-to-end tests in headed mode
npm run test:e2e:headed
```

## 📁 Test Structure

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── __tests__/          # Component unit tests
│   │   └── __tests__/              # Page unit tests
│   └── utils/
│       └── test-utils.tsx          # Testing utilities
├── tests/
│   └── e2e/                        # End-to-end tests
├── jest.config.js                  # Jest configuration
├── jest.setup.js                   # Jest setup file
├── playwright.config.ts            # Playwright configuration
└── .github/workflows/test.yml      # CI/CD pipeline
```

## 🧩 Unit Testing

### Writing Component Tests

Use React Testing Library for component tests. Here's an example:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

describe('Header Component', () => {
  it('renders navigation items', () => {
    render(<Header />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('toggles mobile menu', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    const menuButton = screen.getByRole('button', { name: /menu/i })
    await user.click(menuButton)
    
    expect(screen.getByRole('navigation')).toBeVisible()
  })
})
```

### Testing Utilities

Use the custom test utilities from `src/utils/test-utils.tsx`:

```tsx
import { render, mockWindowFunctions } from '@/utils/test-utils'

describe('Component Test', () => {
  beforeEach(() => {
    mockWindowFunctions()
  })

  it('test component', () => {
    render(<YourComponent />)
    // Your test here
  })
})
```

### Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Accessibility**: Ensure components are accessible
4. **Mock External Dependencies**: Mock Next.js router, API calls, etc.
5. **Use Descriptive Test Names**: Make test names clear and descriptive

## 🌐 End-to-End Testing

### Writing E2E Tests

Use Playwright for end-to-end tests. Here's an example:

```tsx
import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to all pages', async ({ page }) => {
    await page.goto('/')
    
    await page.click('text=About')
    await expect(page).toHaveURL('/about')
    
    await page.click('text=Projects')
    await expect(page).toHaveURL('/projects')
  })
})
```

### E2E Test Structure

- **Navigation Tests**: Test site navigation and routing
- **User Flow Tests**: Test complete user journeys
- **Responsive Tests**: Test on different screen sizes
- **Accessibility Tests**: Test keyboard navigation and screen readers
- **Performance Tests**: Test loading times and performance

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test navigation.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
```

## 🎯 Test Coverage

### Coverage Goals

- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

### Generating Coverage Report

```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage/` directory.

## 🔧 Configuration Files

### Jest Configuration (`jest.config.js`)

- Uses Next.js Jest preset
- Configures test environment for DOM testing
- Sets up module mapping for TypeScript paths
- Configures coverage collection

### Playwright Configuration (`playwright.config.ts`)

- Tests on multiple browsers (Chrome, Firefox, Safari)
- Tests on mobile devices
- Configures test reporting
- Sets up web server for testing

### Jest Setup (`jest.setup.js`)

- Configures testing library matchers
- Mocks Next.js components and hooks
- Sets up global test utilities
- Configures console error handling

## 🚀 Continuous Integration

### GitHub Actions Workflow

The `.github/workflows/test.yml` file runs:

1. **Unit Tests**: Jest tests with coverage
2. **E2E Tests**: Playwright tests on multiple browsers
3. **Linting**: ESLint checks
4. **Type Checking**: TypeScript compilation
5. **Build**: Production build verification

### Running Tests Locally

```bash
# Run all CI checks locally
npm run lint
npx tsc --noEmit
npm run test:coverage
npm run test:e2e
npm run build
```

## 🎨 Testing UI Components

### Testing Styled Components

When testing components with Tailwind CSS:

```tsx
it('applies correct styles', () => {
  render(<Button>Click me</Button>)
  
  const button = screen.getByRole('button')
  expect(button).toHaveClass('bg-blue-600', 'text-white')
})
```

### Testing Responsive Design

```tsx
it('is responsive', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator('nav')).toBeVisible()
  
  await page.setViewportSize({ width: 1920, height: 1080 })
  await expect(page.locator('nav')).toBeVisible()
})
```

## ♿ Accessibility Testing

### Automated Accessibility Tests

```tsx
it('meets accessibility standards', async ({ page }) => {
  await page.goto('/')
  
  // Check for proper heading structure
  await expect(page.locator('h1')).toBeVisible()
  
  // Check for alt text on images
  const images = page.locator('img')
  const imageCount = await images.count()
  
  for (let i = 0; i < imageCount; i++) {
    const altText = await images.nth(i).getAttribute('alt')
    expect(altText).toBeTruthy()
  }
})
```

### Manual Accessibility Testing

1. **Keyboard Navigation**: Test all functionality with keyboard only
2. **Screen Reader**: Test with screen reader software
3. **Color Contrast**: Verify sufficient color contrast
4. **Focus Management**: Ensure proper focus indicators

## 📊 Performance Testing

### Loading Time Tests

```tsx
it('loads within acceptable time', async ({ page }) => {
  const startTime = Date.now()
  await page.goto('/')
  const loadTime = Date.now() - startTime
  
  expect(loadTime).toBeLessThan(3000) // 3 seconds
})
```

### Performance Monitoring

- Monitor Core Web Vitals
- Track bundle sizes
- Monitor API response times
- Check for memory leaks

## 🐛 Debugging Tests

### Debugging Unit Tests

```bash
# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- Header.test.tsx

# Run tests with verbose output
npm test -- --verbose
```

### Debugging E2E Tests

```bash
# Run with headed mode
npm run test:e2e:headed

# Run with UI mode
npm run test:e2e:ui

# Run with debug mode
DEBUG=pw:api npx playwright test
```

### Common Issues

1. **Timing Issues**: Use `waitFor` for async operations
2. **Mock Issues**: Ensure all mocks are properly set up
3. **Environment Issues**: Check Node.js version and dependencies
4. **Browser Issues**: Update Playwright browsers

## 📝 Adding New Tests

### For New Components

1. Create test file: `src/app/components/__tests__/NewComponent.test.tsx`
2. Import component and testing utilities
3. Write tests for rendering, interactions, and edge cases
4. Ensure accessibility testing

### For New Pages

1. Create test file: `src/app/__tests__/newpage.test.tsx`
2. Test page rendering and navigation
3. Test page-specific functionality
4. Add E2E tests for user flows

### For New Features

1. Add unit tests for individual functions
2. Add integration tests for component interactions
3. Add E2E tests for complete user journeys
4. Update test coverage goals if needed

## 🤝 Contributing to Tests

### Test Review Checklist

- [ ] Tests cover all main functionality
- [ ] Tests include edge cases and error states
- [ ] Tests are accessible and follow best practices
- [ ] Test names are descriptive and clear
- [ ] Coverage meets project standards
- [ ] Tests run without flakiness

### Reporting Test Issues

When reporting test issues, include:

1. Test file and test name
2. Expected vs actual behavior
3. Steps to reproduce
4. Environment details (OS, Node version, etc.)
5. Error messages or screenshots

## 📚 Additional Resources

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [Accessibility Testing Guide](https://www.w3.org/WAI/ER/tools/)

## 🎯 Testing Roadmap

### Future Improvements

- [ ] Add visual regression testing
- [ ] Implement performance benchmarking
- [ ] Add API mocking with MSW
- [ ] Implement contract testing
- [ ] Add load testing for critical paths
- [ ] Implement automated accessibility audits 