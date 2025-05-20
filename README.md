# Yonalink Automated Tests

This project contains automated UI tests for the Yonalink web application, implemented with Playwright and TypeScript.

---

## Features

- End-to-end tests using [Playwright](https://playwright.dev/)
- Test data loaded dynamically from CSV files
- Page Object Model for maintainable and reusable test code
- ESLint and Prettier configured for consistent code style
- Runs tests with detailed HTML reports

---

## Prerequisites

- Node.js (>=16.x)
- npm (comes with Node.js)
- A modern web browser (Chromium new version)

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yonalink-tests.git

2. Install dependencies:

   ```bash
   npm install
   npx playwright install

## Running Tests
    npx playwright test

## 🧪 Test Steps

This automated test validates the **"Request a Demo"** form on [yonalink.com](https://www.yonalink.com) by performing the following steps:

1. Open the **yonalink.com** website
2. Click on **"Schedule a Demo"** button in the top-right corner
3. Fill out the form using data from a CSV file (3 different clients with different optional fields)
4. Submit the form and validate error handling (form error message is expected)
