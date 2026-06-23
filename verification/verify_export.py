from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:3000/events/new")
    page.wait_for_timeout(2000)

    # Fill form
    page.fill('input[id="name"]', "Export Verification")
    page.fill('input[id="date"]', "2024-12-31")
    page.click('button:has-text("Save Event")')
    page.wait_for_timeout(2000)

    # Open Export Modal
    page.click('button:has-text("Export Data")')
    page.wait_for_timeout(1000)

    # Take screenshot of export modal
    page.screenshot(path="/home/jules/verification/screenshots/export_modal_fields.png")

    # Check if 'First Name' exists
    first_name_exists = page.locator('button:has-text("First Name")').count() > 0
    name_exists = page.locator('button:has-text("Name")').count() > 0

    print(f"First Name exists: {first_name_exists}")
    print(f"Name exists: {name_exists}")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_cuj(page)
        finally:
            browser.close()
