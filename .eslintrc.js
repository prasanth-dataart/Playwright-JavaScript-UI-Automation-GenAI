module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:playwright/playwright-test',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-unused-vars': 'warn',
    },
};