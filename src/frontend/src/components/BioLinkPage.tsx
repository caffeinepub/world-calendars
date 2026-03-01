import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Globe2,
  Instagram,
  X,
  Youtube,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface BioLinkPageProps {
  open: boolean;
  onClose: () => void;
}

interface LinkCard {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  href: string | null;
  comingSoon?: boolean;
  accentColor: string;
}

const links: LinkCard[] = [
  {
    id: "instagram",
    icon: <Instagram className="w-5 h-5" />,
    label: "Instagram",
    title: "Follow on Instagram",
    description: "@swaraj_koparkar",
    href: "https://www.instagram.com/swaraj_koparkar?igsh=MWRqNHJkOW95Mmx3eg==",
    accentColor: "oklch(0.72 0.18 340)",
  },
  {
    id: "world-calendars",
    icon: <Globe2 className="w-5 h-5" />,
    label: "World Calendars",
    title: "Explore World Calendars",
    description: "12 calendar systems from around the world",
    href: typeof window !== "undefined" ? window.location.href : "/",
    accentColor: "oklch(0.78 0.135 75)",
  },
  {
    id: "youtube",
    icon: <Youtube className="w-5 h-5" />,
    label: "YouTube",
    title: "YouTube Channel",
    description: "Videos coming soon",
    href: null,
    comingSoon: true,
    accentColor: "oklch(0.65 0.18 25)",
  },
  {
    id: "blog",
    icon: <BookOpen className="w-5 h-5" />,
    label: "Blog",
    title: "Blog",
    description: "Articles & insights coming soon",
    href: null,
    comingSoon: true,
    accentColor: "oklch(0.68 0.15 290)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 30 },
  },
};

