import { test, expect } from '@playwright/test';
import { NokCashPage } from '../pages/NokCashPage';

test.describe('NokCash Flow - Amount Selection', () => {
  let nokCashPage: NokCashPage;

  test.beforeEach(async ({ page }) => {
    nokCashPage = new NokCashPage(page);
    await nokCashPage.navigate();
    await expect(page).not.toHaveTitle('Just a moment...', { timeout: 15000 });
  });

  test('TC018 - Minimum amount (50 THB) should be accepted', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test amount input');

    await page.waitForSelector(nokCashPage.amountInput, { timeout: 10000 });
    await nokCashPage.enterAmount('50');
    const error = await nokCashPage.getErrorMessage();
    expect(error).not.toMatch(/ขั้นต่ำ|ต่ำสุด|invalid|ไม่ถูกต้อง/i);
  });

  test('TC021 - Quick select 100 THB should work', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test amount selection');

    await page.waitForSelector(nokCashPage.quickSelect100, { timeout: 10000 });
    await nokCashPage.selectQuickAmount('100');
    const error = await nokCashPage.getErrorMessage();
    expect(error).not.toMatch(/invalid|ไม่ถูกต้อง/i);
  });

  test('TC022 - Amount below minimum should show error', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test amount validation');

    await page.waitForSelector(nokCashPage.amountInput, { timeout: 10000 });
    await nokCashPage.enterAmount('49');
    await page.keyboard.press('Tab');
    const error = await nokCashPage.getErrorMessage();
    const canSubmit = await nokCashPage.isSubmitButtonEnabled();
    expect(error.length > 0 || !canSubmit).toBeTruthy();
  });

  test('TC024 - Zero amount should show error', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test amount validation');

    await page.waitForSelector(nokCashPage.amountInput, { timeout: 10000 });
    await nokCashPage.enterAmount('0');
    await page.keyboard.press('Tab');
    const error = await nokCashPage.getErrorMessage();
    const canSubmit = await nokCashPage.isSubmitButtonEnabled();
    expect(error.length > 0 || !canSubmit).toBeTruthy();
  });

  test('TC026 - Empty amount should show error', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test amount validation');

    await page.waitForSelector(nokCashPage.amountInput, { timeout: 10000 });
    await nokCashPage.enterAmount('');
    await page.keyboard.press('Tab');
    const error = await nokCashPage.getErrorMessage();
    const canSubmit = await nokCashPage.isSubmitButtonEnabled();
    expect(error.length > 0 || !canSubmit).toBeTruthy();
  });
});
