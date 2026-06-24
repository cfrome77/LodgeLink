from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    # Desktop view to ensure everything is visible
    page.set_viewport_size({"width": 1280, "height": 800})

    page.goto("http://localhost:3000/events/new")
    page.wait_for_timeout(2000)

    # Create event
    page.fill('input[id="name"]', "Scouting Event 2024")
    page.fill('input[id="date"]', "2024-07-04")
    page.click('button:has-text("Save Event")')
    page.wait_for_timeout(3000)

    # Home page with scouting theme
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_home_v2.png")

    # Event detail - Check-in
    page.click('text=Scouting Event 2024')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_checkin_v2.png")

    # Add walk-in modal (validation check + theme)
    page.click('button:has-text("Add Walk-in")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_walkin_modal_v2.png")
    page.click('button:has-text("Cancel")')

    # Export modal
    page.click('button:has-text("Export Data")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_export_v2.png")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_cuj(page)
        finally:
            browser.close()
