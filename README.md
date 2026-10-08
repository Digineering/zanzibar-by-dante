# Zanzibar by Dante

Tour-guide website for Dante, Pongwe, Zanzibar. Static React + Vite site hosted free on GitHub Pages.

## How the Clean Beach log works

- Photos live in `client/public/cleanups/YYYY-MM-DD/` (1600px web image + 600px thumbnail, EXIF/GPS stripped).
- The log is driven by `client/src/data/cleanups.json`. One entry per cleanup day, newest first.
- The site features the newest cleanup, opens the log on the newest month, and keeps every earlier month one tap away. Nothing is ever removed.

### Add photos

```bash
pip install pillow
python scripts/add_cleanup.py path/to/photos/*.jpg --note "What happened"
# photos without a camera date: add --date 2026-08-28
git add -A && git commit -m "Cleanup log: new photos" && git push
```

The date comes from each photo's camera timestamp. Exact duplicates are skipped. Every push to `main` rebuilds and redeploys the site.

## Develop

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # outputs dist/public
```
