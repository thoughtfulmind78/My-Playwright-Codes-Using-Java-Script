// tests/cherleonardh.spec.ts
import { test, expect } from '@playwright/test';

test('Check website title', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  await expect(page).toHaveTitle(/Cher Leonard H/);
});

test('Check for recent posts', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const recentPosts = await page.$$('.wp-block-latest-posts__list li');
  expect(recentPosts.length).toBeGreaterThan(0);

  for (const post of recentPosts) {
    const postTitle = await post.textContent();
    expect(postTitle).toBeTruthy();
  }
});

test('Check for links in the navigation', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const navLinks = await page.$$('.wp-block-navigation-item a');

  for (const link of navLinks) {
    const linkText = await link.textContent();
    const href = await link.getAttribute('href');

    expect(linkText).toBeTruthy();
    expect(href).toBeTruthy();
  }
});

test('Check for social media links', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const socialLinks = await page.$$('.wp-block-social-links li a');
  expect(socialLinks.length).toBeGreaterThan(0);

  for (const link of socialLinks) {
    const href = await link.getAttribute('href');
    expect(href).toBeTruthy();
  }
});

test('Check for footer text', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const footerText = await page.textContent('.wp-block-group.has-global-padding.wp-block-group-is-layout-constrained');
  expect(footerText).toBeTruthy();
});

test('Check if the site loads without console errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  await page.goto('https://cherleonardh.wordpress.com');
  expect(errors).toEqual([]);
});

// New tests to check for specific text and the website URL

test('Check for specific text "Leonard Lato"', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const pageContent = await page.textContent('body');
  expect(pageContent).toContain('Leonard Lato');
});

test('Check for the website URL in the page content', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('cherleonardh.wordpress.com');
});

//Test for absence of edit box and password box and checkbox for article selection.
test('Check for absence of password and checkbox', async ({ page }) => {
    await page.goto('https://cherleonardh.wordpress.com');
    const passwordInput = await page.$('input[type="password"]');
    const checkbox = await page.$('input[type="checkbox"]');
    const editBox = await page.$('input[type="text"], textarea');

    expect(passwordInput).toBeNull();
    expect(checkbox).toBeNull();
    expect(editBox).toBeNull();
});

// New test to check if "Continue Reading" button exists
test('Check for "Continue Reading" button', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const continueReadingButton = await page.locator('a:has-text("Continue Reading")');
  await expect(continueReadingButton).toBeVisible();
});

//Test to check if Leonard Lato is visible.
test('Check if "Leonard Lato" is visible', async ({ page }) => {
    await page.goto('https://cherleonardh.wordpress.com');
    const leonardLatoText = await page.locator('text=Leonard Lato');
    await expect(leonardLatoText).toBeVisible();
});