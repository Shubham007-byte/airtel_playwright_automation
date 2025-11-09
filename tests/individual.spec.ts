import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { IndividualPage } from '../pages/individual.page';

test.describe('Individual section tests', () => {
  let homePage: HomePage;
  let individualPage: IndividualPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    individualPage = new IndividualPage(page);
    await homePage.goto();
    await homePage.verifyBasicElements();
  });

  test('navigate to Individual section and validate', async () => {
    await homePage.clickIndividualLink();
    await individualPage.verifySection();
  });

  test('verify the main features in Individual section', async () => {
    await homePage.clickIndividualLink();
    await individualPage.verifyMainFeatures();
});
});
