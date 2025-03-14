// tests/cherleonardh.spec.ts
import { test, expect } from '@playwright/test';

test('Check website title', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  await expect(page).toHaveTitle(/Cher Leonard H/);
});

test('Check for recent posts', async ({ page }) => {
  await page.goto('https://cherleonardh.wordpress.com');
  const recentPosts = await page.$$('.wp-block-latest-posts__list li');
  expect(recentPosts.length).toBeGreaterThan(0); // Assuming there are recent posts

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
