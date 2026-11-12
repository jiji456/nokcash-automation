import { test, expect } from '@playwright/test';
import { NokCashPage } from '../pages/NokCashPage';

test.describe('NokCash Flow - Phone Number Input', () => {
  let nokCashPage: NokCashPage;

  test.beforeEach(async ({ page }) => {
    nokCashPage = new NokCashPage(page);
    await nokCashPage.navigate();
    await expect(page).not.toHaveTitle('Just a moment...', { timeout: 15000 });
  });

  test('TC003 - Accessing NokCash page without login should show login modal', async ({ page }) => {
    // /nok-cash requires authentication — login modal must appear
    const loginRequired = await nokCashPage.isLoginRequired();
    expect(loginRequired).toBeTruthy();
    // Modal text should ask user to log in
    const modalText = await page.locator('[data-testid="option-modal"]').textContent();
    expect(modalText).toContain('ล็อกอิน');
  });

  test('TC006 - Valid 10-digit phone number should be accepted', async ({ page }) => {
    // This test requires login — skip if login modal blocks access
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test phone input');

    await nokCashPage.enterPhoneNumber('0812345678');
    const error = await nokCashPage.getErrorMessage();
    expect(error).not.toMatch(/invalid|ไม่ถูกต้อง|ไม่ถูกรูปแบบ/i);
  });

  test('TC010 - 9-digit phone number should show error', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test phone input');

    await nokCashPage.enterPhoneNumber('081234567');
    await page.keyboard.press('Tab');
    const error = await nokCashPage.getErrorMessage();
    const canSubmit = await nokCashPage.isSubmitButtonEnabled();
    expect(error.length > 0 || !canSubmit).toBeTruthy();
  });

  test('TC012 - Non-numeric phone number should show error', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test phone input');

    await nokCashPage.enterPhoneNumber('abc1234567');
    await page.keyboard.press('Tab');
    const error = await nokCashPage.getErrorMessage();
    const canSubmit = await nokCashPage.isSubmitButtonEnabled();
    expect(error.length > 0 || !canSubmit).toBeTruthy();
  });

  test('TC014 - Empty phone number should show error', async ({ page }) => {
    const loginRequired = await nokCashPage.isLoginRequired();
    test.skip(loginRequired, 'Requires authenticated session to test phone input');

    await nokCashPage.enterPhoneNumber('');
    await page.keyboard.press('Tab');
    const error = await nokCashPage.getErrorMessage();
    const canSubmit = await nokCashPage.isSubmitButtonEnabled();
    expect(error.length > 0 || !canSubmit).toBeTruthy();
  });
});
