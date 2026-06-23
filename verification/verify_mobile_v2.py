from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Set mobile viewport
    page.set_viewport_size({"width": 390, "height": 844})

    page.goto("http://localhost:3000/events/new")
    page.wait_for_timeout(2000)

    # Fill form
    page.fill('input[id="name"]', "Mobile UX Verification")
    page.wait_for_timeout(500)
    page.fill('input[id="date"]', "2024-12-31")
    page.wait_for_timeout(500)
    page.click('button:has-text("Save Event")')
    page.wait_for_timeout(2000)

    # Check-in mode (default)
    # Take screenshot of check-in mode on mobile
    page.screenshot(path="/home/jules/verification/screenshots/mobile_checkin.png")
    page.wait_for_timeout(1000)

    # Switch to Attendees tab using the bottom nav (which is visible on mobile)
    # The bottom nav buttons have text like "LIST" (uppercase span)
    page.click('nav.sm\\:hidden button:has-text("List")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/mobile_list.png")

    # Open Add Attendee (modal check on mobile)
    page.click('button:has-text("Add Attendee")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/mobile_attendee_modal.png")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={"width": 390, "height": 844},
            is_mobile=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
