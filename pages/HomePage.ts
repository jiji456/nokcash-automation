import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // NokCash button in "Nok More" section — confirmed data-testid from live site
  readonly nokCashBanner: string = '[data-testid="nok-more-nok-cash-icon"]';
  // Cookie consent button
  readonly cookieAcceptBtn: string = 'button:has-text("ยอมรับทั้งหมด")';
  // Login popup cancel button
  readonly loginPopupCancelBtn: string = 'button:has-text("ยกเลิก")';
  // Login popup confirm (ตกลง) button
  readonly loginPopupConfirmBtn: string = 'button:has-text("ตกลง")';

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url || '/', { waitUntil: 'domcontentloaded' });
    // Wait for Cloudflare to pass
    await this.page.waitForFunction(
      () => document.title !== 'Just a moment...',
      { timeout: 15000 }
    ).catch(() => {});
    await this.dismissDialogs();
  }

  async dismissDialogs(): Promise<void> {
    // Dismiss cookie consent
    const cookie = this.page.locator(this.cookieAcceptBtn);
    if (await cookie.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cookie.click();
      await this.page.waitForTimeout(500);
    }
    // Dismiss login popup (ยกเลิก = cancel, stays on page)
    const cancel = this.page.locator(this.loginPopupCancelBtn);
    if (await cancel.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cancel.click();
      await this.page.waitForTimeout(500);
    }
  }

  async clickNokCashBanner(): Promise<void> {
    await this.waitForElement(this.nokCashBanner, 10000);
    await this.click(this.nokCashBanner);
    await this.page.waitForTimeout(1000);
    // If login popup appears, it means we need to handle it
    const loginPopup = this.page.locator(this.loginPopupCancelBtn);
    if (await loginPopup.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Record that popup appeared — test can decide what to do
      return;
    }
  }

  async isNokCashBannerVisible(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.nokCashBanner, { timeout: 10000 });
      return await this.isVisible(this.nokCashBanner);
    } catch {
      return false;
    }
  }

  async isLoginPopupVisible(): Promise<boolean> {
    // Check both the cancel button and the option-modal data-testid
    const byCancel = await this.isVisible(this.loginPopupCancelBtn).catch(() => false);
    const byModal = await this.isVisible('[data-testid="option-modal"]').catch(() => false);
    return byCancel || byModal;
  }
}
