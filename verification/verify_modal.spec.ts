import { test, expect } from '@playwright/test';

test('Event Edit Modal is centered and visible', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Create an event first
  await page.click('text=New Event');
  await page.fill('input[id="name"]', 'Modal Test Event');
  await page.fill('input[id="date"]', '2024-12-25');
  await page.click('button:has-text("Create Event")');

  // Navigate to event
  await page.click('text=Modal Test Event');

  // Open Edit Modal
  await page.click('button[title="Edit Event"]');

  // Wait for modal
  const modal = page.locator('text=Edit Event').locator('xpath=ancestor::div[contains(@class, "bg-white")][1]');
  await expect(modal).toBeVisible();

  // Take screenshot for visual confirmation
  await page.screenshot({ path: 'verification/screenshots/modal_fixed.png' });

  // Check position - it should be roughly centered
  const box = await modal.boundingBox();
  const viewport = page.viewportSize();

  if (box && viewport) {
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    expect(centerX).toBeCloseTo(viewport.width / 2, 50);
    expect(centerY).toBeCloseTo(viewport.height / 2, 50);

    // Ensure it's not cut off at the top
    expect(box.y).toBeGreaterThan(0);
  }
});
