module.exports = {
    waitForElement: async (page, selector, timeout = 5000) => {
        await page.waitForSelector(selector, { timeout });
    },

    generateRandomString: (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    },

    formatDate: (date) => {
        return date.toISOString().split('T')[0];
    }
};