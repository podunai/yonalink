# SDET Interview Technical Assessment
*by: Andrii Podunai*

## 💻 Project Description
This project automates the process of ordering a product with an addon on the [cPanel Store](https://store.cpanel.net/index.php) using [Playwright](https://playwright.dev). The automation includes verifying that the product and addon are correctly added to the cart, validated during checkout, and that the relevant registration and payment UI elements appear.

## 📀 Setup and Installation

### Steps to Set Up
1. Clone the repository:
```bash
git clone https://github.com/podunai/cPanel.git
```

2. Navigate to the project directory:
```bash
cd cPanel
```

3. Install the dependencies:
```bash
npm install
```

4. Install Playwright browsers (if not already installed):
```bash
npx playwright install
```

## Running the Tests
1. To run the automated tests, execute the following command:
```bash
npx playwright test
```
