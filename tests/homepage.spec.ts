import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NokCashPage } from '../pages/NokCashPage';

test.describe('NokCash Flow - Homepage Navigation', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('TC001 - NokCash banner should be visible and clickable', async () => {
    expect(await homePage.isNokCashBannerVisible()).toBeTruthy();
  });

  test('TC002 - Click NokCash banner should navigate to top-up page', async ({ page }) => {
    await homePage.clickNokCashBanner();
    await expect(page).toHaveURL(/nokcash|topup/i);
  });
});
