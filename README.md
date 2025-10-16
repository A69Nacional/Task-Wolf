# 🐺 Task Wolf - Automated Testing Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript for web application validation.

## 🎯 Overview

Task Wolf is a production-ready automated testing suite that validates web applications across multiple browsers and devices. Built with modern testing practices and enterprise-grade patterns, it provides reliable, scalable test automation with both command-line and graphical interfaces.

## ✨ Features

- **Cross-Browser Testing** - Chrome, Firefox, Safari support
- **Mobile & Responsive Testing** - Tablet and mobile device validation
- **Performance Monitoring** - Load time and resource optimization testing
- **Visual Testing** - Screenshot capture and visual regression detection
- **CI/CD Ready** - Seamless integration with development pipelines
- **Interactive UI** - Built-in test runner with graphical interface
- **Comprehensive Reporting** - HTML reports with detailed analytics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd task-wolf

# Install dependencies
npm install

# Install browser engines
npm run install:browsers
```

### Basic Usage

```bash
# Run all tests
npm test

# Run tests with browser UI visible
npm run test:headed

# Open interactive test runner
npm run test:ui

# View test reports
npm run report
```

## 🎮 Executable GUI Runner

For non-technical users or quick demonstrations, Task Wolf includes standalone executable files:

### TaskWolfRunner.exe (Recommended)

A simple, user-friendly interface with essential testing options:

1. **Double-click** `dist/TaskWolfRunner.exe`
2. **Select test type** from the available options
3. **Click to execute** - tests run automatically
4. **View results** in the opened terminal window

Available test options:
- 🚀 **Run All Tests** - Complete test suite execution
- 👁️ **Run Tests (Visible)** - Watch automation in real-time
- 🎮 **Interactive Mode** - Select specific tests to run
- ⚡ **Performance Tests** - Speed and load time validation  
- 📱 **Mobile Tests** - Responsive design verification
- 📊 **View Report** - Open detailed HTML results

### Advanced GUI (TaskWolfGUI.exe)

Full-featured interface with integrated console output and extended options.

## 📊 Test Coverage

### Core Functionality
- Homepage loading and content validation
- Navigation flow testing
- Story interaction and clicking
- Multi-page browsing verification

### Advanced Testing
- **Search Operations** - Query processing and result validation
- **Content Structure** - Comments, stories, and page layout testing
- **Performance Metrics** - Page load times under 5 seconds
- **Responsive Design** - Mobile, tablet, and desktop compatibility
- **Error Handling** - Timeout management and retry logic

### Cross-Browser Support
- **Desktop**: Chrome, Firefox, Safari
- **Mobile**: iOS Safari, Android Chrome
- **Automated Screenshots** on test failures
- **Video Recording** for debugging complex issues

## 🛠 Available Commands

### Test Execution
```bash
npm test                    # Run all tests (headless)
npm run test:headed         # Run with visible browser
npm run test:debug          # Debug mode with breakpoints
npm run test:ui             # Interactive UI mode
```

### Browser-Specific Testing
```bash
npm run test:chrome         # Chrome-only execution
npm run test:firefox        # Firefox-only execution  
npm run test:safari         # Safari-only execution
npm run test:mobile         # Mobile device testing
```

### Test Categories
```bash
npm run test:performance    # Performance validation
npm run test:responsive     # Responsive design tests
```

### Reporting & Maintenance
```bash
npm run report              # View HTML test reports
npm run clean               # Clean test artifacts
```

## 🏗 Project Structure

```
├── dist/                   # Compiled executables
│   ├── TaskWolfRunner.exe  # Simple GUI runner
│   └── TaskWolfGUI.exe     # Advanced interface
├── pages/                  # Page Object Models
│   ├── HomePage.ts         # Main page interactions
│   └── SearchPage.ts       # Search functionality
├── tests/                  # Test specifications
│   ├── homepage.spec.ts    # Core homepage tests
│   ├── navigation.spec.ts  # Navigation flows
│   ├── search.spec.ts      # Search functionality
│   ├── comments.spec.ts    # Content validation
│   ├── performance.spec.ts # Speed testing
│   └── responsive.spec.ts  # Device compatibility
├── utils/                  # Helper utilities
│   └── TestHelper.ts       # Common functions
├── playwright.config.ts    # Test configuration
└── package.json           # Dependencies & scripts
```

## ⚙️ Configuration

### Playwright Configuration

The framework includes optimized settings for:
- **Timeouts**: 30s test timeout, 15s navigation timeout
- **Retries**: 3 attempts on CI, 1 locally
- **Parallel Execution**: Configurable worker count
- **Reporting**: HTML + JSON output formats

### Environment Settings

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },
  retries: process.env.CI ? 3 : 1,
  reporter: [['html'], ['json']],
  // ... additional configuration
});
```

## 📈 Performance Benchmarks

- **Test Suite Execution**: 110+ tests in under 3 minutes
- **Page Load Validation**: Sub-5-second loading requirements
- **Cross-Browser Coverage**: 5 different browser engines
- **Parallel Execution**: Up to 6 concurrent workers
- **Resource Efficiency**: Optimized for CI/CD environments

## 🔧 Development

### Adding New Tests

1. **Create test file** in `/tests` directory
2. **Follow naming convention**: `feature.spec.ts`
3. **Use Page Object pattern** for element interactions
4. **Include error handling** with retry logic

Example test structure:
```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Feature Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('should validate feature', async () => {
    // Test implementation
  });
});
```

### Page Object Implementation

```typescript
export class HomePage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/');
  }
  
  async clickElement() {
    await this.page.locator('.selector').click();
  }
}
```

## 🚀 Local Development

### Development Commands

```bash
# Watch mode for development
npm run test:debug

# Run specific test files
npx playwright test homepage.spec.ts

# Generate test reports
npm run report

# Clean test artifacts
npm run clean
```

### Extending the Framework

Add new test files in the `/tests` directory following the established patterns. Use the Page Object Model for maintainable test code.

## 📊 Reporting & Analytics

### HTML Reports
- Comprehensive test results with pass/fail statistics
- Screenshot capture on failures
- Performance metrics and timing data
- Interactive test exploration

### JSON Output
- Machine-readable results for CI integration
- Detailed timing and performance data
- Error tracking and failure analysis

## 🔍 Troubleshooting

### Common Issues

**Tests timing out:**
- Increase timeout values in `playwright.config.ts`
- Check network connectivity
- Verify target website availability

**Browser launch failures:**
- Run `npm run install:browsers`
- Check system permissions
- Verify Node.js version compatibility

**Flaky tests:**
- Review retry configuration
- Add explicit waits for dynamic content
- Use `page.waitForLoadState('networkidle')`

## 🤝 Contributing

To contribute to this project:
1. Create a new branch for your feature
2. Implement your changes following existing patterns
3. Ensure all tests pass
4. Update documentation as needed
5. Submit your improvements

## 📄 License

MIT License - see LICENSE file for details.

## 🏆 Acknowledgments

Built with modern testing practices and industry standards for reliable web application validation.