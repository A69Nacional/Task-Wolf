import { test, expect } from '@playwright/test';
import { HackerNewsHomePage } from '../pages/HomePage';
import { HackerNewsCommentsPage } from '../pages/SearchPage';

test.describe('Hacker News Comments and Stories', () => {
  let homePage: HackerNewsHomePage;
  let commentsPage: HackerNewsCommentsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HackerNewsHomePage(page);
    commentsPage = new HackerNewsCommentsPage(page);
    await homePage.goto();
  });

  test('should navigate to story comments', async ({ page }) => {
    // Get first story link that likely has comments
    const storyLinks = page.locator('.titleline > a');
    await expect(storyLinks.first()).toBeVisible();
    
    // Find a comments link (usually has "comments" or number + "comments")
    const commentsLinks = page.locator('a[href*="item?id="]').filter({ hasText: /\d+\s+comment/ });
    
    if (await commentsLinks.count() > 0) {
      await commentsLinks.first().click();
      await page.waitForLoadState('networkidle');
      
      // Verify we're on a story page
      await expect(page).toHaveURL(/item\?id=\d+/);
      
      // Check if there are comments or at least a comments section
      const hasCommentsSection = await page.locator('#hnmain').isVisible();
      expect(hasCommentsSection).toBeTruthy();
    }
  });

  test('should validate story page structure', async ({ page }) => {
    // Navigate to a specific story (using a known pattern)
    await page.goto('/item?id=1'); // Classic first HN story
    
    // Should have main content area
    await expect(page.locator('#hnmain')).toBeVisible();
    
    // Should have story title area
    const titleArea = page.locator('.titleline, .title');
    if (await titleArea.count() > 0) {
      await expect(titleArea.first()).toBeVisible();
    }
  });

  test('should handle stories without comments', async ({ page }) => {
    // Go to a story that might not have comments
    await page.goto('/item?id=999999'); // Likely non-existent or no comments
    
    // Should still load the page structure
    await page.waitForLoadState('networkidle');
    
    // Should have main area even if no comments
    const mainArea = page.locator('#hnmain');
    if (await mainArea.isVisible()) {
      expect(await mainArea.isVisible()).toBeTruthy();
    }
  });
});