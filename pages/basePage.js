/**
 * BasePage - Base class for all page objects
 * Provides common methods and utilities used across all pages
 */
class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param {string} url - The URL to navigate to
     * @throws {Error} If navigation fails
     * @returns {Promise<void>}
     */
    async navigateTo(url) {
        try {
            await this.page.goto(url, { waitUntil: 'networkidle' });
        } catch (error) {
            throw new Error(`Failed to navigate to ${url}: ${error.message}`);
        }
    }

    /**
     * Fill text in an input field
     * @param {Locator} locator - The element locator
     * @param {string} text - Text to enter
     * @throws {Error} If element not found or text entry fails
     * @returns {Promise<void>}
     */
    async fillText(locator, text) {
        try {
            await locator.fill(text);
        } catch (error) {
            throw new Error(`Failed to fill text: ${error.message}`);
        }
    }

    /**
     * Click an element
     * @param {Locator} locator - The element locator
     * @throws {Error} If element not found or click fails
     * @returns {Promise<void>}
     */
    async clickElement(locator) {
        try {
            await locator.click();
        } catch (error) {
            throw new Error(`Failed to click element: ${error.message}`);
        }
    }

    /**
     * Get text content from an element
     * @param {Locator} locator - The element locator
     * @returns {Promise<string>} The text content
     * @throws {Error} If element not found or text retrieval fails
     */
    async getText(locator) {
        try {
            return await locator.textContent();
        } catch (error) {
            throw new Error(`Failed to get text: ${error.message}`);
        }
    }

    /**
     * Check if element is visible
     * @param {Locator} locator - The element locator
     * @returns {Promise<boolean>} True if visible, false otherwise
     */
    async isElementVisible(locator) {
        try {
            return await locator.isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * Wait for element to be visible
     * @param {Locator} locator - The element locator
     * @param {number} timeout - Wait timeout in milliseconds
     * @throws {Error} If element doesn't become visible within timeout
     * @returns {Promise<void>}
     */
    async waitForElement(locator, timeout = 5000) {
        try {
            await locator.waitFor({ state: 'visible', timeout });
        } catch (error) {
            throw new Error(`Element did not appear within ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Wait for navigation to complete
     * @param {number} timeout - Wait timeout in milliseconds
     * @returns {Promise<void>}
     */
    async waitForNavigation(timeout = 10000) {
        try {
            await this.page.waitForLoadState('networkidle', { timeout });
        } catch (error) {
            throw new Error(`Navigation timeout after ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Wait for URL to match pattern
     * @param {RegExp|string} urlPattern - URL pattern to match
     * @param {number} timeout - Wait timeout in milliseconds
     * @throws {Error} If URL doesn't match within timeout
     * @returns {Promise<void>}
     */
    async waitForURL(urlPattern, timeout = 10000) {
        try {
            await this.page.waitForURL(urlPattern, { timeout });
        } catch (error) {
            throw new Error(`URL did not match pattern within ${timeout}ms: ${error.message}`);
        }
    }

    /**
     * Get current page title
     * @returns {Promise<string>} The page title
     */
    async getPageTitle() {
        try {
            return this.page.title();
        } catch (error) {
            throw new Error(`Failed to get page title: ${error.message}`);
        }
    }

    /**
     * Get current page URL
     * @returns {string} The current URL
     */
    getCurrentURL() {
        return this.page.url();
    }

    /**
     * Reload the page
     * @returns {Promise<void>}
     */
    async reloadPage() {
        try {
            await this.page.reload();
        } catch (error) {
            throw new Error(`Failed to reload page: ${error.message}`);
        }
    }

    /**
     * Go back to previous page
     * @returns {Promise<void>}
     */
    async goBack() {
        try {
            await this.page.goBack();
        } catch (error) {
            throw new Error(`Failed to go back: ${error.message}`);
        }
    }

    /**
     * Press a key
     * @param {string} key - Key to press (e.g., 'Enter', 'Escape')
     * @returns {Promise<void>}
     */
    async pressKey(key) {
        try {
            await this.page.keyboard.press(key);
        } catch (error) {
            throw new Error(`Failed to press key ${key}: ${error.message}`);
        }
    }
}

module.exports = BasePage;
