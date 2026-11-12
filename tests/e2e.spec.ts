import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NokCashPage } from '../pages/NokCashPage';
import { PaymentPage } from '../pages/PaymentPage';

test.describe('NokCash Flow - End to End', () => {
  let homePage: HomePage;
  let nokCashPage: NokCashPage;
  let paymentPage: PaymentPage;

  test('E2E - Complete valid NokCash top-up flow', async ({ page }) => {
    homePage = new HomePage(page);
    nokCashPage = new NokCashPage(page);
    paymentPage = new PaymentPage(page);

    // Step 1: Navigate to homepage
    await homePage.navigate();
    expect(await homePage.isNokCashBannerVisible()).toBeTruthy();

    // Step 2: Click NokCash banner
    await homePage.clickNokCashBanner();
    await expect(page).toHaveURL(/nokcash|topup/i);

    // Step 3: Enter phone number
    await nokCashPage.enterPhoneNumber('0812345678');
    const phoneError = await nokCashPage.getErrorMessage();
    expect(phoneError).not.toContain('Invalid');

    // Step 4: Enter amount
    await nokCashPage.selectQuickAmount('100');
    const amountError = await nokCashPage.getErrorMessage();
    expect(amountError).not.toContain('Invalid');

    // Step 5: Submit form
    await nokCashPage.submitForm();

    // Step 6: Verify payment page
    await expect(page).toHaveURL(/payment|summary/i);
    expect(await paymentPage.isSummaryVisible()).toBeTruthy();

    // Step 7: Validate order summary
    const phone = await paymentPage.getPhoneNumber();
    const amount = await paymentPage.getAmount();
    expect(phone).toContain('0812345678');
    expect(amount).toContain('100');
  });
});
