from playwright.sync_api import sync_playwright
import os
import time

def run_cuj(page):
    # Set viewport to clean desktop
    page.set_viewport_size({"width": 1440, "height": 900})

    # Create screenshots directory
    os.makedirs("/home/jules/verification/screenshots", exist_ok=True)

    # Go to the app
    print("Navigating to app...")
    page.goto("http://localhost:5173")
    page.wait_for_timeout(3000)

    # TEST A: TITLE SCREEN
    print("Verifying Title Screen...")
    # page.wait_for_selector("[data-testid='title-screen']")
    page.screenshot(path="/home/jules/verification/screenshots/01-title-screen.png")

    page.get_by_test_id("title-begin-journey").click()
    page.wait_for_timeout(1500)

    # CHARACTER CREATION
    print("Verifying Character Creation...")
    page.wait_for_selector("[data-testid='character-creation-screen']")
    page.get_by_test_id("character-name-input").fill("Arin")
    page.wait_for_timeout(500)
    page.get_by_test_id("creation-next-button").click()
    page.wait_for_timeout(1000)

    page.get_by_test_id("avatar-option-1").click()
    page.wait_for_timeout(500)
    page.get_by_test_id("creation-next-button").click()
    page.wait_for_timeout(1000)

    page.get_by_test_id("aether-path-tidelume").click()
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/02-character-creation.png")

    page.get_by_test_id("begin-adventure-button").click()
    page.wait_for_timeout(3000)

    # TEST B: PHASE 2 GAMEPLAY
    print("Verifying Adventure Screen...")
    page.wait_for_selector("[data-testid='adventure-screen']")

    # Awakening
    page.get_by_test_id("dialogue-choice-0").click()
    page.wait_for_timeout(1500)

    # Meeting Lyra
    # Choice 2 is "I'm glad you're here." (kind)
    page.get_by_test_id("dialogue-choice-2").click()
    page.wait_for_timeout(1500)

    # Capture adventure dialogue
    page.screenshot(path="/home/jules/verification/screenshots/03-adventure-dialogue.png")

    # Open Inventory
    print("Verifying Inventory...")
    page.get_by_test_id("inventory-button").click()
    page.wait_for_selector("[data-testid='inventory-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/04-inventory.png")
    page.get_by_test_id("inventory-close-button").click()
    page.wait_for_timeout(1000)

    # Open Quest Journal
    print("Verifying Quest Journal...")
    page.get_by_test_id("quest-journal-button").click()
    page.wait_for_selector("[data-testid='quest-journal-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/05-quest-journal.png")
    page.get_by_test_id("quest-journal-close-button").click()
    page.wait_for_timeout(1000)

    # TEST C: PHASE 3 SYSTEMS
    print("Verifying World Map...")
    page.get_by_test_id("map-button").click()
    page.wait_for_selector("[data-testid='world-map-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/06-world-map.png")
    page.get_by_test_id("world-map-close-button").click()
    page.wait_for_timeout(1000)

    print("Verifying Companions...")
    page.get_by_test_id("companions-button").click()
    page.wait_for_selector("[data-testid='companions-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/07-companions.png")
    page.get_by_test_id("companions-close-button").click()
    page.wait_for_timeout(1000)

    print("Verifying Memory Timeline...")
    page.get_by_test_id("memories-button").click()
    page.wait_for_selector("[data-testid='memory-timeline-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/08-memory-timeline.png")
    page.get_by_test_id("memory-timeline-close-button").click()
    page.wait_for_timeout(1000)

    print("Verifying Settings...")
    page.get_by_test_id("settings-button").click()
    page.wait_for_selector("[data-testid='settings-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/09-settings-voice.png")
    page.get_by_test_id("settings-close-button").click()
    page.wait_for_timeout(1000)

    # TEST E: ENDING GALLERY
    print("Verifying Ending Gallery...")
    page.get_by_test_id("ending-gallery-button").click()
    page.wait_for_selector("[data-testid='ending-gallery-modal']")
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/10-ending-preview.png")
    page.get_by_test_id("ending-gallery-close-button").click()
    page.wait_for_timeout(1000)

    # TEST D: PERSISTENCE
    print("Verifying Persistence...")
    page.reload()
    page.wait_for_timeout(4000)
    # App logic shows adventure screen directly if started
    if page.query_selector("[data-testid='adventure-screen']"):
        print("Adventure screen recovered directly after reload.")
        hud_text = page.get_by_test_id("player-hud").inner_text()
        if "ARIN" in hud_text: # HUD text is uppercase
            print("Persistence verified: Player name 'ARIN' found.")
        else:
            print(f"Persistence warning: Expected 'ARIN' in HUD, found '{hud_text}'")
    else:
        page.wait_for_selector("[data-testid='title-screen']")
        if page.query_selector("[data-testid='title-continue-adventure']"):
            print("Continue button found. Reloading adventure...")
            page.get_by_test_id("title-continue-adventure").click()
            page.wait_for_timeout(3000)
            page.wait_for_selector("[data-testid='adventure-screen']")
            hud_text = page.get_by_test_id("player-hud").inner_text()
            if "ARIN" in hud_text:
                print("Persistence verified: Player name 'ARIN' found.")
        else:
            print("Persistence failed: Neither Adventure Screen nor Continue button found.")

    print("User journey verification complete.")

if __name__ == "__main__":
    os.makedirs("/home/jules/verification/videos", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1440, 'height': 900}
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
