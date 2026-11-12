# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: amount.spec.ts >> NokCash Flow - Amount Selection >> TC021 - Quick select 100 THB should work
- Location: tests\amount.spec.ts:18:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("100"), .amount-btn:has-text("100")')

```

# Test source

```ts
  1  | import { Page, Locator } from '@playwright/test';
  2  | 
  3  | export class BasePage {
  4  |   readonly page: Page;
  5  | 
  6  |   constructor(page: Page) {
  7  |     this.page = page;
  8  |   }
  9  | 
  10 |   async navigate(url?: string): Promise<void> {
  11 |     await this.page.goto(url || this.page.url());
  12 |   }
  13 | 
  14 |   async fill(selector: string, value: string): Promise<void> {
  15 |     await this.page.fill(selector, value);
  16 |   }
  17 | 
  18 |   async click(selector: string): Promise<void> {
> 19 |     await this.page.click(selector);
     |                     ^ Error: page.click: Test timeout of 30000ms exceeded.
  20 |   }
  21 | 
  22 |   async waitForElement(selector: string, timeout = 5000): Promise<void> {
  23 |     await this.page.waitForSelector(selector, { timeout });
  24 |   }
  25 | 
  26 |   async isVisible(selector: string): Promise<boolean> {
  27 |     return await this.page.isVisible(selector);
  28 |   }
  29 | 
  30 |   async getText(selector: string): Promise<string> {
  31 |     return await this.page.textContent(selector) || '';
  32 |   }
  33 | }
  34 | 
```