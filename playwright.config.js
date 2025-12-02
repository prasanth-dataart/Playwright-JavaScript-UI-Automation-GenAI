module.exports = {
    testDir: 'tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    reporter: [
        ['list'],
        ['allure-playwright', {
            outputFolder: 'allure-results',
            detail: true,
            suiteTitle: true,
        }]
    ],
    use: {
        headless: false,
        actionTimeout: 0,
        trace: 'on-first-retry',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
    ],
};