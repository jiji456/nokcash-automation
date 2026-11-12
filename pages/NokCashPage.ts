import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class NokCashPage extends BasePage {
  readonly phoneInput: string = 'input[type="tel"], input[name="phone"], input[placeholder*="เบอร์"]';
  readonly amountInput: string = 'input[type="number"], input[name="amount"], input[placeholder*="จำนวนเงิน"]';
  readonly submitButton: string = 'button[type="submit"], button:has-text("ต่อไป"), button:has-text("ยืนยัน")';
  readonly quickSelect100: string = 'button:has-text("100"), .amount-btn:has-text("100")';
  readonly quickSelect500: string = 'button:has-text("500"), .amount-btn:has-text("500")';
  readonly quickSelect1000: string = 'button:has-text("1000"), .amount-btn:has-text("1000")';

  async enterPhoneNumber(phone: string): Promise<void> {
    await this.fill(this.phoneInput, phone);
  }

  async enterAmount(amount: string): Promise<void> {
    await this.fill(this.amountInput, amount);
  }

  async selectQuickAmount(amount: '100' | '500' | '1000'): Promise<void> {
    const selector = amount === '100' ? this.quickSelect100 :
                      amount === '500' ? this.quickSelect500 :
                      this.quickSelect1000;
    await this.click(selector);
  }

  async submitForm(): Promise<void> {
    await this.click(this.submitButton);
  }

  async isSubmitButtonEnabled(): Promise<boolean> {
    const button = this.page.locator(this.submitButton);
    return await button.isEnabled();
  }

  async getErrorMessage(): Promise<string> {
    const errorSelector = '.error, .alert, [role="alert"]';
    const errorElement = this.page.locator(errorSelector).first();
    if (await errorElement.isVisible()) {
      return await errorElement.textContent() || '';
    }
    return '';
  }
}
