// tests/google-search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Google Search Functionality', () => {
  test('should search for Playwright and return relevant results', async ({ page }) => {
    // 1. Navigate to Google
    await page.goto('/');

    // 2. Handle potential Cookie Consent Banner (European regions, etc.)
    const acceptCookiesButton = page.locator('button:has-text("Accept all"), button:has-text("I agree")');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }

    // 3. Locate the search bar, type, and press Enter
    const searchInput = page.locator('textarea[name="q"], input[name="q"]');
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill('Playwright testing framework');
    await searchInput.press('Enter');

    // 4. Wait for the search results container to load
    const searchResults = page.locator('#search');
    await searchResults.waitFor({ state: 'visible' });

    // 5. Assertions
    await expect(page).toHaveTitle(/Playwright testing framework - Google Search/i);
    await expect(searchResults).toContainText('Playwright');
  });
});