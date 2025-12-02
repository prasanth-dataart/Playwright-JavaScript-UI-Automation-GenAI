module.exports = {
    validUser: {
        username: 'testuser',
        password: 'password123'
    },
    invalidUser: {
        username: 'invaliduser',
        password: 'wrongpassword'
    },
    setupAuth: async (page) => {
        await page.goto('/login');
        await page.fill('input[name="username"]', module.exports.validUser.username);
        await page.fill('input[name="password"]', module.exports.validUser.password);
        await page.click('button[type="submit"]');
        await page.waitForNavigation();
    }
};