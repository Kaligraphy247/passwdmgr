"""Quickly restore incognito browsing session, without the cookies, of course."""

import os

chrome_path = r"C:\Program Files\Google\Chrome\Application"
os.chdir(chrome_path)
restore_sites = [
    "http://localhost:3000",
    "https://duckduckgo.com",
    "https://duckduckgo.com/?q=sequelize+with+nextjs",
    "https://sequelize.org/docs/v6/core-concepts/model-basics/",
    "https://fontawesome.com/search",
    "https://fontawesome.com/docs/web/use-with/react/add-icons#add-individual-icons-explicitly",
    "https://w3collective.com/autocomplete-search-javascript/",
    "https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props",
    "https://nextjs.org/docs/api-routes/dynamic-api-routes",
    "https://nextjs.org/docs/guides/building-forms",
    # "https://headlessui.com/react/dialog",
    # "https://next-auth.js.org/",
    # "https://dev.to/mgranados/how-to-build-a-simple-login-with-nextjs-and-react-hooks-255",
]

print("Restoring previous session...\n")
for index, site in enumerate(restore_sites, 1):
    print(f'{index}. Restoring "{site}"...')
    os.system(f"chrome.exe --incognito {site}")

print(
    f"\nRestored {len(restore_sites)} {'site' if len(restore_sites) == 1 else 'sites'} from previous session.\nDone."
)
