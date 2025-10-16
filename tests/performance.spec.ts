import { test, expect } from '@playwright/test';
import { HackerNewsHomePage } from '../pages/HomePage';
import { TestHelper } from '../utils/TestHelper';

test.describe('Hacker News Performance Tests', () => {
  let homePage: HackerNewsHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HackerNewsHomePage(page);
  });

  test('should load homepage within acceptable time', async ({ page }) => {
    const loadTime = await TestHelper.measurePageLoadTime(page);
    
    await homePage.goto();
    
    // Homepage should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Verify content is actually loaded
    await expect(homePage.titleLink).toBeVisible();
    const storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
  });

  test('should handle network delays gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100); // Add 100ms delay
    });

    const startTime = Date.now();
    await homePage.goto();
    const loadTime = Date.now() - startTime;

    // Should still load, just slower
    await expect(homePage.titleLink).toBeVisible();
    expect(loadTime).toBeLessThan(10000); // Allow more time for slow network
  });

  test('should measure story interaction performance', async ({ page }) => {
    await homePage.goto();
    
    const startTime = Date.now();
    
    // Measure time to click first story
    await TestHelper.retryAction(async () => {
      await homePage.clickStory(0);
    });
    
    await page.waitForLoadState('networkidle');
    const interactionTime = Date.now() - startTime;
    
    // Story navigation should be reasonably fast
    expect(interactionTime).toBeLessThan(8000);
  });

  test('should validate page size and resource loading', async ({ page }) => {
    const responses: any[] = [];
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        size: response.headers()['content-length'] || 0
      });
    });

    await homePage.goto();
    await page.waitForLoadState('networkidle');

    // Should have loaded multiple resources
    expect(responses.length).toBeGreaterThan(5);
    
    // Most responses should be successful
    const successfulResponses = responses.filter(r => r.status >= 200 && r.status < 400);
    expect(successfulResponses.length / responses.length).toBeGreaterThan(0.8);
  });
});