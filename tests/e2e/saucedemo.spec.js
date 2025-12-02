const test = require('../fixtures/pom.fixture');
const { expect } = require('@playwright/test');

test.describe('Sauce Demo End-to-End Tests (POM)', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('should load the login page', async ({ loginPage }) => {
        test.info().annotations.push({ type: 'tag', description: 'Login' });
        test.info().annotations.push({ type: 'tag', description: 'Smoke' });
        test.info().annotations.push({ type: 'category', description: 'UI' });
        await expect(loginPage.page).toHaveTitle('Swag Labs');
    });

    test('should log in with valid credentials', async ({ loginPage }) => {
        test.info().annotations.push({ type: 'tag', description: 'Login' });
        test.info().annotations.push({ type: 'tag', description: 'Functional' });
        test.info().annotations.push({ type: 'category', description: 'UI' });
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submit();
        await expect(loginPage.page).toHaveURL(/.*inventory.html/);
        await expect(loginPage.page.locator('.title')).toHaveText('Products');
    });

    test('should show error with invalid credentials', async ({ loginPage }) => {
        test.info().annotations.push({ type: 'tag', description: 'Login' });
        test.info().annotations.push({ type: 'tag', description: 'Functional' });
        test.info().annotations.push({ type: 'category', description: 'UI' });
        await loginPage.enterUsername('invalid_user');
        await loginPage.enterPassword('wrong_password');
        await loginPage.submit();
        await expect(loginPage.page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('should navigate to the dashboard after login', async ({ loginPage, dashboardPage }) => {
        test.info().annotations.push({ type: 'tag', description: 'Navigation' });
        test.info().annotations.push({ type: 'tag', description: 'Functional' });
        test.info().annotations.push({ type: 'category', description: 'UI' });
        await loginPage.enterUsername('standard_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.submit();
        await expect(dashboardPage.page).toHaveURL(/.*inventory.html/);
        await expect(dashboardPage.page.locator('.title')).toHaveText('Products');
    });
});