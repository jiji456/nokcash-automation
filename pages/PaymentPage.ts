import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentPage extends BasePage {
  readonly phoneNumberDisplay: string = '.phone-number, [data-testid="phone-number"]';
  readonly amountDisplay: string = '.amount, [data-testid="amount"]';
  readonly totalDisplay: string = '.total, [data-testid="total"]';
  readonly feeDisplay: string = '.fee, [data-testid="fee"]';
  readonly confirmButton: string = 'button:has-text("ยืนยัน"), button:has-text("ชำระเงิน")';
  readonly backButton: string = 'button:has-text("ย้อนกลับ"), button:has-text("กลับ")';

  async getPhoneNumber(): Promise<string> {
    return await this.getText(this.phoneNumberDisplay);
  }

  async getAmount(): Promise<string> {
    return await this.getText(this.amountDisplay);
  }

  async getTotal(): Promise<string> {
    return await this.getText(this.totalDisplay);
  }

  async getFee(): Promise<string> {
    return await this.getText(this.feeDisplay);
  }

  async confirmPayment(): Promise<void> {
    await this.click(this.confirmButton);
  }

  async goBack(): Promise<void> {
    await this.click(this.backButton);
  }

  async isSummaryVisible(): Promise<boolean> {
    return await this.isVisible(this.phoneNumberDisplay) &&
           await this.isVisible(this.amountDisplay);
  }
}
