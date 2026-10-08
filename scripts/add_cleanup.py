#!/usr/bin/env python3
"""Add beach-cleanup photos to the Clean Beach log.

Usage:
  python scripts/add_cleanup.py PHOTO [PHOTO ...] [--date YYYY-MM-DD]
         [--location "Pongwe, Zanzibar"] [--note "What happened"]

What it does:
  1. Reads each photo's capture date from EXIF (falls back to --date, then today).
  2. Groups photos into one log entry per day.
  3. Resizes to a 1600px web image and a 600px thumbnail, strips EXIF/GPS.
  4. Skips exact duplicates (Dante resending the same photo).
  5. Updates client/src/data/cleanups.json, newest entry first.

The email automation calls this same script, so manual backfills and
automatic uploads produce identical results.
"""
import argparse
import datetime as dt
import hashlib
import json
import pathlib
import sys

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "client" / "public"
PHOTO_DIR = PUBLIC / "cleanups"
MANIFEST = ROOT / "client" / "src" / "data" / "cleanups.json"
DEFAULT_LOCATION = "Pongwe, Zanzibar"
FULL_PX, THUMB_PX = 1600, 600


def capture_date(img: Image.Image) -> str | None:
    exif = img.getexif()
    raw = exif.get_ifd(0x8769).get(36867) or exif.get(306)
    if not raw:
        return None
    try:
        return dt.datetime.strptime(str(raw).strip()[:19], "%Y:%m:%d %H:%M:%S").date().isoformat()
    except ValueError:
        return None


def load_manifest() -> dict:
    if MANIFEST.exists():
        return json.loads(MANIFEST.read_text())
    return {"entries": []}


def save_manifest(data: dict) -> None:
    data["entries"].sort(key=lambda e: e["date"], reverse=True)
    for e in data["entries"]:
        e["photos"].sort(key=lambda p: p.get("order", 0))
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(data, indent=2) + "\n")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("photos", nargs="+")
    ap.add_argument("--date", help="Fallback date (YYYY-MM-DD) for photos with no EXIF date")
    ap.add_argument("--force-date", action="store_true", help="Use --date even when EXIF has a date")
    ap.add_argument("--location", default=None)
    ap.add_argument("--note", default=None)
    args = ap.parse_args()

    data = load_manifest()
    by_date = {e["date"]: e for e in data["entries"]}
    known = {p["hash"] for e in data["entries"] for p in e["photos"]}
    added = 0

    for path in args.photos:
        raw = pathlib.Path(path).read_bytes()
        digest = hashlib.sha1(raw).hexdigest()[:12]
        if digest in known:
            print(f"skip duplicate: {path}")
            continue
        img = Image.open(path)
        exif_date = capture_date(img)
        date = (args.date if args.force_date else None) or exif_date or args.date or dt.date.today().isoformat()
        img = ImageOps.exif_transpose(img).convert("RGB")

        out_dir = PHOTO_DIR / date
        out_dir.mkdir(parents=True, exist_ok=True)
        full = img.copy(); full.thumbnail((FULL_PX, FULL_PX))
        thumb = img.copy(); thumb.thumbnail((THUMB_PX, THUMB_PX))
        full.save(out_dir / f"{digest}.jpg", quality=80, optimize=True, progressive=True)
        thumb.save(out_dir / f"t_{digest}.jpg", quality=75, optimize=True, progressive=True)

        entry = by_date.get(date)
        if entry is None:
            entry = {"date": date, "location": args.location or DEFAULT_LOCATION, "note": args.note or "", "photos": []}
            by_date[date] = entry
            data["entries"].append(entry)
        else:
            if args.location:
                entry["location"] = args.location
            if args.note:
                entry["note"] = args.note
        entry["photos"].append({
            "src": f"cleanups/{date}/{digest}.jpg",
            "thumb": f"cleanups/{date}/t_{digest}.jpg",
            "w": full.width,
            "h": full.height,
            "hash": digest,
            "order": len(entry["photos"]),
            "dated": "exif" if exif_date and not args.force_date else "assigned",
        })
        known.add(digest)
        added += 1
        print(f"added {path} -> {date}")

    save_manifest(data)
    print(f"{added} photo(s) added; log has {len(data['entries'])} entr(ies).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
