const BasePage = require('./basePage');
const EnvConfig = require('../config/envConfig');
const Logger = require('../utils/logger');

/**
 * LoginPage - Page Object Model for Sauce Demo login page
 */
class LoginPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        // Selectors for Sauce Demo
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    /**
     * Enter username in the username field with error handling
     * @param {string} username
     * @throws {Error} If entering username fails
     */
    async enterUsername(username) {
        try {
            Logger.debug(`Entering username: ${username}`);
            await this.fillText(this.usernameInput, username);
            Logger.success(`Username entered successfully`);
        } catch (error) {
            Logger.error(`Failed to enter username: ${error.message}`);
            throw error;
        }
    }

    /**
     * Enter password in the password field with error handling
     * @param {string} password
     * @throws {Error} If entering password fails
     */
    async enterPassword(password) {
        try {
            Logger.debug(`Entering password`);
            await this.fillText(this.passwordInput, password);
            Logger.success(`Password entered successfully`);
        } catch (error) {
            Logger.error(`Failed to enter password: ${error.message}`);
            throw error;
        }
    }

    /**
     * Click the submit button with error handling
     * @throws {Error} If clicking submit fails
     */
    async submit() {
        try {
            Logger.debug(`Clicking submit button`);
            await this.clickElement(this.submitButton);
            Logger.success(`Submit button clicked`);
        } catch (error) {
            Logger.error(`Failed to click submit button: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get error message text
     * @returns {Promise<string>} Error message text
     */
    async getError() {
        try {
            const error = await this.getText(this.errorMessage);
            Logger.debug(`Error message: ${error}`);
            return error;
        } catch (error) {
            Logger.error(`Failed to get error message: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get expected error message from config
     * @returns {string}
     */
    getExpectedErrorMessage() {
        return EnvConfig.getErrorMessage();
    }

    /**
     * Get expected page title from config
     * @returns {string}
     */
    getExpectedPageTitle() {
        return EnvConfig.getLoginPageTitle();
    }

    /**
     * Get valid username from config
     * @returns {string}
     */
    getValidUsername() {
        return EnvConfig.getValidUsername();
    }

    /**
     * Get valid password from config
     * @returns {string}
     */
    getValidPassword() {
        return EnvConfig.getValidPassword();
    }

    /**
     * Get invalid username from config
     * @returns {string}
     */
    getInvalidUsername() {
        return EnvConfig.getInvalidUsername();
    }

    /**
     * Get invalid password from config
     * @returns {string}
     */
    getInvalidPassword() {
        return EnvConfig.getInvalidPassword();
    }

    /**
     * Get locked user username from config
     * @returns {string}
     */
    getLockedUsername() {
        return EnvConfig.getLockedUsername();
    }

    /**
     * Get locked user password from config
     * @returns {string}
     */
    getLockedPassword() {
        return EnvConfig.getLockedPassword();
    }

    /**
     * Get locked user error message from config
     * @returns {string}
     */
    getLockedUserErrorMessage() {
        return EnvConfig.getLockedUserError();
    }

    /**
     * Login with valid credentials and wait for navigation
     * @throws {Error} If login process fails
     */
    async loginWithValidCredentials() {
        try {
            Logger.step(1, 'Entering valid username');
            await this.enterUsername(this.getValidUsername());

            Logger.step(2, 'Entering valid password');
            await this.enterPassword(this.getValidPassword());

            Logger.step(3, 'Clicking submit button');
            await this.submit();

            Logger.step(4, 'Waiting for navigation to inventory page');
            await this.waitForURL(/.*inventory.html/, EnvConfig.getNavigationTimeout());
            Logger.success('Successfully logged in with valid credentials');
        } catch (error) {
            Logger.error(`Login with valid credentials failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Login with invalid credentials and wait for error
     * @throws {Error} If login process fails
     */
    async loginWithInvalidCredentials() {
        try {
            Logger.step(1, 'Entering invalid username');
            await this.enterUsername(this.getInvalidUsername());

            Logger.step(2, 'Entering invalid password');
            await this.enterPassword(this.getInvalidPassword());

            Logger.step(3, 'Clicking submit button');
            await this.submit();

            Logger.step(4, 'Waiting for error message to appear');
            await this.waitForElement(this.errorMessage, EnvConfig.getElementWaitTimeout());
            Logger.success('Error message appeared as expected');
        } catch (error) {
            Logger.error(`Login with invalid credentials failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Login with locked user account and wait for error
     * @throws {Error} If login process fails
     */
    async loginWithLockedUser() {
        try {
            Logger.step(1, 'Entering locked user username');
            await this.enterUsername(this.getLockedUsername());

            Logger.step(2, 'Entering password');
            await this.enterPassword(this.getLockedPassword());

            Logger.step(3, 'Clicking submit button');
            await this.submit();

            Logger.step(4, 'Waiting for locked user error message');
            await this.waitForElement(this.errorMessage, EnvConfig.getElementWaitTimeout());
            Logger.success('Locked user error message appeared');
        } catch (error) {
            Logger.error(`Login with locked user failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Launch the login page URL with error handling
     * @throws {Error} If navigation fails
     */
    async launchURL() {
        try {
            Logger.step(1, `Navigating to login page: ${EnvConfig.getBaseUrl()}`);
            await this.navigateTo(EnvConfig.getBaseUrl());
            Logger.success('Login page loaded successfully');
        } catch (error) {
            Logger.error(`Failed to launch login page: ${error.message}`);
            throw error;
        }
    }
}

module.exports = LoginPage;