import { test, expect } from '@playwright/test';
import { NokCashPage } from '../pages/NokCashPage';

test.describe('NokCash Flow - Phone Number Input', () => {
  let nokCashPage: NokCashPage;

  test.beforeEach(async ({ page }) => {
    nokCashPage = new NokCashPage(page);
    await nokCashPage.navigate();
  });

  test('TC006 - Valid 10-digit phone number should be accepted', async () => {
    await nokCashPage.enterPhoneNumber('0812345678');
    const error = await nokCashPage.getErrorMessage();
    expect(error).not.toContain('Invalid');
  });

  test('TC010 - 9-digit phone number should show error', async () => {
    await nokCashPage.enterPhoneNumber('081234567');
    const error = await nokCashPage.getErrorMessage();
    expect(error).toContain('Invalid') || expect(error).toContain('ไม่ถูกต้อง');
  });

  test('TC012 - Non-numeric phone number should show error', async () => {
    await nokCashPage.enterPhoneNumber('abc1234567');
    const error = await nokCashPage.getErrorMessage();
    expect(error).toContain('Invalid') || expect(error).toContain('ไม่ถูกต้อง');
  });

  test('TC014 - Empty phone number should show error', async () => {
    await nokCashPage.enterPhoneNumber('');
    const error = await nokCashPage.getErrorMessage();
    expect(error).toContain('required') || expect(error).toContain('จำเป็น');
  });
});
