import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ban, Copy, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface RequestAdRemovalProps {
  className?: string;
}

const UPI_ID = "skoparkar746-1@oksbi";

export function RequestAdRemoval({ className }: RequestAdRemovalProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Trigger button */}
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex-shrink-0 gap-1.5 font-ui text-xs font-semibold",
          "border border-border/40 bg-card/40 hover:bg-card/70",
          "text-muted-foreground hover:text-foreground",
          "transition-all duration-200",
          className,
        )}
        onClick={() => setOpen(true)}
        aria-label="Remove ads"
      >
        <Ban className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Remove Ads</span>
        <span className="sm:hidden">No Ads</span>
      </Button>

      {/* Payment Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="presentation"
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleClose();
            }}
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.20 0.04 265) 0%, oklch(0.15 0.02 240) 100%)",
                border: "1px solid oklch(0.35 0.06 265 / 0.6)",
              }}
            >
              {/* Subtle dot grid */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, oklch(0.93 0.015 265 / 0.05) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Top glow line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(0.65 0.15 265 / 0.6), transparent)",
                }}
              />

              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative z-10 px-7 pt-8 pb-7 flex flex-col items-center text-center gap-5">
                {/* Icon badge */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.18 265 / 0.25), oklch(0.45 0.12 280 / 0.15))",
                    border: "1px solid oklch(0.55 0.18 265 / 0.3)",
                  }}
                >
                  <Ban className="w-6 h-6 text-primary" />
                </div>

                {/* Title & description */}
                <div className="flex flex-col gap-1.5">
                  <h2
                    className="text-2xl font-display font-bold tracking-tight"
                    style={{ color: "oklch(0.96 0.01 265)" }}
                  >
                    Remove Ads
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.70 0.04 265)" }}
                  >
                    Pay once and enjoy an ad-free experience on World Calendars
                  </p>
                </div>

                {/* Price display */}
                <div
                  className="w-full rounded-xl px-5 py-4 flex flex-col items-center gap-0.5"
                  style={{
                    background: "oklch(0.26 0.04 265 / 0.6)",
                    border: "1px solid oklch(0.38 0.06 265 / 0.4)",
                  }}
                >
                  <span
                    className="text-xs font-ui font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "oklch(0.60 0.08 265)" }}
                  >
                    One-Time Payment
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span
                      className="text-4xl font-display font-bold leading-none"
                      style={{ color: "oklch(0.97 0.01 265)" }}
                    >
                      ₹500
                    </span>
                  </div>
                  <span
                    className="text-xs mt-1"
                    style={{ color: "oklch(0.58 0.05 265)" }}
                  >
                    Lifetime ad removal
                  </span>
                </div>

                {/* QR Code */}
                <div
                  className="w-full rounded-xl p-4 flex flex-col items-center gap-3"
                  style={{
                    background: "oklch(0.26 0.04 265 / 0.6)",
                    border: "1px solid oklch(0.38 0.06 265 / 0.4)",
                  }}
                >
                  <span
                    className="text-xs font-ui font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "oklch(0.60 0.08 265)" }}
                  >
                    Scan to Pay via Google Pay
                  </span>
                  <div className="rounded-xl overflow-hidden bg-white p-2 shadow-lg">
                    <img
                      src="/assets/generated/gpay-qr-code-transparent.dim_300x300.png"
                      alt="Google Pay QR Code"
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                </div>

                {/* UPI ID copy */}
                <div className="w-full flex flex-col gap-2">
                  <span
                    className="text-xs font-ui font-semibold uppercase tracking-[0.12em] text-center"
                    style={{ color: "oklch(0.60 0.08 265)" }}
                  >
                    Or pay using UPI ID
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyUPI}
                    className="w-full rounded-xl py-3 px-4 flex items-center justify-between gap-3 font-mono text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{
                      background: copied
                        ? "linear-gradient(135deg, #1a6e1a 0%, #0d4a0d 100%)"
                        : "linear-gradient(135deg, #1a6e3a 0%, #0d4a2a 100%)",
                      color: "#FFFFFF",
                      boxShadow: "0 4px 24px rgba(26, 110, 58, 0.35)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <span className="truncate">{UPI_ID}</span>
                    <Copy className="w-4 h-4 flex-shrink-0 opacity-80" />
                  </button>
                  {copied && (
                    <span className="text-xs text-center text-green-400">
                      UPI ID copied!
                    </span>
                  )}
                </div>

                {/* Trust badge */}
                <div
                  className="flex items-center gap-2 text-[11px] rounded-lg px-3 py-2"
                  style={{
                    background: "oklch(0.28 0.03 265 / 0.5)",
                    color: "oklch(0.62 0.05 265)",
                    border: "1px solid oklch(0.35 0.04 265 / 0.3)",
                  }}
                >
                  <Shield className="w-3.5 h-3.5 flex-shrink-0 text-green-400" />
                  <span>
                    Scan the QR code or copy the UPI ID to pay via Google Pay,
                    PhonePe, or any UPI app.
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
