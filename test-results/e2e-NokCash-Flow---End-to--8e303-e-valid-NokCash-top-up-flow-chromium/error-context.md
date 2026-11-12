# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> NokCash Flow - End to End >> E2E - Complete valid NokCash top-up flow
- Location: tests\e2e.spec.ts:11:3

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { HomePage } from '../pages/HomePage';
  3  | import { NokCashPage } from '../pages/NokCashPage';
  4  | import { PaymentPage } from '../pages/PaymentPage';
  5  | 
  6  | test.describe('NokCash Flow - End to End', () => {
  7  |   let homePage: HomePage;
  8  |   let nokCashPage: NokCashPage;
  9  |   let paymentPage: PaymentPage;
  10 | 
  11 |   test('E2E - Complete valid NokCash top-up flow', async ({ page }) => {
  12 |     homePage = new HomePage(page);
  13 |     nokCashPage = new NokCashPage(page);
  14 |     paymentPage = new PaymentPage(page);
  15 | 
  16 |     // Step 1: Navigate to homepage
  17 |     await homePage.navigate();
> 18 |     expect(await homePage.isNokCashBannerVisible()).toBeTruthy();
     |                                                     ^ Error: expect(received).toBeTruthy()
  19 | 
  20 |     // Step 2: Click NokCash banner
  21 |     await homePage.clickNokCashBanner();
  22 |     await expect(page).toHaveURL(/nokcash|topup/i);
  23 | 
  24 |     // Step 3: Enter phone number
  25 |     await nokCashPage.enterPhoneNumber('0812345678');
  26 |     const phoneError = await nokCashPage.getErrorMessage();
  27 |     expect(phoneError).not.toContain('Invalid');
  28 | 
  29 |     // Step 4: Enter amount
  30 |     await nokCashPage.selectQuickAmount('100');
  31 |     const amountError = await nokCashPage.getErrorMessage();
  32 |     expect(amountError).not.toContain('Invalid');
  33 | 
  34 |     // Step 5: Submit form
  35 |     await nokCashPage.submitForm();
  36 | 
  37 |     // Step 6: Verify payment page
  38 |     await expect(page).toHaveURL(/payment|summary/i);
  39 |     expect(await paymentPage.isSummaryVisible()).toBeTruthy();
  40 | 
  41 |     // Step 7: Validate order summary
  42 |     const phone = await paymentPage.getPhoneNumber();
  43 |     const amount = await paymentPage.getAmount();
  44 |     expect(phone).toContain('0812345678');
  45 |     expect(amount).toContain('100');
  46 |   });
  47 | });
  48 | 
```