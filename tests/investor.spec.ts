import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { InvestorPage } from '../pages/investor.page';

test.describe('Investor section tests', () => {
  let homePage: HomePage;
  let investorPage: InvestorPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    investorPage = new InvestorPage(page);
    await homePage.goto();
    await homePage.verifyBasicElements();
  });

  test('navigate to Investor section and validate', async () => {
    await homePage.clickInvestorLink();
    await investorPage.verifySection();
  });
});
