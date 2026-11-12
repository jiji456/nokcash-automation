import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  readonly phoneNumberDisplay: string = [
    '[data-testid="phone-number"]',
    '[data-testid*="phone"]',
    '[class*="phone"]',
    'td:has-text("081")',
    'span:has-text("081")',
    'p:has-text("081")',
    '.phone-number',
    '.mobile',
  ].join(', ');

  readonly amountDisplay: string = [
    '[data-testid="amount"]',
    '[data-testid*="amount"]',
    '[class*="amount"]',
    '.amount',
    'td:has-text("฿")',
    'span:has-text("฿")',
    '[class*="price"]',
    '[class*="total"]',
  ].join(', ');

  readonly totalDisplay: string = [
    '[data-testid="total"]',
    '.total',
    '[class*="total"]',
    '[class*="grand-total"]',
    'td:last-child',
  ].join(', ');

  readonly feeDisplay: string = [
    '[data-testid="fee"]',
    '.fee',
    '[class*="fee"]',
    '[class*="charge"]',
    'td:has-text("ค่าธรรมเนียม")',
    'span:has-text("ค่าธรรมเนียม")',
  ].join(', ');

  readonly confirmButton: string = [
    'button:has-text("ยืนยัน")',
    'button:has-text("ชำระเงิน")',
    'button:has-text("ตกลง")',
    'button:has-text("confirm" i)',
    'button[type="submit"]',
    '[class*="confirm"]',
    '[class*="pay"]',
  ].join(', ');

  readonly backButton: string = [
    'button:has-text("ย้อนกลับ")',
    'button:has-text("กลับ")',
    'a:has-text("กลับ")',
    'button:has-text("back" i)',
    '[class*="back"]',
  ].join(', ');

  constructor(page: Page) {
    super(page);
  }

  async getPhoneNumber(): Promise<string> {
    const phone = this.page.locator(this.phoneNumberDisplay).first();
    if (await phone.isVisible().catch(() => false)) {
      return (await phone.textContent()) || '';
    }

    const content = await this.page.textContent('body');
    const match = content?.match(/0[689]\d{8}/);
    return match ? match[0] : '';
  }

  async getAmount(): Promise<string> {
    const amount = this.page.locator(this.amountDisplay).first();
    if (await amount.isVisible().catch(() => false)) {
      return (await amount.textContent()) || '';
    }
    return '';
  }

  async getTotal(): Promise<string> {
    const total = this.page.locator(this.totalDisplay).first();
    if (await total.isVisible().catch(() => false)) {
      return (await total.textContent()) || '';
    }
    return '';
  }

  async getFee(): Promise<string> {
    const fee = this.page.locator(this.feeDisplay).first();
    if (await fee.isVisible().catch(() => false)) {
      return (await fee.textContent()) || '';
    }
    return '';
  }

  async confirmPayment(): Promise<void> {
    const btn = this.page.locator(this.confirmButton).first();
    await btn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await btn.click();
  }

  async goBack(): Promise<void> {
    const btn = this.page.locator(this.backButton).first();
    await btn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    await btn.click();
  }

  async isSummaryVisible(): Promise<boolean> {
    return (await this.page.locator(this.phoneNumberDisplay).first().isVisible().catch(() => false)) ||
      (await this.page.locator(this.amountDisplay).first().isVisible().catch(() => false));
  }
}
