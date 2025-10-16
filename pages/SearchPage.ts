import { Page, Locator } from '@playwright/test';

export class HackerNewsSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="q"]');
    this.searchButton = page.locator('input[value="Search"]');
    this.searchResults = page.locator('.result');
    this.noResultsMessage = page.locator('.nosearch');
  }

  async goto() {
    await this.page.goto('/search');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getResultCount() {
    return await this.searchResults.count();
  }

  async getResultTitles() {
    return await this.searchResults.locator('.result-title').allTextContents();
  }
}

export class HackerNewsCommentsPage {
  readonly page: Page;
  readonly comments: Locator;
  readonly storyTitle: Locator;
  readonly commentsTable: Locator;
  readonly replyLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.comments = page.locator('.comment');
    this.storyTitle = page.locator('.titleline');
    this.commentsTable = page.locator('.comment-tree');
    this.replyLinks = page.locator('a[href*="reply"]');
  }

  async getCommentsCount() {
    return await this.comments.count();
  }

  async getCommentTexts() {
    return await this.comments.locator('.commtext').allTextContents();
  }

  async hasComments() {
    return await this.commentsTable.isVisible();
  }

  async getStoryTitle() {
    return await this.storyTitle.textContent();
  }
}