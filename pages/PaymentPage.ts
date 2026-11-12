import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  // Phone number display on summary page
  readonly phoneNumberDisplay: string = [
    '[data-testid="phone-number"]',
    '[class*="phone"]',
    'td:has-text("081")',
    'span:has-text("081")',
    'p:has-text("081")',
    '.phone-number',
    '.mobile',
  ].join(', ');

  // Amount display
  readonly amountDisplay: string = [
    '[data-testid="amount"]',
    '[class*="amount"]',
    '.amount',
    'td:has-text("฿")',
    'span:has-text("฿")',
    '[class*="price"]',
    '[class*="total"]',
  ].join(', ');

  // Total / grand total
  readonly totalDisplay: string = [
    '[data-testid="total"]',
    '.total',
    '[class*="total"]',
    '[class*="grand-total"]',
    'td:last-child',
  ].join(', ');

  // Fee display
  readonly feeDisplay: string = [
    '[data-testid="fee"]',
    '.fee',
    '[class*="fee"]',
    '[class*="charge"]',
    'td:has-text("ค่าธรรมเนียม")',
    'span:has-text("ค่าธรรมเนียม")',
  ].join(', ');

  // Confirm / pay button
  readonly confirmButton: string = [
    'button:has-text("ยืนยัน")',
    'button:has-text("ชำระเงิน")',
    'button:has-text("ตกลง")',
    'button:has-text("confirm" i)',
    'button[type="submit"]',
    '[class*="confirm"]',
    '[class*="pay"]',
  ].join(', ');

  // Back button
  readonly backButton: string = [
    'button:has-text("ย้อนกลับ")',
    'button:has-text("กลับ")',
    'a:has-text("กลับ")',
    'button:has-text("back" i)',
    '[class*="back"]',
  ].join(', ');

  async getPhoneNumber(): Promise<string> {
    try {
      await this.page.waitForSelector(this.phoneNumberDisplay, { timeout: 5000 });
      return await this.getText(this.phoneNumberDisplay);
    } catch {
      // Fallback: search page text for phone pattern
      const content = await this.page.textContent('body') || '';
      const match = content.match(/0[689]\d{8}/);
      return match ? match[0] : '';
    }
  }

  async getAmount(): Promise<string> {
    try {
      await this.page.waitForSelector(this.amountDisplay, { timeout: 5000 });
      return await this.getText(this.amountDisplay);
    } catch {
      return '';
    }
  }

  async getTotal(): Promise<string> {
    try {
      await this.page.waitForSelector(this.totalDisplay, { timeout: 5000 });
      return await this.getText(this.totalDisplay);
    } catch {
      return '';
    }
  }

  async getFee(): Promise<string> {
    try {
      await this.page.waitForSelector(this.feeDisplay, { timeout: 5000 });
      return await this.getText(this.feeDisplay);
    } catch {
      return '';
    }
  }

  async confirmPayment(): Promise<void> {
    await this.waitForElement(this.confirmButton, 10000);
    await this.click(this.confirmButton);
  }

  async goBack(): Promise<void> {
    await this.waitForElement(this.backButton, 10000);
    await this.click(this.backButton);
  }

  async isSummaryVisible(): Promise<boolean> {
    try {
      // Check if either phone or amount display is visible
      const phoneVisible = await this.isVisible(this.phoneNumberDisplay);
      const amountVisible = await this.isVisible(this.amountDisplay);
      return phoneVisible || amountVisible;
    } catch {
      return false;
    }
  }
}
