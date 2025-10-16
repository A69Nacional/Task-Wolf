import { test, expect } from '@playwright/test';
import { HackerNewsHomePage } from '../pages/HomePage';

test.describe('Hacker News Homepage', () => {
  let homePage: HackerNewsHomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HackerNewsHomePage(page);
    await homePage.goto();
  });

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Hacker News/);
    await expect(homePage.titleLink).toBeVisible();
  });

  test('should display stories', async () => {
    const storyCount = await homePage.getStoryCount();
    expect(storyCount).toBeGreaterThan(0);
  });

  test('should load story titles', async () => {
    const titles = await homePage.getStoryTitles();
    expect(titles.length).toBeGreaterThan(0);
    titles.forEach(title => {
      expect(title).toBeTruthy();
    });
  });

  test('should navigate to more stories', async () => {
    await homePage.clickMore();
    await expect(homePage.page).toHaveURL(/p=2/);
  });
});