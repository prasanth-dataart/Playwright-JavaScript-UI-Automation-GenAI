# Playwright JS Automation Framework

A professional, production-ready automation framework for web applications using Playwright with JavaScript. Includes end-to-end testing, comprehensive logging, error handling, and best practices for scalable test automation.

## ✨ Features

- **Page Object Model (POM)** - Clean separation of UI interactions and test logic
- **BasePage Class** - Reusable methods for common actions with error handling
- **Environment Configuration** - Externalized test data and credentials
- **Comprehensive Logging** - Colored console output for better debugging
- **Error Handling** - Try-catch blocks with meaningful error messages
- **Explicit Wait Strategies** - Avoid race conditions with proper wait mechanisms
- **Allure Reporting** - Detailed HTML reports with test annotations
- **Multi-browser Support** - Test across Chromium, Firefox, and WebKit
- **Data-Driven Testing** - Easy to extend with parameterized tests

## Project Structure

```
playwright-js-automation/
├── config/
│   └── envConfig.js                # Environment configuration management
├── pages/
│   ├── basePage.js                 # Base class with common methods
│   ├── login.page.js               # Login page object model
│   └── dashboard.page.js           # Dashboard page object model
├── tests/
│   ├── e2e/
│   │   └── saucedemo.spec.js       # End-to-end test suite
│   ├── fixtures/
│   │   └── pom.fixture.js          # Page object fixtures
│   └── data/
│       └── testData.js             # Test data (optional)
├── utils/
│   ├── helpers.js                  # Utility functions
│   └── logger.js                   # Logging utility
├── .env                            # Environment variables (DO NOT COMMIT)
├── .env.example                    # Environment variables template
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git** (for cloning repository)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd playwright-js-automation
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `@playwright/test` - Playwright testing framework
- `allure-playwright` - Allure reporting integration
- `dotenv` - Environment variable management
- Other utilities

### 3. Configure Environment Variables

Copy the example file and update with your values:

```bash
cp .env.example .env
```

Edit `.env` with your test credentials:

```env
# Test Credentials
VALID_USERNAME=standard_user
VALID_PASSWORD=secret_sauce
INVALID_USERNAME=invalid_user
INVALID_PASSWORD=wrong_password
LOCKED_USER_USERNAME=locked_out_user
LOCKED_USER_PASSWORD=secret_sauce

# Base URL
BASE_URL=https://www.saucedemo.com/

# Assertion Messages
LOGIN_PAGE_TITLE=Swag Labs
PRODUCTS_PAGE_TITLE=Products
ERROR_MESSAGE=Epic sadface: Username and password do not match any user in this service

# Timeouts
ELEMENT_WAIT_TIMEOUT=5000
NAVIGATION_TIMEOUT=10000
```

> ⚠️ **Important:** Add `.env` to `.gitignore` to avoid committing sensitive credentials

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npx playwright test tests/e2e/saucedemo.spec.js
```

### Run Tests in Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests in Headed Mode (see browser)

```bash
npx playwright test --headed
```

### Run Tests with Debug Mode

```bash
npx playwright test --debug
```

### Run Single Test

```bash
npx playwright test -g "should log in with valid credentials"
```

## Viewing Test Reports

### Playwright HTML Report

```bash
npx playwright show-report
```

### Allure Report

Generate and open the Allure report:

```bash
npm run allure:generate
npm run allure:open
```

Or in one command:

```bash
npm run test:allure
```

## Available NPM Scripts

```bash
npm test                 # Run all tests
npm run test:e2e        # Run E2E tests only
npm run test:api        # Run API tests only
npm run test:allure     # Run tests and generate Allure report
npm run allure:generate # Generate Allure report from results
npm run allure:open     # Open Allure report in browser
npm run clean:allure    # Clear Allure results
npm run clean:test-results # Clear test results
npm run setup:allure    # Setup Allure environment
npm run pretest         # Clean and setup before tests
```

## Framework Architecture

### BasePage Class

All page objects extend `BasePage` which provides:

