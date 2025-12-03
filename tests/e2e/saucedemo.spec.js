const test = require('../fixtures/pom.fixture');
const { expect } = require('@playwright/test');
const { addTestAnnotations } = require('../../utils/helpers');
const Logger = require('../../utils/logger');

test.describe('Sauce Demo End-to-End Tests (POM)', () => {
    test.beforeEach(async ({ loginPage }) => {
        Logger.testStart('Sauce Demo Login Tests');
        await loginPage.launchURL();
    });

    test.afterEach(async ({ }, testInfo) => {
        if (testInfo.status !== 'passed') {
            Logger.testEnd('FAILED');
        } else {
            Logger.testEnd('PASSED');
        }
    });

    test('should load the login page', async ({ loginPage }) => {
        addTestAnnotations(test.info(), ['Login', 'Smoke'], 'UI');
        Logger.step('1', 'Verify login page title');
        const title = await loginPage.getPageTitle();
        expect(title).toBe(loginPage.getExpectedPageTitle());
        Logger.success('Login page title verified');
    });

    test('should log in with valid credentials', async ({ loginPage, dashboardPage }) => {
        addTestAnnotations(test.info(), ['Login', 'Functional'], 'UI');
        Logger.separator('Valid Credentials Test');

        Logger.step('1', 'Perform login with valid credentials');
        await loginPage.loginWithValidCredentials();

        Logger.step('2', 'Verify URL changed to inventory page');
        expect(loginPage.page.url()).toMatch(dashboardPage.getExpectedURLPattern());

        Logger.step('3', 'Verify products page is displayed');
        await dashboardPage.verifyProductsPageDisplayed();
        Logger.success('Valid credentials login test passed');
    });

    test('should show error with invalid credentials', async ({ loginPage }) => {
        addTestAnnotations(test.info(), ['Login', 'Functional'], 'UI');
        Logger.separator('Invalid Credentials Test');

        Logger.step('1', 'Perform login with invalid credentials');
        await loginPage.loginWithInvalidCredentials();

        Logger.step('2', 'Verify error message is displayed');
        const errorText = await loginPage.getError();
        expect(errorText).toBe(loginPage.getExpectedErrorMessage());
        Logger.success('Invalid credentials error test passed');
    });

    test('should lock user after multiple failed attempts', async ({ loginPage }) => {
        addTestAnnotations(test.info(), ['Login', 'Functional'], 'UI');
        Logger.separator('Locked User Test');

        Logger.step('1', 'Perform login with locked user account');
        await loginPage.loginWithLockedUser();

        Logger.step('2', 'Verify locked user error message');
        const errorText = await loginPage.getError();
        expect(errorText).toContain('locked');
        Logger.success('Locked user test passed');
    });

    test('should navigate to the dashboard after login', async ({ loginPage, dashboardPage }) => {
        addTestAnnotations(test.info(), ['Navigation', 'Functional'], 'UI');
        Logger.separator('Navigation Test');

        Logger.step('1', 'Login with valid credentials');
        await loginPage.loginWithValidCredentials();

        Logger.step('2', 'Wait for inventory items to load');
        await dashboardPage.waitForInventoryItemsToLoad();

        Logger.step('3', 'Verify inventory items are present');
        const itemCount = await dashboardPage.getInventoryItemCount();
        expect(itemCount).toBeGreaterThan(0);
        Logger.success(`Navigation test passed - ${itemCount} items found`);
    });

    test('should allow user to go back to login page', async ({ loginPage, dashboardPage, page }) => {
        addTestAnnotations(test.info(), ['Navigation', 'Functional'], 'UI');
        Logger.separator('Back Navigation Test');

        Logger.step('1', 'Login with valid credentials');
        await loginPage.loginWithValidCredentials();

        Logger.step('2', 'Verify we are on dashboard');
        expect(page.url()).toMatch(dashboardPage.getExpectedURLPattern());

        Logger.step('3', 'Go back to login page');
        await dashboardPage.goBack();

        Logger.step('4', 'Verify we are back on login page');
        const title = await page.title();
        expect(title).toBe(loginPage.getExpectedPageTitle());
        Logger.success('Back navigation test passed');
    });
});