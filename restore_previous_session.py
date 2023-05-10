"""Quickly restore incognito browsing session, without the cookies, of course."""

import os

chrome_path = r"C:\Program Files\Google\Chrome\Application"
os.chdir(chrome_path)
restore_sites = [
    "http://localhost:3000",
    "https://duckduckgo.com",
    "https://sequelize.org/docs/v6/core-concepts/model-basics/",
    "https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props"
]

print("Restoring previous session...\n")
for index, site in enumerate(restore_sites, 1):
    print(f'{index}. Restoring "{site}"...')
    os.system(f"chrome.exe --incognito {site}")

print(
    f"\nRestored {len(restore_sites)} {'site' if len(restore_sites) == 1 else 'sites'} from previous session.\nDone."
)
