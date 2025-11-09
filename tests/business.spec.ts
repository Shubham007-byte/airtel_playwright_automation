import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { BusinessPage } from '../pages/business.page';

test.describe('Business section tests', () => {
  let homePage: HomePage;
  let businessPage: BusinessPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    businessPage = new BusinessPage(page);
    await homePage.goto();
    await homePage.verifyBasicElements();
  });

  test('navigate to Business section and validate', async () => {
    await homePage.clickBusinessLink();
    await businessPage.verifySection();
  });
});
