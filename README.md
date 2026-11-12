# NokCash Automation Testing

Automated testing for NokCash top-up flow using Playwright with Page Object Model (POM).

## 🏗️ Project Structure

```
nokcash-automation/
├── pages/              # Page Object Model
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── NokCashPage.ts
│   └── PaymentPage.ts
├── tests/              # Test cases
│   ├── homepage.spec.ts
│   ├── phone-number.spec.ts
│   ├── amount.spec.ts
│   └── e2e.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## 🚀 Installation

```bash
cd nokcash-automation
npm install
npx playwright install
```

## 📝 Running Tests

```bash
# Run all tests
npm test

# Run with headed mode
npm run test:headed

# Run with UI mode
npm run test:ui

# Debug tests
npm run test:debug
```

## ⚠️ Note on Selectors

Selectors in this project are placeholder selectors based on common patterns. To make tests pass:

1. Inspect the actual NokCash page on https://xn--42c7azbc3d0a.com/
2. Update selectors in `pages/` files with actual element selectors
3. Use Playwright's codegen: `npx playwright codegen https://xn--42c7azbc3d0a.com/`

## 📋 Test Coverage

Selected test scenarios from Assignment 2:

- Homepage Navigation (TC001, TC002)
- Phone Number Input (TC006, TC010, TC012, TC014)
- Amount Selection (TC018, TC021, TC022, TC024, TC026)
- End-to-End Flow (Complete valid flow)

Total: 10 automated test cases

## 🎯 Page Object Model

Pages are implemented using POM pattern:
- **BasePage**: Common page methods
- **HomePage**: Homepage navigation
- **NokCashPage**: NokCash top-up form
- **PaymentPage**: Payment summary validation

## ✅ Requirements Met

- ✅ Selected scenarios from Assignment 2
- ✅ Implemented with Page Object Model
- ✅ Uses Playwright framework
- ✅ TypeScript for type safety
- ✅ Ready for GitHub submission
