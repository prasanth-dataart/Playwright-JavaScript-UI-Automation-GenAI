module.exports = {
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
    },

    addTestAnnotations: (testInfo, tags = [], category = '') => {
        if (Array.isArray(tags)) {
            tags.forEach(tag => {
                testInfo.annotations.push({ type: 'tag', description: tag });
            });
        }
        if (category) {
            testInfo.annotations.push({ type: 'category', description: category });
        }
    }
};