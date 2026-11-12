import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('NokCash Flow - Homepage Navigation', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate('/');
  });

  test('TC001 - NokCash banner should be visible on homepage', async ({ page }) => {
    // Verify page loaded (not stuck on Cloudflare)
    await expect(page).not.toHaveTitle('Just a moment...', { timeout: 15000 });
    // NokCash icon button should be visible in "บริการ" section
    const isVisible = await homePage.isNokCashBannerVisible();
    expect(isVisible).toBeTruthy();
  });

  test('TC002 - Click NokCash banner should navigate to NokCash top-up page', async ({ page }) => {
    await expect(page).not.toHaveTitle('Just a moment...', { timeout: 15000 });

    await homePage.clickNokCashBanner();
    await page.waitForURL('**/nok-cash', { timeout: 10000 }).catch(() => {});

    // Expected: either URL changed to /nok-cash OR login modal appeared
    // Both are valid outcomes — login modal means navigation was triggered correctly
    const url = page.url();
    const loginModalVisible = await homePage.isLoginPopupVisible();

    expect(url.includes('/nok-cash') || loginModalVisible).toBeTruthy();
  });
});
