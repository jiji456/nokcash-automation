import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NokCashPage } from '../pages/NokCashPage';
import { PaymentPage } from '../pages/PaymentPage';

test.describe('NokCash Flow - End to End', () => {
  test('E2E - Complete valid NokCash top-up flow', async ({ page }) => {
    const homePage = new HomePage(page);
    const nokCashPage = new NokCashPage(page);
    const paymentPage = new PaymentPage(page);

    // Step 1: Navigate to homepage
    await homePage.navigate('/');
    await expect(page).not.toHaveTitle('Just a moment...', { timeout: 15000 });

    // Step 2: NokCash banner should be visible
    const bannerVisible = await homePage.isNokCashBannerVisible();
    expect(bannerVisible).toBeTruthy();

    // Step 3: Click NokCash banner
    await homePage.clickNokCashBanner();
    await page.waitForURL('**/nok-cash', { timeout: 10000 }).catch(() => {});

    // Step 4: Either navigated to /nok-cash OR login modal appeared (both are valid)
    const urlAfterClick = page.url();
    const loginModalOnHome = await homePage.isLoginPopupVisible();
    expect(urlAfterClick.includes('/nok-cash') || loginModalOnHome).toBeTruthy();

    // Step 5: If login modal appeared, skip the rest (requires auth)
    if (!urlAfterClick.includes('/nok-cash')) {
      test.skip(true, 'E2E flow beyond login requires a valid test account');
      return;
    }

    // Step 6 (authenticated): Enter valid phone number
    await page.waitForSelector(nokCashPage.phoneInput, { timeout: 15000 });
    await nokCashPage.enterPhoneNumber('0812345678');
    expect(await nokCashPage.getErrorMessage()).not.toMatch(/invalid|ไม่ถูกต้อง/i);

    // Step 7: Select amount
    await nokCashPage.selectQuickAmount('100');
    expect(await nokCashPage.getErrorMessage()).not.toMatch(/invalid|ไม่ถูกต้อง/i);

    // Step 8: Submit form
    await nokCashPage.submitForm();
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});

    // Step 9: Verify payment summary page
    const summaryVisible = await paymentPage.isSummaryVisible();
    expect(summaryVisible).toBeTruthy();

    const phone = await paymentPage.getPhoneNumber();
    const amount = await paymentPage.getAmount();
    expect(phone).toContain('0812345678');
    expect(amount).toMatch(/100/);
  });
});
