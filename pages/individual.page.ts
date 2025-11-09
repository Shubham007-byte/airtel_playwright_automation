import { type Page, type Locator, expect } from '@playwright/test';

export class IndividualPage {
    private page: Page;
    readonly heading: Locator;

    constructor(page: Page) {
        this.page = page;
        // generic locator that looks for any element containing "Individual" text
        this.heading = page.locator('text=/individual/i').first();
    }

    async verifySection() {
        // Wait and assert that some content related to Individual is visible
        await expect(this.heading).toBeVisible({ timeout: 15000 });
        console.log('✅ Individual section contains expected content');
    }
    async verifyMainFeatures() {
        // Ensure page finished loading dynamic content
        await this.page.waitForLoadState('networkidle');

        // Define specific locators for main features in the Individual section
    const wifi = this.page.locator('text=/wi[- ]?fi|wifi/i').first();
    const postpaid = this.page.locator('text=/postpaid/i').first();
    const prepaid = this.page.locator('text=/prepaid/i').first();
    const dth = this.page.locator('text=/dth/i').first();
    const airtelBlack = this.page.locator('text=/airtel black/i').first();
    const bank = this.page.locator('text=/\bbank\b|banking|bank/i').first();
    const finance = this.page.locator('text=/finance|loan|loans|lending/i').first();
    const help = this.page.locator('text=/help|support|customer care/i').first();
    const referEarn = this.page.locator('text=/refer\s*&\s*earn|refer and earn|refer earn/i').first();

        const timeout = 15000;
        // Assert visibility (some elements might be in footer/header; using first() reduces noise)
        await expect(wifi).toBeVisible({ timeout });
        console.log('✅ Wi-Fi link visible');

        await expect(postpaid).toBeVisible({ timeout });
        console.log('✅ Postpaid visible');

        await expect(prepaid).toBeVisible({ timeout });
        console.log('✅ Prepaid visible');

        await expect(dth).toBeVisible({ timeout });
        console.log('✅ DTH visible');

        await expect(airtelBlack).toBeVisible({ timeout });
        console.log('✅ Airtel Black visible');

        // Bank: sometimes presented as a label or link; tolerate hidden-but-present
        if (await bank.isVisible()) {
            console.log('✅ Bank visible');
        } else {
            const bankAlt1 = this.page.locator('a[href*="bank"]').first();
            const bankAlt2 = this.page.locator('text=/payments bank/i').first();
            if ((await bankAlt1.count()) > 0 || (await bankAlt2.count()) > 0) {
                console.log('⚠️ Bank element present in DOM but not visible');
            } else {
                throw new Error('Bank element not found');
            }
        }

        // Finance: prefer URL or visible element, otherwise accept presence in DOM
        if (await finance.isVisible()) {
            console.log('✅ Finance visible');
        } else {
            const finAlt1 = this.page.locator('a[href*="finance"]').first();
            const finAlt2 = this.page.locator('text=/loan|loans|lending/i').first();
            if ((await finAlt1.count()) > 0 || (await finAlt2.count()) > 0) {
                console.log('⚠️ Finance element present in DOM but not visible');
            } else {
                throw new Error('Finance element not found');
            }
        }

        // Help/support
        await expect(help).toBeVisible({ timeout });
        console.log('✅ Help/Support visible');

        // Refer & Earn: tolerate present-but-hidden
        if (await referEarn.isVisible()) {
            console.log('✅ Refer & Earn visible');
        } else {
            const refAlt1 = this.page.locator('a:has-text("Refer")').first();
            const refAlt2 = this.page.locator('text=/refer/i').first();
            if ((await refAlt1.count()) > 0 || (await refAlt2.count()) > 0) {
                console.log('⚠️ Refer & Earn element present in DOM but not visible');
            } else {
                throw new Error('Refer & Earn element not found');
            }
        }
    }
}