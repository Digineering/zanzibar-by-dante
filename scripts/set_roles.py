#!/usr/bin/env python3
"""Tag photos already in the Clean Beach log as the cleanup's proof set.

Usage:
  python scripts/set_roles.py DATE before=HASH after=HASH haul=HASH
  python scripts/set_roles.py DATE --clear

HASH is the 12-character id in the photo's filename (cleanups/DATE/HASH.jpg).
Any role can be left out. The site shows tagged photos as a
Before / After / Haul strip at the top of that cleanup.
"""
import json
import pathlib
import sys

MANIFEST = pathlib.Path(__file__).resolve().parent.parent / "client" / "src" / "data" / "cleanups.json"
ROLES = {"before", "after", "haul"}


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 1
    date, rest = argv[0], argv[1:]
    data = json.loads(MANIFEST.read_text())
    entry = next((e for e in data["entries"] if e["date"] == date), None)
    if entry is None:
        print(f"no cleanup on {date}")
        return 1
    if rest == ["--clear"]:
        for p in entry["photos"]:
            p.pop("role", None)
    else:
        by_hash = {p["hash"]: p for p in entry["photos"]}
        for arg in rest:
            role, _, h = arg.partition("=")
            if role not in ROLES or h not in by_hash:
                print(f"bad argument {arg!r} (role must be before/after/haul, hash must be in {date})")
                return 1
            for p in entry["photos"]:
                if p.get("role") == role:
                    p.pop("role")
            by_hash[h]["role"] = role
    MANIFEST.write_text(json.dumps(data, indent=2) + "\n")
    print({p["hash"]: p.get("role") for p in entry["photos"] if p.get("role")})
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
