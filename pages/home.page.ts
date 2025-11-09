import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
    private page: Page;
    readonly individualLink: Locator;
    readonly businessLink: Locator;
    readonly enterpriseLink: Locator;
    readonly investorLink: Locator;
    readonly airtelLogo: Locator;

    constructor(page: Page) {
        this.page = page;

        // Primary navigation items (use attributes where available)
        this.individualLink = page.locator('a[role="listitem"][aria-label="INDIVIDUAL"]');
        this.businessLink = page.locator('a[role="listitem"][aria-label="BUSINESS"]');
        this.enterpriseLink = page.locator('a[role="listitem"][aria-label="ENTERPRISE"]');

        // Investor links are often in footer/header; fallback to text match
        this.investorLink = page.locator('a', { hasText: /investor|investors|investor relations/i }).first();

        // Common logo variations
        this.airtelLogo = page.locator('img[alt*="Airtel"], img[alt*="airtel"], a[aria-label="Airtel Logo"] img').first();
    }

    // Navigation
    async goto() {
        const response = await this.page.goto('https://www.airtel.in/');
        await this.page.waitForLoadState('networkidle');
        expect(response && response.ok()).toBeTruthy();
        await expect(this.page).toHaveTitle(/Airtel/i);
        console.log('✅ Airtel homepage loaded successfully');
    }

    // Verifications
    async verifyBasicElements() {
        const timeout = 15000;
        // Verify Individual and Business links (these are usually visible)
        await expect(this.individualLink).toBeVisible({ timeout });
        console.log('✅ Individual link is visible');

        await expect(this.businessLink).toBeVisible({ timeout });
        console.log('✅ Business link is visible');

        // Verify logo is present
        await expect(this.airtelLogo).toBeVisible({ timeout });
        console.log('✅ Airtel logo is visible on the homepage');
    }

    // Some sections may need special handling (menu open/scroll)
    async verifyEnterpriseSection() {
        const timeout = 15000;
        await expect(this.enterpriseLink).toBeVisible({ timeout });
        console.log('✅ Enterprise link is visible');
    }

    // Actions
    async clickIndividualLink() {
        await this.individualLink.click();
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Clicked on Individual link');
    }

    async clickBusinessLink() {
        await this.businessLink.click();
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Clicked on Business link');
    }

    async clickInvestorLink() {
        await this.investorLink.click();
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Clicked on Investor link');
    }

    // Section-level verifications (placeholders to be expanded)
    async verifyIndividualSection() {
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Individual section verification placeholder');
    }

    async verifyBusinessSection() {
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Business section verification placeholder');
    }

    async verifyInvestorSection() {
        await this.page.waitForLoadState('networkidle');
        console.log('✅ Investor section verification placeholder');
    }
}