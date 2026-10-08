/**
 * ZANZIBAR BY DANTE — Home Page
 * Design: Coastal Editorial
 * Palette: Deep Navy, Warm Sand, Ocean Teal, Sunset Gold
 * Typography: Cormorant Garamond (display) + DM Sans (body) + Dancing Script (accent)
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import CleanBeach from "@/components/CleanBeachLog";

// ─── Image URLs (generated, served from manus-storage) ────────────────────────
const HERO_IMG = "media/deployed/hero_zanzibar_33ccc3ff.jpg";
const MNEMBA_IMG = "media/deployed/d_221d158b_47528de7.jpeg"; // Real snorkeling photo
const DHOW_IMG = "media/deployed/sunset_dhow_d3c552c1.jpg";
const DANTE_IMG = "media/deployed/d_img4909_a1e1f35c.jpeg"; // Dante thumbs up on boat — best About portrait
const LOGO_MAIN = "media/deployed/logo_zanzibar_by_dante_701516ee.png";
const LOGO_CLEAN_BEACH = "media/deployed/logo_clean_beach_initiative_f7e45a43.png";

// ─── Unsplash fallback images for gallery ─────────────────────────────────────
const GALLERY_IMGS = [
  "media/deployed/gal_boats_turquoise_5b28fc7e.jpg",   // Two boats on turquoise water
  "media/deployed/gal_dante_rock_arch_c40f952a.jpg",   // Dante + tourist in coral rock arch
  "media/deployed/gal_spice_couple_6733760b.jpg",      // Couple in leaf hats at spice farm
  "media/deployed/gal_spice_group_afa703b2.jpg",       // Group at spice farm with Dante
  "media/deployed/gal_stone_town_market_a0425731.jpg", // Stone Town market
  "media/deployed/gal_jozani_boardwalk_5a50b0ba.jpg",  // Jozani forest boardwalk
  "media/deployed/gal_dante_bridge_cbca4f02.jpg",      // Dante + tourist on forest bridge
  "media/deployed/gal_hibiscus_local_55c90566.jpg",    // Local with hibiscus flowers
  "media/deployed/dante_fruit_market_56bba80e.jpeg",   // Dante at fruit market
];

// ─── WhatsApp number (placeholder — replace with Dante's real number) ─────────
const WHATSAPP_NUMBER = "255657587223"; // Dante's WhatsApp
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Dante%2C%20I%27d%20like%20to%20book%20a%20tour%20in%20Zanzibar!`;

// ─── Share Button Component ──────────────────────────────────────────────────
function ShareButton({ title, description }: { title: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${title} — Zanzibar by Dante`,
      text: `Check out this tour with Dante in Zanzibar: ${title}. ${description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled — do nothing
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      title="Share this tour"
      className="flex items-center gap-1.5 text-xs font-medium text-[oklch(0.55_0.12_195)] hover:text-[oklch(0.45_0.10_195)] transition-colors duration-150 mt-1"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Link copied!
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share this tour
        </>
      )}
    </button>
  );
}

// ─── Animation variants ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay },
  }),
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Sticky WhatsApp Button ────────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[oklch(0.55_0.12_195)] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-body font-medium text-sm wa-pulse"
      aria-label="Chat with Dante on WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Chat with Dante
    </a>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Tours", href: "#tours" },
    { label: "Clean Beach", href: "#clean-beach" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20 md:h-28">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          {/* Real logo: white circle background on dark hero, plain on scrolled white nav */}
          <div className={`rounded-full flex items-center justify-center transition-all duration-300 ${
            scrolled ? "bg-white shadow-md w-28 h-28" : "bg-white w-28 h-28 shadow-xl"
          }`}>
            <img
              src={LOGO_MAIN}
              alt="Zanzibar by Dante"
              className="w-27 h-27 object-contain rounded-full p-1"
            />
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-sm font-medium tracking-wide hover:text-[oklch(0.55_0.12_195)] transition-colors ${
                scrolled ? "text-[oklch(0.22_0.06_250)]" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[oklch(0.55_0.12_195)] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[oklch(0.48_0.12_195)] transition-colors"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden p-2 ${scrolled ? "text-[oklch(0.22_0.06_250)]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-[oklch(0.88_0.02_80)] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-base text-[oklch(0.22_0.06_250)] hover:text-[oklch(0.55_0.12_195)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[oklch(0.55_0.12_195)] text-white px-5 py-3 rounded-full text-sm font-medium text-center"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
      }} />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          >
            <span className="inline-block font-body text-sm font-medium tracking-[0.2em] uppercase text-[oklch(0.75_0.14_70)] mb-4">
              Pongwe, Zanzibar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] mb-6"
          >
            Experience the real Zanzibar with a trusted local.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
            className="font-body text-lg text-white/85 mb-8 max-w-lg leading-relaxed"
          >
            I'm Dante. I show you the beauty of my island — and every booking helps me keep our beaches clean.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[oklch(0.55_0.12_195)] text-white px-8 py-4 rounded-full font-medium text-base hover:bg-[oklch(0.48_0.12_195)] hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat with Dante
            </a>
            <a
              href="#tours"
              className="inline-flex items-center justify-center gap-2 border border-white/50 text-white px-8 py-4 rounded-full font-medium text-base hover:bg-white/10 transition-all duration-200"
            >
              See the Tours
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
          {/* Clean Beach Initiative badge on hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-24 right-6 md:right-12 z-10"
          >
            <img
              src={LOGO_CLEAN_BEACH}
              alt="Dante's Clean Beach Initiative"
              className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
          >
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-[oklch(0.98_0.01_80)]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <AnimatedSection>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={DANTE_IMG}
                  alt="Dante, your local guide in Pongwe, Zanzibar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🏡</span>
                  <span className="font-body text-xs font-semibold text-[oklch(0.22_0.06_250)]">From Pongwe</span>
                </div>
                <p className="font-body text-xs text-[oklch(0.45_0.04_250)] leading-relaxed">
                  East coast village, 45 km from Stone Town — where the real Zanzibar begins
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection>
            <span className="gold-rule" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[oklch(0.22_0.06_250)] mb-6">
              Your local friend in Zanzibar
            </h2>
            <p className="font-body text-base text-[oklch(0.35_0.04_250)] mb-5 leading-relaxed">
              My name is Dante. I'm 23 years old and I grew up in Pongwe — a quiet fishing village on Zanzibar's east coast, where the reef runs close to shore and the mornings smell of salt and coconut. The ocean has been part of my life since I was a child.
            </p>
            <p className="font-body text-base text-[oklch(0.35_0.04_250)] mb-5 leading-relaxed">
              I left school after Form 2 and made a decision: I would become a guide. Not just any guide — a real ambassador for this island. I studied English specifically to be able to share Zanzibar with the world. My goal is to become someone visitors trust completely, and to use that trust to protect the place I love.
            </p>
            <p className="font-body text-base text-[oklch(0.35_0.04_250)] mb-8 leading-relaxed">
              I handle everything personally on WhatsApp. No booking fees, no middlemen, no surprises. When you book with me, you're also helping fund beach cleanups that employ people from my village.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: "🏡", label: "From Pongwe village" },
                { icon: "🐢", label: "Marine advocate" },
                { icon: "♻️", label: "Community cleaner" },
                { icon: "🤝", label: "Books direct on WhatsApp" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-[oklch(0.93_0.035_80)] px-4 py-2 rounded-full">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-body text-sm font-medium text-[oklch(0.22_0.06_250)]">{item.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Tours Section ────────────────────────────────────────────────────────────
const TIER1_TOURS = [
  {
    title: "Local Sailing, Dive & Fish",
    price: "$50",
    duration: "Half day",
    tag: "Most popular",
    image: "media/deployed/d_img4915_f1c12903.jpeg",
    description: "A half-day adventure on a traditional local boat. We snorkel the vibrant reefs, try handline fishing, and explore the pristine waters off Pongwe. Gear included. Children welcome.",
    highlights: ["Snorkeling gear included", "Handline fishing", "Local crew", "Flexible timing"],
  },
  {
    title: "Mnemba Atoll Snorkeling",
    price: "From $45",
    duration: "4–6 hours",
    tag: "Best snorkeling",
    image: MNEMBA_IMG,
    description: "The best snorkeling in Zanzibar. We head out early to beat the crowds, search for dolphins, and swim among turtles and colourful reef fish in the protected marine conservation area.",
    highlights: ["Dolphin encounter", "Sea turtles", "Marine park fee included", "Early departure"],
  },
  {
    title: "Sunset Dhow Cruise",
    price: "From $35",
    duration: "2–3 hours",
    tag: "Unmissable",
    image: DHOW_IMG,
    description: "Watch the famous Zanzibar sunset from the water on a traditional wooden dhow. Calm seas, warm light, local music, and a cold drink in hand. The best way to end any day on the island.",
    highlights: ["Traditional dhow", "Sundowner drinks", "Local music", "Golden hour"],
  },
  {
    title: "Full Day Dhow with BBQ",
    price: "From $80",
    duration: "Full day (9 hrs)",
    tag: "Signature trip",
    image: "media/deployed/dante_on_water_71716526.jpeg",
    description: "A full day on the water — Mnemba Atoll snorkeling, a sandbank stop at low tide, dolphin search, and a fresh seafood BBQ lunch cooked on board. The complete Zanzibar ocean experience.",
    highlights: ["Seafood BBQ included", "Sandbank stop", "All gear included", "Full day adventure"],
  },
  {
    title: "Stone Town & Prison Island",
    price: "From $40",
    duration: "Half or full day",
    tag: "Culture & history",
    image: "media/deployed/card_stone_town_1d1bcde7.jpg",
    description: "I take you personally through the UNESCO World Heritage old town — the spice markets, the old slave chambers, Freddie Mercury's birthplace, and the famous giant tortoises on Prison Island. No group buses, no rushed schedules.",
    highlights: ["Personal guided tour", "Prison Island tortoises", "Local market stops", "Flexible pace"],
  },
  {
    title: "Spice Farm Tour",
    price: "From $30",
    duration: "3–4 hours",
    tag: "Local favourite",
    image: "media/deployed/card_spice_nutmeg_4896e9b6.jpg",
    description: "Zanzibar was once the world's largest clove producer. I take you to a working spice farm and guide you through it myself — tasting, smelling, and learning the history of the flavours that made this island famous.",
    highlights: ["Personal guided walk", "Taste & smell spices", "Local farm, not tourist trap", "Includes transport"],
  },
  {
    title: "Jozani Forest",
    price: "From $35",
    duration: "3–4 hours",
    tag: "Wildlife",
    image: "media/deployed/card_jozani_monkey_a76a9a45.jpg",
    description: "I drive you to Jozani and guide you through the forest myself to see the rare Red Colobus monkeys — found nowhere else on earth. I know where they gather and how to approach without disturbing them.",
    highlights: ["Red Colobus monkeys", "Personal guided walk", "Transport included", "Conservation fee included"],
  },
];

const TIER2_SERVICES = [
  {
    icon: "🦁",
    title: "Serengeti & Tarangire Safari",
    description: "The one big trip I don't guide personally — but I arrange everything. I connect you with the operators I trust, handle transfers from Zanzibar, and stay on WhatsApp throughout so nothing goes wrong.",
  },
  {
    icon: "🚤",
    title: "Transfers & Logistics",
    description: "Airport pickups, hotel transfers, inter-island ferries, and day trip logistics. I know every road and every operator on this island. Let me handle the details so you don't have to.",
  },
  {
    icon: "🤿",
    title: "Scuba Diving",
    description: "I collect you from your hotel, take you to the best dive shop on the north coast, and hand you over to the dive master personally. You get a trusted introduction, not a cold walk-in.",
  },
];

function Tours() {
  const [expandedTour, setExpandedTour] = useState<number | null>(null);

  return (
    <section id="tours" className="py-20 md:py-28 bg-white">
      <div className="container">
        {/* Header */}
        <AnimatedSection className="mb-14">
          <span className="gold-rule" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-[oklch(0.22_0.06_250)] mb-3">
                Explore with me
              </h2>
              <p className="font-body text-base text-[oklch(0.45_0.04_250)] max-w-xl">
                These are the experiences I personally guide. You'll be on the boat with me and my crew, exploring the best spots away from the crowds.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 border-2 border-[oklch(0.55_0.12_195)] text-[oklch(0.55_0.12_195)] px-6 py-3 rounded-full font-medium text-sm hover:bg-[oklch(0.55_0.12_195)] hover:text-white transition-all duration-200"
            >
              Ask about custom trips
            </a>
          </div>
        </AnimatedSection>

        {/* Tier 1 Tour Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {TIER1_TOURS.map((tour, i) => (
            <motion.div
              key={tour.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[oklch(0.88_0.02_80)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[oklch(0.75_0.14_70)] text-[oklch(0.22_0.06_250)] text-xs font-semibold px-3 py-1 rounded-full font-body">
                    {tour.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-xl font-semibold text-[oklch(0.22_0.06_250)] leading-tight">
                    {tour.title}
                  </h3>
                  <span className="shrink-0 font-body text-lg font-semibold text-[oklch(0.55_0.12_195)]">
                    {tour.price}
                  </span>
                </div>
                <span className="font-body text-xs text-[oklch(0.55_0.04_250)] mb-3">⏱ {tour.duration}</span>
                <p className="font-body text-sm text-[oklch(0.45_0.04_250)] leading-relaxed mb-4 flex-1">
                  {tour.description}
                </p>

                {/* Highlights toggle */}
                <button
                  onClick={() => setExpandedTour(expandedTour === i ? null : i)}
                  className="text-left text-xs font-medium text-[oklch(0.55_0.12_195)] mb-3 hover:underline"
                >
                  {expandedTour === i ? "▲ Less detail" : "▼ What's included"}
                </button>
                {expandedTour === i && (
                  <ul className="mb-4 space-y-1">
                    {tour.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-[oklch(0.45_0.04_250)] font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.75_0.14_70)] shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto flex flex-col gap-2">
                  <a
                    href={`${WHATSAPP_URL}&text=Hi%20Dante%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20tour!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-[oklch(0.22_0.06_250)] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[oklch(0.55_0.12_195)] transition-colors duration-200"
                  >
                    Book This Trip
                  </a>
                  <div className="flex justify-center">
                    <ShareButton title={tour.title} description={tour.description} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Personal Guide Service */}
        <AnimatedSection className="mb-20">
          <div className="relative bg-[oklch(0.22_0.06_250)] rounded-3xl overflow-hidden p-8 md:p-12">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[oklch(0.75_0.14_70)] blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[oklch(0.55_0.12_195)] blur-2xl" />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-[oklch(0.75_0.14_70)] mb-4">
                  New Service
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4">
                  Your Personal Zanzibar Fixer
                </h3>
                <p className="font-body text-base text-white/80 leading-relaxed mb-4">
                  Don't want the hassle of negotiating with different operators every day? Hire me as your personal guide for your entire stay.
                </p>
                <p className="font-body text-base text-white/80 leading-relaxed">
                  I stick with you from arrival to departure — taking you to hidden local spots that big tour companies miss, handling all negotiations for transport and activities, and making sure you get the authentic, safe, and fair-priced Zanzibar experience. Think of me as your island insider.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "🗺️", text: "Hidden spots the tour operators don't use" },
                  { icon: "🤝", text: "I negotiate prices with locals on your behalf" },
                  { icon: "🚗", text: "Transport, transfers, and logistics handled" },
                  { icon: "🌊", text: "Flexible — beach, culture, food, whatever you want" },
                  { icon: "💬", text: "Available on WhatsApp throughout your stay" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <p className="font-body text-sm text-white/85 leading-relaxed">{item.text}</p>
                  </div>
                ))}
                <a
                  href={`${WHATSAPP_URL}&text=Hi%20Dante%2C%20I%27d%20like%20to%20discuss%20hiring%20you%20as%20my%20personal%20guide%20for%20my%20stay!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[oklch(0.75_0.14_70)] text-[oklch(0.22_0.06_250)] px-6 py-3 rounded-full font-medium text-sm hover:brightness-110 transition-all duration-200 mt-2"
                >
                  Discuss Your Stay
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Tier 2: I Arrange */}
        <AnimatedSection>
          <div className="mb-10">
            <span className="gold-rule" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-[oklch(0.22_0.06_250)] mb-3">
              I also arrange
            </h2>
            <p className="font-body text-base text-[oklch(0.45_0.04_250)] max-w-xl">
              A few things I don't guide personally, but I arrange and stay involved throughout. You always have my number.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TIER2_SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: i * 0.06 }}
                className="bg-[oklch(0.98_0.01_80)] rounded-2xl p-6 border border-[oklch(0.88_0.02_80)] hover:border-[oklch(0.55_0.12_195)] hover:shadow-md transition-all duration-200"
              >
                <span className="text-3xl mb-3 block">{s.icon}</span>
                <h4 className="font-display text-xl font-semibold text-[oklch(0.22_0.06_250)] mb-2">{s.title}</h4>
                <p className="font-body text-sm text-[oklch(0.45_0.04_250)] leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[oklch(0.55_0.12_195)] text-white px-8 py-4 rounded-full font-medium hover:bg-[oklch(0.48_0.12_195)] transition-colors duration-200"
            >
              Ask Dante to arrange your trip
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Why Choose Dante ─────────────────────────────────────────────────────────
function WhyDante() {
  const reasons = [
    { icon: "🏝️", title: "Born local", body: "I grew up on this beach. I know every reef, every current, and every honest operator on the island." },
    { icon: "🔒", title: "No hidden costs", body: "The price I quote is the price you pay. I take my commission from operators, never by inflating your price." },
    { icon: "👥", title: "Private experiences", body: "No crowded group boats. You get my full attention and the flexibility to go where you actually want to go." },
    { icon: "📸", title: "Proof, not promises", body: "Every beach cleanup is logged on this site with dated photos. My guest reviews will live on Google, where nobody can edit them." },
    { icon: "♻️", title: "Environmental action", body: "Every booking funds my beach cleanups. You're not just visiting Zanzibar — you're helping protect it." },
    { icon: "📱", title: "Always available", body: "I handle everything personally on WhatsApp. Message me any time — before, during, or after your trip." },
  ];

  return (
    <section className="py-20 md:py-28 bg-[oklch(0.93_0.035_80)]">
      <div className="container">
        <AnimatedSection className="text-center mb-14">
          <span className="gold-rule mx-auto" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-[oklch(0.22_0.06_250)] mb-3">
            Why choose Dante?
          </h2>
          <p className="font-body text-base text-[oklch(0.45_0.04_250)] max-w-lg mx-auto">
            Almost every beach guide in Zanzibar sells the same trips. Here's what makes this different.
          </p>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.07 }}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-3xl mb-4 block">{r.icon}</span>
              <h4 className="font-display text-xl font-semibold text-[oklch(0.22_0.06_250)] mb-2">{r.title}</h4>
              <p className="font-body text-sm text-[oklch(0.45_0.04_250)] leading-relaxed">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section className="py-20 md:py-28 bg-[oklch(0.22_0.06_250)]">
      <div className="container">
        <AnimatedSection className="text-center mb-12">
          <span className="gold-rule mx-auto" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-3">
            Life on the water
          </h2>
          <p className="font-body text-base text-white/70 max-w-md mx-auto">
            Real moments from real trips. No stock photos, no staging.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMGS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.05 }}
              className={`overflow-hidden rounded-xl ${
                i === 0 ? "md:col-span-2 md:row-span-1" :
                i === 6 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={src}
                alt={`Zanzibar gallery image ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
// Set this to Dante's Google review link once his Google Business Profile is live
// (Business Profile > "Ask for reviews" gives a g.page/r/... link). Leave empty until then.
const GOOGLE_REVIEW_URL = "";
// Set this to his Google Maps listing URL so visitors can read existing reviews.
const GOOGLE_PROFILE_URL = "";

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

function Reviews() {
  const live = Boolean(GOOGLE_REVIEW_URL || GOOGLE_PROFILE_URL);
  return (
    <section id="reviews" className="py-20 md:py-28 bg-[oklch(0.98_0.01_80)]">
      <div className="container">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <span className="gold-rule mx-auto" />
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-[oklch(0.22_0.06_250)] mb-4">
            Guest reviews
          </h2>
          <div className="bg-white rounded-2xl border border-[oklch(0.88_0.02_80)] shadow-sm p-7 md:p-10 mt-8">
            <div className="inline-flex items-center gap-2 bg-[oklch(0.93_0.035_80)] text-[oklch(0.45_0.04_250)] font-body text-xs font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.12_195)]" />
              Brand new website
            </div>
            <p className="font-display text-2xl md:text-3xl text-[oklch(0.22_0.06_250)] leading-snug mb-4">
              No reviews here yet, and I won't make any up.
            </p>
            <p className="font-body text-base text-[oklch(0.4_0.04_250)] leading-relaxed mb-8 max-w-xl mx-auto">
              This site is new. My guest reviews will live on Google, where nobody can edit or pick them, and they will show up here as they come in. Until then, message me on WhatsApp and ask me anything. I'm happy to share photos and details of past trips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {GOOGLE_REVIEW_URL && (
                <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-[oklch(0.85_0.02_80)] text-[oklch(0.22_0.06_250)] font-body font-medium text-sm px-6 py-3 rounded-full hover:shadow-md transition-shadow">
                  <GoogleIcon /> Been on a trip? Review me on Google
                </a>
              )}
              {GOOGLE_PROFILE_URL && (
                <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-[oklch(0.85_0.02_80)] text-[oklch(0.22_0.06_250)] font-body font-medium text-sm px-6 py-3 rounded-full hover:shadow-md transition-shadow">
                  <GoogleIcon /> Read my reviews on Google
                </a>
              )}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[oklch(0.55_0.12_195)] text-white font-body font-medium text-sm px-6 py-3 rounded-full hover:shadow-lg transition-shadow">
                Ask me on WhatsApp
              </a>
            </div>
            {!live && (
              <p className="font-body text-xs text-[oklch(0.55_0.03_250)] mt-6 inline-flex items-center gap-2">
                <GoogleIcon /> Google reviews coming soon
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-[oklch(0.22_0.06_250)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[oklch(0.75_0.14_70)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[oklch(0.55_0.12_195)] blur-2xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <AnimatedSection>
            <span className="gold-rule mx-auto" />
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-4">
              Ready to explore?
            </h2>
            <p className="font-body text-base text-white/75 mb-8 leading-relaxed">
              I handle all bookings and questions personally on WhatsApp. Send me a message, tell me what you're looking for, and let's plan your Zanzibar adventure together.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[oklch(0.55_0.12_195)] text-white px-10 py-5 rounded-full font-medium text-lg hover:bg-[oklch(0.48_0.12_195)] hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl mb-10 wa-pulse"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Message Dante on WhatsApp
            </a>

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: "📍", label: "Location", value: "Pongwe, Zanzibar" },
                { icon: "⏰", label: "Response time", value: "Usually within 1 hour" },
                { icon: "🌍", label: "Languages", value: "English & Swahili" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-body text-xs text-white/60 mb-1">{item.label}</div>
                  <div className="font-body text-xs font-medium text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[oklch(0.16_0.05_250)] py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_MAIN} alt="Zanzibar by Dante" className="w-8 h-8 object-contain rounded-full bg-white/10 p-0.5" />
          <div>
            <span className="font-display text-sm font-semibold tracking-widest uppercase text-white/80">Zanzibar </span>
            <span className="font-script text-sm text-[oklch(0.75_0.14_70)]">by Dante</span>
          </div>
        </div>
        <p className="font-body text-xs text-white/40 text-center">
          Pongwe, Zanzibar, Tanzania · Every booking supports the Clean Beach Initiative
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-[oklch(0.55_0.12_195)] hover:text-[oklch(0.75_0.14_70)] transition-colors"
        >
          WhatsApp Dante →
        </a>
      </div>
    </footer>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <About />
      <Tours />
      <WhyDante />
      <CleanBeach />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
