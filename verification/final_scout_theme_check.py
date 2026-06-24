from playwright.sync_api import sync_playwright
import os

def run_cuj(page):
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto("http://localhost:3000/events/new")
    page.wait_for_timeout(2000)

    # Create event
    page.fill('input[id="name"]', "Scouting Event 2024")
    page.fill('input[id="date"]', "2024-07-04")
    page.click('button:has-text("Save Event")')
    page.wait_for_timeout(2000)

    # Home page with scouting theme
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_home.png")

    # Event detail - Check-in
    page.click('text=Scouting Event 2024')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_checkin.png")

    # Add walk-in modal (validation check + theme)
    page.click('button:has-text("Add Walk-in")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_walkin_modal.png")
    page.click('button:has-text("Cancel")')

    # Stats view
    page.click('nav.sm\\:hidden button:has-text("Stats")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_stats.png")

    # Export modal
    page.click('button:has-text("Export Data")') # Might need scroll or desktop view if button hidden
    # On mobile, export is in the Stats tab usually? Let's check the code.
    # Ah, export is in the 'aside' hidden on mobile. I'll resize to see it.
    page.set_viewport_size({"width": 1280, "height": 800})
    page.wait_for_timeout(1000)
    page.click('button:has-text("Export Data")')
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/scout_theme_export.png")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            run_cuj(page)
        finally:
            browser.close()
