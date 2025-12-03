module.exports = {
    // Login Page Test Data
    login: {
        validCredentials: {
            username: 'standard_user',
            password: 'secret_sauce'
        },
        invalidCredentials: {
            username: 'invalid_user',
            password: 'wrong_password'
        }
    },

    // Assertion Messages
    assertions: {
        loginPage: {
            title: 'Swag Labs',
            errorMessage: 'Epic sadface: Username and password do not match any user in this service'
        },
        dashboardPage: {
            title: 'Products',
            urlPattern: /.*inventory.html/
        }
    },

    // URLs
    urls: {
        baseUrl: 'https://www.saucedemo.com/'
    }
};
