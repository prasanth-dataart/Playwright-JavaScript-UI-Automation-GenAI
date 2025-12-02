const base = require('@playwright/test');
const { test: baseTest } = base;
const LoginPage = require('../../pages/login.page');
const DashboardPage = require('../../pages/dashboard.page');

const test = baseTest.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }
});

module.exports = test;
exports.test = test;