```javascript
// Navigation
navigateTo(url)
waitForNavigation(timeout)
waitForURL(urlPattern, timeout)

// Element Interactions
fillText(locator, text)
clickElement(locator)
getText(locator)
waitForElement(locator, timeout)
isElementVisible(locator)

// Page Info
getPageTitle()
getCurrentURL()
reloadPage()
goBack()
pressKey(key)
```

### Logger Utility

Color-coded logging for debugging:

```javascript
Logger.info('Information message');
Logger.warn('Warning message');
Logger.error('Error message');
Logger.success('Success message');
Logger.debug('Debug message');
Logger.step(1, 'Test step description');
Logger.separator('Section Title');
Logger.testStart('Test Name');
Logger.testEnd('PASSED');
```

### Environment Configuration

Access test data from environment variables:

```javascript
const EnvConfig = require('../config/envConfig');

EnvConfig.getValidUsername();
EnvConfig.getBaseUrl();
EnvConfig.getErrorMessage();
EnvConfig.getElementWaitTimeout();
```

## Creating New Tests

### 1. Create POM if needed

```javascript
// pages/new-page.page.js
const BasePage = require('./basePage');
const Logger = require('../utils/logger');

class NewPage extends BasePage {
    constructor(page) {
        super(page);
        this.element = page.locator('#element-id');
    }

    async clickElement() {
        try {
            Logger.step(1, 'Clicking element');
            await this.clickElement(this.element);
            Logger.success('Element clicked');
        } catch (error) {
            Logger.error(`Failed to click: ${error.message}`);
            throw error;
        }
    }
}

module.exports = NewPage;
```

### 2. Add to Fixture

```javascript
// tests/fixtures/pom.fixture.js
const NewPage = require('../../pages/new-page');

const test = baseTest.extend({
    newPage: async ({ page }, use) => {
        await use(new NewPage(page));
    }
});
```

### 3. Create Test

```javascript
// tests/e2e/new-page.spec.js
const test = require('../fixtures/pom.fixture');
const { expect } = require('@playwright/test');
const Logger = require('../../utils/logger');

test.describe('New Page Tests', () => {
    test('should perform action', async ({ newPage }) => {
        Logger.testStart('New Page Test');
        
        Logger.step(1, 'Navigate to page');
        await newPage.navigateTo('https://example.com');
        
        Logger.step(2, 'Perform action');
        await newPage.clickElement();
        
        expect(true).toBe(true);
        Logger.testEnd('PASSED');
    });
});
```

## Best Practices

✅ **DO:**
- Use BasePage methods instead of direct page interactions
- Wrap async operations in try-catch blocks
- Add meaningful error messages
- Use Logger for debugging
- Externalize test data in .env
- Add JSDoc comments to methods
- Use proper waits instead of hardcoded delays
- Keep tests focused and independent

❌ **DON'T:**
- Hardcode URLs or credentials in tests
- Skip error handling
- Use setTimeout instead of explicit waits
- Create tests with side effects
- Ignore test failures
- Add sensitive data to git repository

## Troubleshooting

### Tests Timing Out

Increase timeout values in `.env`:

```env
ELEMENT_WAIT_TIMEOUT=10000
NAVIGATION_TIMEOUT=15000
```

### Tests Failing Intermittently

- Ensure proper waits are in place
- Check network conditions
- Review logs for timing issues
- Use `--debug` mode to step through

### Debugging Tests

```bash
# Debug mode with Inspector
npx playwright test --debug

# See detailed logs
npx playwright test --verbose

# View trace
npx playwright test --trace on
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
```

## Contributing

1. Create a feature branch
2. Make changes following best practices
3. Run tests to ensure they pass
4. Create a pull request

## License

MIT

## Support

For issues or questions:
1. Check the logs for error messages
2. Review test execution with `--debug` mode
3. Check Allure reports for detailed information
4. Consult the [Playwright Documentation](https://playwright.dev)

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Allure Report](https://docs.qameta.io/allure/)
- [Best Practices](https://github.com/microsoft/playwright/blob/main/docs/src/best-practices.md)
- [POM Pattern Guide](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

---

**Last Updated:** December 2025  
**Framework Version:** 2.0  
**Status:** Production Ready ✅