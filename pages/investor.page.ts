import { type Page, type Locator, expect } from '@playwright/test';

export class InvestorPage {
  private page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('text=/investor|investors|investor relations/i').first();
  }

  async verifySection() {
    await expect(this.heading).toBeVisible({ timeout: 15000 });
    console.log('✅ Investor section contains expected content');
  }
}
