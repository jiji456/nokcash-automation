import { test, expect } from '@playwright/test';
import { NokCashPage } from '../pages/NokCashPage';

test.describe('NokCash Flow - Amount Selection', () => {
  let nokCashPage: NokCashPage;

  test.beforeEach(async ({ page }) => {
    nokCashPage = new NokCashPage(page);
    await nokCashPage.navigate();
  });

  test('TC018 - Minimum amount (50 THB) should be accepted', async () => {
    await nokCashPage.enterAmount('50');
    const error = await nokCashPage.getErrorMessage();
    expect(error).not.toContain('Invalid');
  });

  test('TC021 - Quick select 100 THB should work', async () => {
    await nokCashPage.selectQuickAmount('100');
    const error = await nokCashPage.getErrorMessage();
    expect(error).not.toContain('Invalid');
  });

  test('TC022 - Amount below minimum should show error', async () => {
    await nokCashPage.enterAmount('49');
    const error = await nokCashPage.getErrorMessage();
    expect(error).toContain('ขั้นต่ำ') || expect(error).toContain('ต่ำสุด');
  });

  test('TC024 - Zero amount should show error', async () => {
    await nokCashPage.enterAmount('0');
    const error = await nokCashPage.getErrorMessage();
    expect(error).toContain('0') || expect(error).toContain('มากกว่า');
  });

  test('TC026 - Empty amount should show error', async () => {
    await nokCashPage.enterAmount('');
    const error = await nokCashPage.getErrorMessage();
    expect(error).toContain('required') || expect(error).toContain('จำเป็น');
  });
});
