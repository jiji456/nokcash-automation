import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly nokCashBanner: string = 'a[href*="nokcash"], img[alt*="NokCash"]';

  async clickNokCashBanner(): Promise<void> {
    await this.waitForElement(this.nokCashBanner);
    await this.click(this.nokCashBanner);
  }

  async isNokCashBannerVisible(): Promise<boolean> {
    return await this.isVisible(this.nokCashBanner);
  }
}
