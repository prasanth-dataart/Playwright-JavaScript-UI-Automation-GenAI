# Playwright JS Automation Framework

This project is an automation framework for web applications using Playwright with JavaScript. It includes end-to-end and API testing capabilities, along with utility functions and page object models to streamline the testing process.

## Project Structure

```
playwright-js-automation
├── tests
│   ├── e2e
│   │   └── example.spec.js        # End-to-end tests
│   ├── api
│   │   └── example-api.spec.js    # API tests
│   └── fixtures
│       └── auth.fixture.js         # Authentication fixtures
├── pages
│   ├── login.page.js               # Login page object
│   └── dashboard.page.js           # Dashboard page object
├── utils
│   └── helpers.js                  # Utility functions
├── .vscode
│   ├── launch.json                 # Debugging configuration
│   └── settings.json               # Workspace settings
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── .gitignore                      # Git ignore file
├── playwright.config.js            # Playwright configuration
├── package.json                    # NPM configuration
└── README.md                       # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd playwright-js-automation
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run tests:**
   - For end-to-end tests:
     ```
     npx playwright test tests/e2e
     ```
   - For API tests:
     ```
     npx playwright test tests/api
     ```

## Usage

- The framework uses page object models to encapsulate page interactions. 
- Utility functions are available in the `utils/helpers.js` file for common tasks.
- Fixtures for authentication can be found in `tests/fixtures/auth.fixture.js`.

### POM Usage (Page Object Model)

This project uses a small POM pattern with Playwright fixtures to provide page objects directly to tests. The provided fixture is `tests/fixtures/pom.fixture.js` and exposes `loginPage` and `dashboardPage` objects in test callbacks.

Example test (using the POM fixture):

```
const test = require('../fixtures/pom.fixture');
const { expect } = require('@playwright/test');

test('login and verify inventory', async ({ loginPage }) => {
   await loginPage.goto();
   await loginPage.enterUsername('standard_user');
   await loginPage.enterPassword('secret_sauce');
   await loginPage.submit();
   await expect(loginPage.page).toHaveURL(/.*inventory.html/);
});
```

How to add a new Page Object:

- Create a new file under `pages/`, for example `pages/profile.page.js`.
- Implement a class that accepts a Playwright `page` in the constructor and exposes methods for interactions.
- Export the class with `module.exports = ProfilePage;`.
- Add a fixture entry in `tests/fixtures/pom.fixture.js` to expose the new page to tests, for example:

```
const ProfilePage = require('../../pages/profile.page');

const test = baseTest.extend({
   profilePage: async ({ page }, use) => {
      await use(new ProfilePage(page));
   },
});
```

How to add a new test using the POM:

- Place the test file under `tests/e2e/` or another test folder.
- Import the POM fixture as shown in the example above and use the page objects in the test body.

Running tests (examples):

```
npx playwright test tests/e2e/saucedemo.spec.js
npm run test:allure   # runs tests, generates and opens Allure report
```