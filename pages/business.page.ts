import { type Page, type Locator, expect } from '@playwright/test';

export class BusinessPage {
  private page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('text=/business/i').first();
  }

  async verifySection() {
    // Prefer URL-based verification for business page, fallback to text visibility
    try {
      await this.page.waitForURL(/business/i, { timeout: 15000 });
      console.log('✅ Business page URL contains "business"');
    } catch (e) {
      // Fallback: ensure some visible text contains 'business'
      const content = await this.page.textContent('body');
      if (!content || !content.toLowerCase().includes('business')) {
        // If no obvious text, assert the heading locator visibility (may be hidden in some layouts)
        await expect(this.heading).toBeVisible({ timeout: 15000 });
      }
      console.log('✅ Business section contains expected content (fallback)');
    }
  }
}
