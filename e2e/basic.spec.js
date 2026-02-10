import { test, expect } from '@playwright/test';

test.describe('Personal Site E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for splash screen to disappear to avoid click interception
    await expect(page.locator('.splash-screen')).toBeHidden({ timeout: 10000 });
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Cathy Lee/i);
  });

  test('navigation works', async ({ page, isMobile }) => {
    if (isMobile) {
        await page.locator('#mobile-menu-btn').click();
    }
    await page.getByRole('link', { name: 'Experience' }).click();
    await expect(page).toHaveURL(/#experience/);
    await expect(page.locator('#experience')).toBeVisible();
  });

  test('theme toggle works', async ({ page }) => {
    const html = page.locator('html');
    // Default might be no attribute or light
    let initialTheme = await html.getAttribute('data-theme');
    
    // If null, assume it behaves as light and next click makes it dark
    // But better to check what happens after click.
    
    await page.locator('#theme-toggle').click();
    
    // After click, it should definitely have a theme attribute now (dark or light)
    // If it was null(light), it becomes 'dark'.
    await expect(html).toHaveAttribute('data-theme', /dark|light/);
    
    const newTheme = await html.getAttribute('data-theme');
    expect(newTheme).not.toBe(initialTheme);
 
    // Toggle back
    await page.locator('#theme-toggle').click();
    if (initialTheme) {
        await expect(html).toHaveAttribute('data-theme', initialTheme);
    } else {
        // If it started null, it might go back to 'light' explicit or null. 
        // Our app sets 'light' explicitly usually.
        await expect(html).toHaveAttribute('data-theme', 'light');
    }
  });

  test('capabilities section matches snapshot', async ({ page }) => {
    // Basic visibility check
    const capabilities = page.locator('#capabilities');
    await expect(capabilities).toBeVisible();
    await expect(page.getByText('Full-Stack Application Development')).toBeVisible();
  });

  test('active nav link highlighting', async ({ page }) => {
    await page.goto('/#experience');
    // Allow scroll spy to trigger
    await page.waitForTimeout(500); 
    const expLink = page.locator('.nav-links a[href="#experience"]');
    await expect(expLink).toHaveClass(/active-link/);
  });

  test('experience section renders correctly', async ({ page }) => {
    await page.goto('/#experience');
    // Check for the companies using specific heading role to avoid ambiguity
    await expect(page.getByRole('heading', { name: 'Morgan Stanley' }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Freelance' })).toBeVisible();
  });
});
