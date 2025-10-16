import { Page, Locator } from '@playwright/test';

export class HackerNewsHomePage {
  readonly page: Page;
  readonly titleLink: Locator;
  readonly storyLinks: Locator;
  readonly moreLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleLink = page.locator('.hnname a');
    this.storyLinks = page.locator('.titleline > a');
    this.moreLink = page.locator('.morelink');
    this.loginLink = page.locator('#hnmain tr:first-child td:last-child a');
  }

  async goto() {
    await this.page.goto('/');
  }

  async getStoryTitles() {
    return await this.storyLinks.allTextContents();
  }

  async clickStory(index: number) {
    await this.storyLinks.nth(index).click();
  }

  async clickMore() {
    await this.moreLink.click();
  }

  async getStoryCount() {
    return await this.storyLinks.count();
  }
}