export function BioLinkPage({ open, onClose }: BioLinkPageProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bio-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="bio-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <dialog
              aria-label="Bio links"
              className={cn(
                "relative w-full max-w-md rounded-3xl overflow-hidden pointer-events-auto",
                "shadow-2xl open:flex open:flex-col",
              )}
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.16 0.04 265) 0%, oklch(0.11 0.03 265) 100%)",
                border: "1px solid oklch(0.3 0.05 265 / 0.6)",
                boxShadow:
                  "0 32px 80px oklch(0.05 0.02 265 / 0.8), 0 0 0 1px oklch(0.35 0.07 265 / 0.2) inset",
              }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              open
            >
              {/* Atmospheric glow blobs */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.72 0.18 340) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.78 0.135 75) 0%, transparent 70%)",
                  filter: "blur(32px)",
                }}
              />

              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                  backgroundSize: "128px 128px",
                }}
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "absolute top-4 right-4 z-10",
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  "transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                )}
                style={{
                  background: "oklch(0.25 0.04 265 / 0.8)",
                  border: "1px solid oklch(0.35 0.05 265 / 0.5)",
                  color: "oklch(0.7 0.03 265)",
                }}
                aria-label="Close bio link page"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative z-10 px-6 pt-8 pb-6">
                {/* Profile */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="flex flex-col items-center text-center mb-8"
                >
                  {/* Avatar */}
                  <div
                    className="relative w-20 h-20 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 340 / 0.3), oklch(0.78 0.135 75 / 0.3))",
                      border: "2px solid oklch(0.72 0.18 340 / 0.5)",
                      boxShadow: "0 0 32px oklch(0.72 0.18 340 / 0.25)",
                    }}
                  >
                    <span
                      className="font-display text-2xl font-bold"
                      style={{ color: "oklch(0.93 0.015 265)" }}
                    >
                      SK
                    </span>

                    {/* Rotating ring */}
                    <div
                      className="absolute inset-[-4px] rounded-full opacity-40"
                      style={{
                        background:
                          "conic-gradient(from 0deg, oklch(0.72 0.18 340), oklch(0.78 0.135 75), oklch(0.68 0.15 290), oklch(0.72 0.18 340))",
                        mask: "radial-gradient(circle, transparent 42px, black 44px, black 100%)",
                        WebkitMask:
                          "radial-gradient(circle, transparent 42px, black 44px, black 100%)",
                      }}
                    />
                  </div>

                  <h2
                    className="font-display text-2xl font-bold mb-0.5"
                    style={{ color: "oklch(0.95 0.015 265)" }}
                  >
                    Swaraj Koparkar
                  </h2>
                  <p
                    className="font-ui text-sm font-medium mb-2"
                    style={{ color: "oklch(0.72 0.18 340)" }}
                  >
                    @swaraj_koparkar
                  </p>
                  <p
                    className="font-ui text-xs leading-relaxed max-w-[260px]"
                    style={{ color: "oklch(0.62 0.03 265)" }}
                  >
                    World Calendars Explorer &amp; Creator
                  </p>
                </motion.div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-6 opacity-30"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.5 0.05 265), transparent)",
                  }}
                />

                {/* Links */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-3"
                >
                  {links.map((link) => (
                    <motion.div key={link.id} variants={cardVariants}>
                      {link.href ? (
                        <a
                          href={link.href}
                          target={
                            link.id !== "world-calendars" ? "_blank" : undefined
                          }
                          rel={
                            link.id !== "world-calendars"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className={cn(
                            "group flex items-center gap-4 rounded-2xl px-4 py-3.5",
                            "transition-all duration-200",
                            "hover:scale-[1.02] active:scale-[0.99]",
                          )}
                          style={{
                            background: "oklch(0.2 0.035 265 / 0.6)",
                            border: `1px solid ${link.accentColor.replace(")", " / 0.25)")}`,
                            backdropFilter: "blur(8px)",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              "oklch(0.22 0.04 265 / 0.8)";
                            (e.currentTarget as HTMLElement).style.borderColor =
                              link.accentColor.replace(")", " / 0.45)");
                            (e.currentTarget as HTMLElement).style.boxShadow =
                              `0 4px 24px ${link.accentColor.replace(")", " / 0.15)")}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                              "oklch(0.2 0.035 265 / 0.6)";
                            (e.currentTarget as HTMLElement).style.borderColor =
                              link.accentColor.replace(")", " / 0.25)");
                            (e.currentTarget as HTMLElement).style.boxShadow =
                              "none";
                          }}
                        >
                          {/* Icon */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${link.accentColor.replace(")", " / 0.15)")}`,
                              color: link.accentColor,
                              border: `1px solid ${link.accentColor.replace(")", " / 0.3)")}`,
                            }}
                          >
                            {link.icon}
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-ui text-sm font-semibold leading-tight truncate"
                              style={{ color: "oklch(0.93 0.015 265)" }}
                            >
                              {link.title}
                            </p>
                            <p
                              className="font-ui text-xs mt-0.5 truncate"
                              style={{ color: "oklch(0.55 0.03 265)" }}
                            >
                              {link.description}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                            style={{ color: "oklch(0.5 0.03 265)" }}
                          />
                        </a>
                      ) : (
                        <div
                          className="flex items-center gap-4 rounded-2xl px-4 py-3.5 cursor-not-allowed"
                          style={{
                            background: "oklch(0.16 0.025 265 / 0.5)",
                            border: "1px solid oklch(0.25 0.03 265 / 0.4)",
                          }}
                        >
                          {/* Icon */}
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: "oklch(0.2 0.03 265 / 0.4)",
                              color: "oklch(0.45 0.03 265)",
                              border: "1px solid oklch(0.3 0.04 265 / 0.3)",
                            }}
                          >
                            {link.icon}
                          </div>

                          {/* Text */}
                          <div className="flex-1 min-w-0">
                            <p
                              className="font-ui text-sm font-semibold leading-tight truncate"
                              style={{ color: "oklch(0.5 0.02 265)" }}
                            >
                              {link.title}
                            </p>
                            <p
                              className="font-ui text-xs mt-0.5 truncate"
                              style={{ color: "oklch(0.4 0.02 265)" }}
                            >
                              {link.description}
                            </p>
                          </div>

                          {/* Coming soon badge */}
                          <span
                            className="font-ui text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full flex-shrink-0"
                            style={{
                              background: "oklch(0.22 0.03 265 / 0.6)",
                              color: "oklch(0.45 0.03 265)",
                              border: "1px solid oklch(0.3 0.04 265 / 0.4)",
                            }}
                          >
                            Soon
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="mt-6 flex items-center justify-center gap-1.5"
                >
                  <ChevronRight
                    className="w-3 h-3"
                    style={{ color: "oklch(0.4 0.03 265)" }}
                  />
                  <p
                    className="font-ui text-[10px]"
                    style={{ color: "oklch(0.4 0.03 265)" }}
                  >
                    <a
                      href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-muted-foreground transition-colors"
                      style={{ color: "oklch(0.4 0.03 265)" }}
                    >
                      Built with caffeine.ai
                    </a>
                  </p>
                </motion.div>
              </div>
            </dialog>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
