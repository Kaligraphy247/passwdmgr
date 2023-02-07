"""Quickly restore incognito browsing session, without the cookies, of course."""

import os

chrome_path = r"C:\Program Files\Google\Chrome\Application"
os.chdir(chrome_path)
restore_sites = [
    "http://localhost:3000",
    "https://duckduckgo.com",
    "https://duckduckgo.com/?q=sequelize+with+nextjs",
    "https://github.com/dyarfi/nextjs-sequelize",
    "https://sequelize.org/docs/v6/core-concepts/model-basics/",
    "https://fontawesome.com/search",
    "https://fontawesome.com/docs/web/use-with/react/add-icons#add-individual-icons-explicitly",
    "https://w3collective.com/autocomplete-search-javascript/",
    "https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props",
    "https://nextjs.org/docs/api-routes/dynamic-api-routes",
    # "https://next-auth.js.org/"
]

print("Restoring previous session...\n")
for site in restore_sites:
    print(f'Restoring "{site}"...')
    os.system(f"chrome.exe --incognito {site}")

print(
    f"\nRestored {len(restore_sites)} {'site' if len(restore_sites) == 1 else 'sites'} from previous session.\nDone."
)
