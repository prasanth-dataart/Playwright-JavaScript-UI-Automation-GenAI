const BasePage = require('./basePage');
const EnvConfig = require('../config/envConfig');
const Logger = require('../utils/logger');

/**
 * DashboardPage - Page Object Model for Sauce Demo dashboard/inventory page
 */
class DashboardPage extends BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        // Selectors for Sauce Demo inventory page
        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('//span[@class="title"]');
    }

    /**
     * Get user greeting/page title text
     * @returns {Promise<string>}
     */
    async getUserGreeting() {
        try {
            const greeting = await this.getText(this.pageTitle);
            Logger.debug(`Page greeting: ${greeting}`);
            return greeting;
        } catch (error) {
            Logger.error(`Failed to get user greeting: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get expected products title from config
     * @returns {string}
     */
    getExpectedProductsTitle() {
        return EnvConfig.getProductsPageTitle();
    }

    /**
     * Get expected URL pattern for dashboard
     * @returns {RegExp}
     */
    getExpectedURLPattern() {
        return /.*inventory.html/;
    }

    /**
     * Verify that the products page is displayed
     * @throws {Error} If page is not the products page
     */
    async verifyProductsPageDisplayed() {
        try {
            Logger.step(1, 'Checking if products title is visible');
            const isVisible = await this.isElementVisible(this.pageTitle);

            if (!isVisible) {
                throw new Error('Products title is not visible');
            }

            Logger.step(2, 'Getting products title text');
            const titleText = await this.getText(this.pageTitle);
            const expectedTitle = this.getExpectedProductsTitle();

            if (titleText.trim() !== expectedTitle.trim()) {
                throw new Error(`Expected title "${expectedTitle}" but got "${titleText}"`);
            }

            Logger.success('Products page verified successfully');
        } catch (error) {
            Logger.error(`Failed to verify products page: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get count of inventory items
     * @returns {Promise<number>}
     */
    async getInventoryItemCount() {
        try {
            const count = await this.inventoryItems.count();
            Logger.debug(`Found ${count} inventory items`);
            return count;
        } catch (error) {
            Logger.error(`Failed to get inventory item count: ${error.message}`);
            throw error;
        }
    }

    /**
     * Wait for inventory items to load
     * @throws {Error} If inventory items don't appear within timeout
     */
    async waitForInventoryItemsToLoad() {
        try {
            Logger.debug('Waiting for inventory items to load');
            await this.waitForElement(this.inventoryItems, EnvConfig.getElementWaitTimeout());
            Logger.success('Inventory items loaded');
        } catch (error) {
            Logger.error(`Failed to wait for inventory items: ${error.message}`);
            throw error;
        }
    }
}

module.exports = DashboardPage;