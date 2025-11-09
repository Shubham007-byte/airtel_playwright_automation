import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.describe('Airtel Homepage Basic Test', () => {
  let homePage: HomePage;
  
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
  });

  test('should open Airtel homepage successfully', async () => {
    // Step 1: Navigate and verify basic page load
    await homePage.goto();

    // Step 2: Verify basic elements (Individual, Business links, and logo)
    await homePage.verifyBasicElements();
  });
});
