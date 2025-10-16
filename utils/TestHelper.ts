import { Page, Locator } from '@playwright/test';

export class TestHelper {
  static async waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
    try {
      await page.waitForLoadState('networkidle', { timeout });
    } catch (error) {
      console.log(`Network idle timeout after ${timeout}ms, continuing...`);
    }
  }

  static async safeClick(locator: Locator, timeout: number = 10000): Promise<boolean> {
    try {
      await locator.waitFor({ timeout });
      await locator.click({ timeout });
      return true;
    } catch (error) {
      console.log(`Safe click failed: ${error}`);
      return false;
    }
  }

  static async waitForElement(locator: Locator, timeout: number = 10000): Promise<boolean> {
    try {
      await locator.waitFor({ timeout });
      return true;
    } catch (error) {
      console.log(`Element not found within ${timeout}ms`);
      return false;
    }
  }

  static async retryAction<T>(
    action: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T | null> {
    for (let i = 0; i < retries; i++) {
      try {
        return await action();
      } catch (error) {
        console.log(`Attempt ${i + 1} failed: ${error}`);
        if (i < retries - 1) {
          await this.sleep(delay);
        }
      }
    }
    return null;
  }

  static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static async measurePageLoadTime(page: Page): Promise<number> {
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    return Date.now() - startTime;
  }

  static async checkResponsiveLayout(page: Page, viewports: { width: number; height: number }[]) {
    const results = [];
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500); // Allow layout to adjust
      
      const screenshot = await page.screenshot({ fullPage: true });
      results.push({
        viewport,
        screenshotSize: screenshot.length,
        isValid: screenshot.length > 1000 // Basic validation
      });
    }
    return results;
  }
}