from playwright.sync_api import sync_playwright

def run_debug(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(2000)
    page.screenshot(path="/home/jules/verification/screenshots/debug_home.png")
    print(page.content())

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        run_debug(page)
        browser.close()
