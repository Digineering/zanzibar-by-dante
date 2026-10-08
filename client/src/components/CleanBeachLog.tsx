/**
 * Clean Beach Initiative + Cleanup Log
 *
 * Data: client/src/data/cleanups.json, written only by scripts/add_cleanup.py
 * (manual backfills and the email automation both use that script).
 *
 * Display rules:
 *  - The newest entry is featured at the top of the section.
 *  - The log opens on the newest month. Every earlier month stays one tap away
 *    in the month tabs, so nothing ever falls off; "All" shows the full history
 *    back to the first cleanup.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import log from "@/data/cleanups.json";

type Photo = { src: string; thumb: string; w: number; h: number; hash: string };
type Entry = { date: string; location: string; note: string; photos: Photo[] };

const LOGO_CLEAN_BEACH = "media/deployed/logo_clean_beach_initiative_f7e45a43.png";
const ENTRIES: Entry[] = [...(log.entries as Entry[])].sort((a, b) => b.date.localeCompare(a.date));
const THUMBS_PER_CARD = 8;


function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}
const fmtLong = (iso: string) =>
  parseDate(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const fmtMonth = (key: string) =>
  parseDate(`${key}-01`).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
const monthKey = (iso: string) => iso.slice(0, 7);

// ─── Lightbox ────────────────────────────────────────────────────────────────
type Slide = { photo: Photo; entry: Entry };

function Lightbox({ slides, index, onClose, onMove }: {
  slides: Slide[]; index: number; onClose: () => void; onMove: (i: number) => void;
}) {
  const slide = slides[index];
  const go = useCallback((d: number) => onMove((index + d + slides.length) % slides.length), [index, slides.length, onMove]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [go, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-[oklch(0.12_0.03_250/0.96)] flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Cleanup photo viewer"
    >
      <div className="flex items-center justify-between px-4 md:px-8 py-4 text-white/90 font-body text-sm" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="font-semibold">{fmtLong(slide.entry.date)}</div>
          <div className="text-white/60 text-xs">{slide.entry.location} · {index + 1} of {slides.length}</div>
        </div>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-xl" aria-label="Close">×</button>
      </div>
      <div className="relative flex-1 flex items-center justify-center px-2 md:px-16 pb-6 min-h-0">
        <img
          key={slide.photo.src}
          src={slide.photo.src}
          alt={`Beach cleanup on ${fmtLong(slide.entry.date)}`}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        {slides.length > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl" aria-label="Previous photo">‹</button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white text-2xl" aria-label="Next photo">›</button>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── One log entry ───────────────────────────────────────────────────────────
function EntryCard({ entry, onOpen }: { entry: Entry; onOpen: (photo: Photo) => void }) {
  const d = parseDate(entry.date);
  const shown = entry.photos.slice(0, THUMBS_PER_CARD);
  const extra = entry.photos.length - shown.length;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl shadow-sm border border-[oklch(0.9_0.02_80)] p-4 md:p-6 grid md:grid-cols-[120px_1fr] gap-4 md:gap-6"
    >
      <header className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-0">
        <div className={`font-display text-5xl md:text-6xl font-semibold leading-none text-[oklch(0.22_0.06_250)]`}>{d.getDate()}</div>
        <div>
          <div className="font-body text-sm font-semibold text-[oklch(0.55_0.12_195)] uppercase tracking-wider md:mt-1">
            {d.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
          </div>
          <div className="font-body text-xs text-[oklch(0.45_0.04_250)] mt-0.5">{d.toLocaleDateString("en-GB", { weekday: "long" })}</div>
        </div>
      </header>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 font-body text-xs text-[oklch(0.45_0.04_250)]">
          <span>📍 {entry.location}</span>
          <span>📷 {entry.photos.length} photo{entry.photos.length === 1 ? "" : "s"}</span>
        </div>
        {entry.note && <p className="font-body text-sm md:text-base text-[oklch(0.3_0.04_250)] leading-relaxed mb-4">{entry.note}</p>}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {shown.map((p, i) => {
            const isLast = i === shown.length - 1 && extra > 0;
            return (
              <button
                key={p.hash}
                onClick={() => onOpen(p)}
                className="relative aspect-square overflow-hidden rounded-lg bg-[oklch(0.93_0.035_80)] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.12_195)]"
                aria-label={`Open photo ${i + 1} from ${fmtLong(entry.date)}`}
              >
                <img src={p.thumb} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {isLast && (
                  <span className="absolute inset-0 bg-black/55 text-white font-body font-semibold flex items-center justify-center">+{extra}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function CleanBeachLog() {
  const months = useMemo(() => {
    const m = new Map<string, Entry[]>();
    for (const e of ENTRIES) {
      const k = monthKey(e.date);
      m.set(k, [...(m.get(k) ?? []), e]);
    }
    return Array.from(m.entries()); // newest month first
  }, []);

  const [active, setActive] = useState<string>(months[0]?.[0] ?? "all");
  const [lightbox, setLightbox] = useState<{ slides: Slide[]; index: number } | null>(null);

  const latest = ENTRIES[0];
  const first = ENTRIES[ENTRIES.length - 1];
  const totalPhotos = ENTRIES.reduce((n, e) => n + e.photos.length, 0);
  const visible: Entry[] = active === "all" ? ENTRIES : months.find(([k]) => k === active)?.[1] ?? [];

  const openPhoto = (entries: Entry[], photo: Photo) => {
    const slides = entries.flatMap((entry) => entry.photos.map((p) => ({ photo: p, entry })));
    setLightbox({ slides, index: Math.max(0, slides.findIndex((s) => s.photo.hash === photo.hash)) });
  };

  const stats = [
    { number: String(ENTRIES.length), label: ENTRIES.length === 1 ? "Cleanup logged" : "Cleanups logged" },
    { number: String(totalPhotos), label: "Photos as proof" },
    { number: first ? fmtMonth(monthKey(first.date)) : "—", label: "Logging since" },
  ];

  return (
    <section id="clean-beach" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
            <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-[oklch(0.55_0.12_195)] mb-4">
              The Clean Beach Initiative
            </span>
            <span className="gold-rule" />
            <h2 className={`font-display text-4xl md:text-5xl font-semibold text-[oklch(0.22_0.06_250)] mb-6`}>
              Cleaning today for a better tomorrow
            </h2>
            <p className="font-body text-base text-[oklch(0.35_0.04_250)] mb-5 leading-relaxed">
              I collect the plastic and rubbish that washes up and piles up around Pongwe before it reaches the ocean. I pay people from my village to help, and every booking funds this work.
            </p>
            <p className="font-body text-base text-[oklch(0.35_0.04_250)] mb-8 leading-relaxed">
              Don't take my word for it. Every cleanup goes into the log below, dated from the photo itself, so you can trace the work all the way back to the first day.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center bg-[oklch(0.93_0.035_80)] rounded-xl p-3 md:p-4">
                  <div className="font-display text-2xl md:text-3xl font-semibold text-[oklch(0.55_0.12_195)] mb-1">{s.number}</div>
                  <div className="font-body text-[11px] md:text-xs text-[oklch(0.45_0.04_250)]">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <img src={LOGO_CLEAN_BEACH} alt="Dante's Clean Beach Initiative badge" className="w-20 h-20 md:w-24 md:h-24 object-contain shrink-0" />
              <div>
                <div className={`font-body text-sm font-semibold text-[oklch(0.22_0.06_250)]`}>Dante's Clean Beach Initiative</div>
                <div className="font-body text-xs text-[oklch(0.45_0.04_250)] mt-1">Cleaning Today For A Better Tomorrow</div>
                <a href="#cleanup-log" className="inline-block font-body text-xs font-semibold text-[oklch(0.55_0.12_195)] mt-1 hover:underline">See the cleanup log ↓</a>
              </div>
            </div>
          </motion.div>

          {latest && (
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, delay: 0.1 }}>
              <button onClick={() => openPhoto([latest], latest.photos[0])} className="relative block w-full text-left group" aria-label="Open latest cleanup photos">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-[oklch(0.93_0.035_80)]">
                  <img src={latest.photos[0].src} alt={`Dante's latest beach cleanup, ${fmtLong(latest.date)}`} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className={`absolute -bottom-5 -left-3 md:-left-5 bg-[oklch(0.22_0.06_250)] text-white rounded-2xl p-5 max-w-[230px] shadow-xl`}>
                  <p className="font-body text-[11px] uppercase tracking-[0.18em] text-white/60 mb-1">Latest cleanup</p>
                  <p className="font-script text-xl text-[oklch(0.75_0.14_70)] leading-tight">{fmtLong(latest.date)}</p>
                  <p className="font-body text-xs text-white/75 mt-1">{latest.location} · {latest.photos.length} photos</p>
                </div>
              </button>
            </motion.div>
          )}
        </div>

        {/* Log */}
        <div id="cleanup-log" className="mt-20 md:mt-28 scroll-mt-24 rounded-3xl bg-[oklch(0.97_0.015_80)] p-4 sm:p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h3 className={`font-display text-3xl md:text-4xl font-semibold text-[oklch(0.22_0.06_250)]`}>The cleanup log</h3>
              <p className="font-body text-sm text-[oklch(0.45_0.04_250)] mt-1 max-w-lg">
                Every cleanup Dante sends in, newest first. Pick a month to go back in time.
              </p>
            </div>
          </div>

          {/* Month tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1" role="tablist" aria-label="Cleanup log months">
            {months.map(([k, es]) => (
              <button
                key={k}
                role="tab"
                aria-selected={active === k}
                onClick={() => setActive(k)}
                className={`shrink-0 font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                  active === k
                    ? `bg-[oklch(0.22_0.06_250)] text-white border-transparent`
                    : `bg-white text-[oklch(0.22_0.06_250)] border-[oklch(0.88_0.02_80)] hover:border-[oklch(0.55_0.12_195)]`
                }`}
              >
                {fmtMonth(k)} <span className={active === k ? "text-white/60" : "text-[oklch(0.55_0.04_250)]"}>· {es.length}</span>
              </button>
            ))}
            {months.length > 1 && (
              <button
                role="tab"
                aria-selected={active === "all"}
                onClick={() => setActive("all")}
                className={`shrink-0 font-body text-sm px-4 py-2 rounded-full border transition-colors ${
                  active === "all" ? `bg-[oklch(0.22_0.06_250)] text-white border-transparent` : `bg-white text-[oklch(0.22_0.06_250)] border-[oklch(0.88_0.02_80)] hover:border-[oklch(0.55_0.12_195)]`
                }`}
              >
                All, from the start
              </button>
            )}
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {visible.map((e: Entry) => (
                <EntryCard key={e.date} entry={e} onOpen={(p) => openPhoto(visible, p)} />
              ))}
            </AnimatePresence>
          </div>

          <p className="font-body text-xs text-[oklch(0.5_0.03_250)] mt-6">
            Dates come from each photo's camera timestamp. New cleanups appear here automatically when Dante sends them in.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            slides={lightbox.slides}
            index={lightbox.index}
            onClose={() => setLightbox(null)}
            onMove={(i) => setLightbox((lb) => (lb ? { ...lb, index: i } : lb))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
