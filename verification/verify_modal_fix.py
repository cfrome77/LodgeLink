from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Create an event
    page.get_by_role("button", name="New Event").click()
    page.wait_for_timeout(500)
    page.get_by_label("Event Name *").fill("Modal Fix Verification")
    page.wait_for_timeout(500)
    page.get_by_label("Event Date *").fill("2024-12-31")
    page.wait_for_timeout(500)
    page.get_by_role("button", name="Create Event").click()
    page.wait_for_timeout(1000)

    # Navigate to event
    page.get_by_text("Modal Fix Verification").click()
    page.wait_for_timeout(1000)

    # Open Edit Modal
    page.get_by_role("button", name="Edit Event").click()
    page.wait_for_timeout(1000)

    # Take screenshot
    page.screenshot(path="/home/jules/verification/screenshots/modal_fixed_v2.png")
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
