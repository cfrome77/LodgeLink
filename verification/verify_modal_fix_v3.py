from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:3000/events/new")
    page.wait_for_timeout(2000)

    # Fill form
    page.fill('input[id="name"]', "Modal Fix Verification")
    page.wait_for_timeout(500)
    page.fill('input[id="date"]', "2024-12-31")
    page.wait_for_timeout(500)

    # Try to find the button
    print("Looking for Save Event button...")
    page.click('button:has-text("Save Event")')
    page.wait_for_timeout(2000)

    # Now we should be on event page
    print(f"Current URL: {page.url}")

    # Open Edit Modal
    page.click('button[title="Edit Event"]')
    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/modal_fixed_v4.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
