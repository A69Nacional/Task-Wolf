import { test, expect } from '@playwright/test';
import { HackerNewsHomePage } from '../pages/HomePage';
import { TestHelper } from '../utils/TestHelper';

test.describe('Hacker News Responsive Design Tests', () => {
  let homePage: HackerNewsHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HackerNewsHomePage(page);
  });

  test('should display correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    
    await homePage.goto();
    
    // Verify content is still accessible
    await expect(homePage.titleLink).toBeVisible();
    
    // Check that stories are still displayed
    const storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
    
    // Verify horizontal scrolling is not needed
    const bodyWidth = await page.evaluate(() => {
      return document.body.scrollWidth;
    });
    const viewportWidth = await page.evaluate(() => {
      return window.innerWidth;
    });
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 50); // Allow small margin
  });

  test('should adapt to tablet size', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    
    await homePage.goto();
    
    // Content should be visible and accessible
    await expect(homePage.titleLink).toBeVisible();
    
    const storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
  });

  test('should work on different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },  // iPhone 5
      { width: 375, height: 812 },  // iPhone X
      { width: 768, height: 1024 }, // iPad
      { width: 1024, height: 768 }, // iPad Landscape
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await homePage.goto();
      
      // Basic functionality should work on all sizes
      await expect(homePage.titleLink).toBeVisible();
      
      const storyCount = await homePage.getStoryCount();
      expect(storyCount).toBeGreaterThan(0);
      
      // Take screenshot for visual verification
      await page.screenshot({ 
        path: `test-results/responsive-${viewport.width}x${viewport.height}.png`,
        fullPage: true 
      });
    }
  });

  test('should maintain functionality across viewport changes', async ({ page }) => {
    // Start with desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await homePage.goto();
    
    let storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
    
    // Switch to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500); // Allow layout adjustment
    
    // Functionality should still work
    storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
    
    // Test navigation still works
    const clickSuccess = await TestHelper.safeClick(homePage.storyLinks.first());
    expect(clickSuccess).toBeTruthy();
  });

  test('should handle orientation changes', async ({ page }) => {
    // Start in portrait
    await page.setViewportSize({ width: 375, height: 812 });
    await homePage.goto();
    
    await expect(homePage.titleLink).toBeVisible();
    
    // Switch to landscape
    await page.setViewportSize({ width: 812, height: 375 });
    await page.waitForTimeout(500);
    
    // Should still be functional
    await expect(homePage.titleLink).toBeVisible();
    const storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
  });
});