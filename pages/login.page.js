class LoginPage {
    constructor(page) {
        this.page = page;
        // Selectors for Sauce Demo
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    async enterUsername(username) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password) {
        await this.passwordInput.fill(password);
    }

    async submit() {
        await this.submitButton.click();
    }

    async getError() {
        return this.errorMessage.textContent();
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }
}

module.exports = LoginPage;