class DashboardPage {
    constructor(page) {
        this.page = page;
        // Selectors for Sauce Demo inventory page
        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
    }

    async getUserGreeting() {
        return await this.pageTitle.textContent();
    }

    async navigateToSettings() {
        // Not applicable for Sauce Demo; placeholder
        throw new Error('navigateToSettings not implemented for this site');
    }
}

module.exports = DashboardPage;