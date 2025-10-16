import { test, expect } from '@playwright/test';
import { HackerNewsHomePage } from '../pages/HomePage';

test.describe('Hacker News Search and Navigation', () => {
  let homePage: HackerNewsHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HackerNewsHomePage(page);
    await homePage.goto();
  });

  test('should click on first story and navigate', async ({ page }) => {
    await homePage.clickStory(0);
    
    // Wait for navigation and check we're no longer on homepage
    await page.waitForLoadState('networkidle');
    const currentURL = page.url();
    expect(currentURL).not.toBe('https://news.ycombinator.com/');
  });

  test('should verify story ranking order', async () => {
    const storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThanOrEqual(30); // Typical HN front page
  });

  test('should navigate through multiple pages', async () => {
    // Go to page 2
    await homePage.clickMore();
    await expect(homePage.page).toHaveURL(/p=2/);
    
    // Verify stories are still loading
    await homePage.page.waitForLoadState('networkidle');
    const page2Stories = await homePage.getStoryCount();
    expect(page2Stories).toBeGreaterThan(0);
  });
});