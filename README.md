# Playwright Test Automation Project

This repository contains automated tests written using Playwright, a modern end-to-end testing framework for web applications.

## Prerequisites

Before running the tests, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A modern web browser (Chrome, Firefox, or Safari)

## Project Structure

```
├── pages/           # Page Object Models
├── tests/           # Test files
├── fixtures/        # Test fixtures and shared configurations
├── testData/        # Test data files
├── Utilities/       # Utility functions and helpers
├── allure-report/   # Allure test reports
├── allure-results/  # Raw test results for Allure
└── test-results/    # Playwright test results and artifacts
```

## Installation

1. Clone this repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Install dependencies:
```bash
npm install
```

4. Install Playwright browsers:
```bash
npx playwright install
```

## Approach used to execute the end to end fow

1. There is 1 master test case file that has all the steps and validations included in the document
2. Due to test steps interdependancy, the flow executes in sequence instead of running prallely.
3. The flow executes in sequence - Login -> GO to project -> go to fields -> Add new field -> go to records -> edit all records -> Search for field in searchbar -> Validate document highlight.
4. All the test are done with POM structure with all locators in pages and test file only used to call the reusable functions. 
5. For new Fields, a random generator generates the number in defined format.

## Running Tests

This project includes various npm scripts to run tests in different configurations:

### Basic Test Execution
```bash
# Run tests in Chrome (default configuration)
npm run test

# Run tests with UI mode
npm run test:ui

# Run tests in headed mode (browser visible)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests in parallel (with 4 workers)
npm run test:parallel
```

### Running Specific Tests
```bash
# Run a specific test file
npm run test:file

# Run tests with specific tag (e.g., @smoke)
npm run test:grep

# Run tests in specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Test Recording and Codegen
```bash
# Generate tests with Codegen (Chrome)
npm run codegen

# Generate tests for specific browsers
npm run codegen:chrome
npm run codegen:firefox
```

### Browser Installation
```bash
# Install all supported browsers with dependencies
npm run install:browsers
```

### Cleaning Test Results
```bash
# Clean all test results, reports, and artifacts
npm run clean
```

## Test Reports

### Playwright HTML Report
To view the standard Playwright HTML report:
```bash
npm run report
```

### Allure Reports

This project uses Allure for test reporting. After running the tests:

To generate and open the Allure report in one command:
```bash
npm run report:allure
```

This command will:
1. Generate a fresh Allure report from the test results
2. Clean previous report data
3. Open the report in your default browser

The Allure report provides:
- Detailed test execution statistics
- Test case descriptions and scenarios
- Screenshots and videos of failed tests
- Test execution timeline
- Detailed error logs and stack traces


## Troubleshooting

- If tests fail with timeout errors, try increasing the timeout in `playwright.config.js`
- For debugging, use the `--headed` flag and add `await page.pause()` in your test
- Check the `test-results/` directory for screenshots and videos of failed tests

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Allure Framework](https://docs.qameta.io/allure/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)