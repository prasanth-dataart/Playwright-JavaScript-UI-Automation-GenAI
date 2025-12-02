const fs = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'allure-results');

// Ensure allure-results directory exists
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
}

// Create executor.json
const executorJson = {
    name: 'Prasanth Mathi',
    type: 'LOCAL',
    url: 'http://localhost:3000',
    buildOrder: 1,
    buildName: 'Test Execution',
    buildUrl: 'http://localhost:3000'
};

fs.writeFileSync(
    path.join(resultsDir, 'executor.json'),
    JSON.stringify(executorJson, null, 2)
);

// Create environment.properties
const environmentProps = `Environment=TEST
Browser=Chromium,Firefox,WebKit
OS=Windows
Application=SauceDemo`;

fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    environmentProps
);

// Create categories.json
const categoriesJson = [
    {
        name: 'UI Tests',
        matchedStatuses: ['passed', 'failed'],
        matchedTags: ['UI']
    },
    {
        name: 'Login Tests',
        matchedStatuses: ['passed', 'failed'],
        matchedTags: ['Login']
    },
    {
        name: 'Smoke Tests',
        matchedStatuses: ['passed', 'failed'],
        matchedTags: ['Smoke']
    },
    {
        name: 'Functional Tests',
        matchedStatuses: ['passed', 'failed'],
        matchedTags: ['Functional']
    }
];

fs.writeFileSync(
    path.join(resultsDir, 'categories.json'),
    JSON.stringify(categoriesJson, null, 2)
);

console.log('✓ Allure metadata files created successfully');
