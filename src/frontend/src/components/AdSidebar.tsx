import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen } from "lucide-react";

export function AdSidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-3 mb-3 rounded-xl overflow-hidden border border-border/50",
        "relative",
        className,
      )}
      style={{
        background:
          "linear-gradient(160deg, oklch(0.22 0.07 290), oklch(0.18 0.04 240))",
      }}
      role="complementary"
      aria-label="Advertisement"
    >
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(0.93 0.015 265) 1px, transparent 0)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Advertisement label */}
      <div className="relative z-10 px-3 pt-2.5 pb-0">
        <span className="text-[9px] font-ui font-semibold tracking-widest uppercase text-muted-foreground/40 border border-border/30 rounded px-1.5 py-0.5 bg-background/10">
          Advertisement
        </span>
      </div>

      {/* Graphic area */}
      <div
        className="relative mx-3 mt-2.5 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          height: "100px",
          background:
            "linear-gradient(135deg, oklch(0.3 0.12 290 / 0.6), oklch(0.25 0.08 240 / 0.4))",
          border: "1px solid oklch(0.93 0.015 265 / 0.08)",
        }}
      >
        {/* Decorative rings */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-20"
          aria-hidden="true"
        >
          {[80, 60, 40].map((size) => (
            <div
              key={size}
              className="absolute rounded-full border border-chart-5/40"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* Central icon */}
        <div
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "oklch(0.65 0.15 290 / 0.25)",
            border: "1px solid oklch(0.65 0.15 290 / 0.4)",
            boxShadow: "0 0 24px oklch(0.65 0.15 290 / 0.3)",
          }}
        >
          <BookOpen className="w-6 h-6 text-chart-5" />
        </div>

        {/* Subtle shimmer overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, oklch(0.93 0.015 265 / 0.3) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-3 pt-2.5 pb-3">
        <div className="text-[9px] font-ui font-bold tracking-[0.15em] uppercase text-chart-5 mb-1">
          SPONSORED
        </div>
        <p className="text-xs font-ui font-semibold text-foreground leading-snug mb-1.5">
          The Global Almanac — 2026 Edition
        </p>
        <p className="text-[10px] text-muted-foreground/60 leading-relaxed mb-3">
          Cultural calendars, festivals, and world events in one beautiful
          reference book.
        </p>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "w-full h-7 text-[10px] font-ui font-semibold gap-1.5",
            "border-chart-5/30 bg-chart-5/10 hover:bg-chart-5/20",
            "text-chart-5 transition-all duration-200",
          )}
          onClick={() => {
            window.open(
              "https://www.instagram.com/swaraj_koparkar?igsh=MWRqNHJkOW95Mmx3eg==",
              "_blank",
              "noopener,noreferrer",
            );
          }}
        >
          Learn More
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      {/* Glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.65 0.15 290), transparent)",
        }}
      />
    </div>
  );
}
