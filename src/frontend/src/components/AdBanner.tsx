import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

interface AdBannerProps {
  variant: "top" | "bottom";
  className?: string;
}

const TOP_AD = {
  label: "Advertisement",
  eyebrow: "SPONSORED",
  headline: "Track Every Time Zone — Beautifully",
  description:
    "Meet Timewise Pro: the world's most elegant timezone dashboard for global teams.",
  cta: "Try Free for 14 Days",
  icon: Zap,
  gradientFrom: "oklch(0.25 0.08 265)",
  gradientTo: "oklch(0.2 0.06 200)",
  accentColor: "oklch(0.78 0.135 75)",
  accentClass: "text-primary",
  bgClass: "from-[oklch(0.25_0.08_265)] to-[oklch(0.2_0.06_200)]",
  iconBg: "bg-primary/20",
  iconColor: "text-primary",
};

const BOTTOM_AD = {
  label: "Advertisement",
  eyebrow: "FEATURED",
  headline: "Explore 50+ World Heritage Festival Tours",
  description:
    "Immerse yourself in authentic cultural celebrations. Book curated tours to the world's most iconic festivals.",
  cta: "Discover Tours",
  icon: Sparkles,
  gradientFrom: "oklch(0.22 0.06 30)",
  gradientTo: "oklch(0.2 0.04 265)",
  accentColor: "oklch(0.72 0.18 30)",
  accentClass: "text-chart-4",
  bgClass: "from-[oklch(0.22_0.06_30)] to-[oklch(0.2_0.04_265)]",
  iconBg: "bg-chart-4/20",
  iconColor: "text-chart-4",
};

export function AdBanner({ variant, className }: AdBannerProps) {
  const ad = variant === "top" ? TOP_AD : BOTTOM_AD;
  const Icon = ad.icon;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-b border-border/60",
        "bg-gradient-to-r",
        variant === "top" ? "border-t-0" : "border-t border-border/60",
        className,
      )}
      style={{
        background: `linear-gradient(135deg, ${ad.gradientFrom}, ${ad.gradientTo})`,
        minHeight: variant === "top" ? "88px" : "100px",
      }}
      role="complementary"
      aria-label={ad.label}
    >
      {/* Subtle decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(0.93 0.015 265) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ad label badge */}
      <span className="absolute top-2 right-3 text-[9px] font-ui font-semibold tracking-widest uppercase text-muted-foreground/50 border border-border/40 rounded px-1.5 py-0.5 bg-background/20 backdrop-blur-sm z-10">
        {ad.label}
      </span>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-4 px-5 h-full py-3">
        {/* Icon area */}
        <div
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
            ad.iconBg,
            "border border-white/10",
          )}
        >
          <Icon className={cn("w-5 h-5", ad.iconColor)} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "text-[10px] font-ui font-bold tracking-[0.15em] uppercase mb-0.5",
              ad.accentClass,
            )}
          >
            {ad.eyebrow}
          </div>
          <p className="text-sm font-ui font-semibold text-foreground leading-tight line-clamp-1">
            {ad.headline}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-0.5 leading-snug line-clamp-1 hidden sm:block">
            {ad.description}
          </p>
        </div>

        {/* CTA */}
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "flex-shrink-0 gap-1.5 text-xs font-ui font-semibold h-8 px-3",
            "border-border/60 bg-background/20 hover:bg-background/40 backdrop-blur-sm",
            "transition-all duration-200",
            ad.accentClass,
          )}
          onClick={() => {
            /* No-op placeholder */
          }}
          asChild={false}
        >
          <span className="flex items-center gap-1.5">
            {ad.cta}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Button>
      </div>

      {/* Accent glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, ${ad.accentColor}, transparent)`,
        }}
      />
    </div>
  );
}
