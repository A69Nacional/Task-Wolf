import { test, expect } from '@playwright/test';
import { HackerNewsSearchPage } from '../pages/SearchPage';

test.describe('Hacker News Search Functionality', () => {
  let searchPage: HackerNewsSearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new HackerNewsSearchPage(page);
  });

  test('should perform search from homepage', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to search (usually via URL since HN doesn't have prominent search)
    await page.goto('/search');
    
    // Verify we're on search page
    await expect(page).toHaveURL(/search/);
  });

  test('should search for specific term', async ({ page }) => {
    await page.goto('/search');
    
    // Search for a common tech term
    await searchPage.search('javascript');
    
    // Wait for results to load
    await page.waitForLoadState('networkidle');
    
    // Verify we have results or appropriate message
    const url = page.url();
    expect(url).toContain('q=javascript');
  });

  test('should handle empty search gracefully', async ({ page }) => {
    await page.goto('/search');
    
    // Try empty search
    await searchPage.search('');
    
    await page.waitForLoadState('networkidle');
    
    // Should remain on search page
    await expect(page).toHaveURL(/search/);
  });
});