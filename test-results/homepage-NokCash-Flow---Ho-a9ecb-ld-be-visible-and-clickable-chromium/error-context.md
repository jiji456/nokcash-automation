# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> NokCash Flow - Homepage Navigation >> TC001 - NokCash banner should be visible and clickable
- Location: tests\homepage.spec.ts:13:3

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
  4  | 
  5  | test.describe('NokCash Flow - Homepage Navigation', () => {
  6  |   let homePage: HomePage;
  7  | 
  8  |   test.beforeEach(async ({ page }) => {
  9  |     homePage = new HomePage(page);
  10 |     await homePage.navigate();
  11 |   });
  12 | 
  13 |   test('TC001 - NokCash banner should be visible and clickable', async () => {
> 14 |     expect(await homePage.isNokCashBannerVisible()).toBeTruthy();
     |                                                     ^ Error: expect(received).toBeTruthy()
  15 |   });
  16 | 
  17 |   test('TC002 - Click NokCash banner should navigate to top-up page', async ({ page }) => {
  18 |     await homePage.clickNokCashBanner();
  19 |     await expect(page).toHaveURL(/nokcash|topup/i);
  20 |   });
  21 | });
  22 | 
```