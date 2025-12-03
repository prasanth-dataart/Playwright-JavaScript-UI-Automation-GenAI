require('dotenv').config();

/**
 * EnvConfig - Centralized environment configuration management
 */
class EnvConfig {
    // Credentials
    static getValidUsername() {
        return process.env.VALID_USERNAME || 'standard_user';
    }

    static getValidPassword() {
        return process.env.VALID_PASSWORD || 'secret_sauce';
    }

    static getInvalidUsername() {
        return process.env.INVALID_USERNAME || 'invalid_user';
    }

    static getInvalidPassword() {
        return process.env.INVALID_PASSWORD || 'wrong_password';
    }

    static getLockedUsername() {
        return process.env.LOCKED_USER_USERNAME || 'locked_out_user';
    }

    static getLockedPassword() {
        return process.env.LOCKED_USER_PASSWORD || 'secret_sauce';
    }

    // URLs
    static getBaseUrl() {
        return process.env.BASE_URL || 'https://www.saucedemo.com/';
    }

    // Assertion Messages
    static getLoginPageTitle() {
        return process.env.LOGIN_PAGE_TITLE || 'Swag Labs';
    }

    static getProductsPageTitle() {
        return process.env.PRODUCTS_PAGE_TITLE || 'Products';
    }

    static getErrorMessage() {
        return process.env.ERROR_MESSAGE || 'Epic sadface: Username and password do not match any user in this service';
    }

    static getLockedUserError() {
        return process.env.LOCKED_USER_ERROR || 'Epic sadface: Sorry, this user has been locked out.';
    }

    // Timeouts
    static getElementWaitTimeout() {
        return parseInt(process.env.ELEMENT_WAIT_TIMEOUT) || 5000;
    }

    static getNavigationTimeout() {
        return parseInt(process.env.NAVIGATION_TIMEOUT) || 10000;
    }

    /**
     * Get all configuration values (useful for debugging)
     */
    static getAllConfig() {
        return {
            validUsername: this.getValidUsername(),
            validPassword: this.getValidPassword(),
            invalidUsername: this.getInvalidUsername(),
            invalidPassword: this.getInvalidPassword(),
            lockedUsername: this.getLockedUsername(),
            lockedPassword: this.getLockedPassword(),
            baseUrl: this.getBaseUrl(),
            loginPageTitle: this.getLoginPageTitle(),
            productsPageTitle: this.getProductsPageTitle(),
            errorMessage: this.getErrorMessage(),
            lockedUserError: this.getLockedUserError(),
            elementWaitTimeout: this.getElementWaitTimeout(),
            navigationTimeout: this.getNavigationTimeout()
        };
    }
}

module.exports = EnvConfig;
