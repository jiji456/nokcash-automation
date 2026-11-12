import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NokCashPage extends BasePage {
  // Page URL
  readonly url: string = '/nok-cash';

  // Login required modal — appears when accessing /nok-cash without login
  readonly loginModal: string = '[data-testid="option-modal"]';
  readonly loginModalCancelBtn: string = '[data-testid="option-modal-cancel-button"]';
  readonly loginModalConfirmBtn: string = '[data-testid="option-modal-confirm-button"]';

  // NokCash top-up form elements (visible after login)
  // Using data-testid patterns consistent with the site's naming convention
  readonly phoneInput: string = [
    '[data-testid*="phone"]',
    '[data-testid*="mobile"]',
    'input[type="tel"]',
    'input[name="phone"]',
    'input[name="mobile"]',
    'input[name="phoneNumber"]',
    'input[placeholder*="เบอร์"]',
    'input[placeholder*="โทรศัพท์"]',
    'input[placeholder*="มือถือ"]',
  ].join(', ');

  readonly amountInput: string = [
    '[data-testid*="amount"]',
    'input[name="amount"]',
    'input[type="number"]',
    'input[placeholder*="จำนวน"]',
    'input[placeholder*="เงิน"]',
  ].join(', ');

  readonly submitButton: string = [
    '[data-testid*="submit"]',
    '[data-testid*="confirm"]',
    '[data-testid*="topup"]',
    'button[type="submit"]',
    'button:has-text("ต่อไป")',
    'button:has-text("ถัดไป")',
    'button:has-text("ยืนยัน")',
    'button:has-text("เติมเงิน")',
  ].join(', ');

  // Quick-select amount buttons
  readonly quickSelect100: string = [
    '[data-testid*="amount-100"]',
    'button:has-text("100")',
    '[class*="amount"]:has-text("100")',
  ].join(', ');

  readonly quickSelect500: string = [
    '[data-testid*="amount-500"]',
    'button:has-text("500")',
    '[class*="amount"]:has-text("500")',
  ].join(', ');

  readonly quickSelect1000: string = [
    '[data-testid*="amount-1000"]',
    'button:has-text("1000")',
    '[class*="amount"]:has-text("1000")',
  ].join(', ');

  readonly errorMessage: string = [
    '[data-testid*="error"]',
    '.error-message',
    '[class*="error"]',
    '[class*="invalid"]',
    '[role="alert"]',
    'p.text-danger',
    'span.text-danger',
  ].join(', ');

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url || this.url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForFunction(
      () => document.title !== 'Just a moment...',
      { timeout: 15000 }
    ).catch(() => {});
  }

  async isLoginRequired(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.loginModal, { timeout: 3000 });
      return await this.isVisible(this.loginModal);
    } catch {
      return false;
    }
  }

  async dismissLoginModal(): Promise<void> {
    const cancelBtn = this.page.locator(this.loginModalCancelBtn);
    if (await cancelBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cancelBtn.click();
    }
  }

  async enterPhoneNumber(phone: string): Promise<void> {
    await this.waitForElement(this.phoneInput, 10000);
    await this.page.fill(this.phoneInput, phone);
    await this.page.keyboard.press('Tab');
  }

  async enterAmount(amount: string): Promise<void> {
    await this.waitForElement(this.amountInput, 10000);
    await this.page.fill(this.amountInput, amount);
    await this.page.keyboard.press('Tab');
  }

  async selectQuickAmount(amount: '100' | '500' | '1000'): Promise<void> {
    const selector =
      amount === '100' ? this.quickSelect100 :
      amount === '500' ? this.quickSelect500 :
      this.quickSelect1000;
    await this.waitForElement(selector, 10000);
    await this.click(selector);
  }

  async submitForm(): Promise<void> {
    await this.waitForElement(this.submitButton, 10000);
    await this.click(this.submitButton);
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    try {
      const button = this.page.locator(this.submitButton).first();
      return await button.isEnabled();
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.page.waitForSelector(this.errorMessage, { timeout: 3000 });
      const el = this.page.locator(this.errorMessage).first();
      if (await el.isVisible()) {
        return (await el.textContent()) || '';
      }
    } catch {
      // No error shown
    }
    return '';
  }
}
