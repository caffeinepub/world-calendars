import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function AdSidebar({ className }: { className?: string }) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      // @ts-ignore
      const adsByGoogle = window.adsbygoogle || [];
      // @ts-ignore
      window.adsbygoogle = adsByGoogle;
      // @ts-ignore
      window.adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      className={cn("mx-3 mb-3", className)}
      role="complementary"
      aria-label="Advertisement"
      ref={adRef}
    >
      {/* Advertisement label */}
      <div className="px-1 pb-1">
        <span className="text-[9px] font-semibold tracking-widest uppercase text-muted-foreground/40">
          Advertisement
        </span>
      </div>
      {/* swaraj */}
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: "728px",
          height: "90px",
          maxWidth: "100%",
        }}
        data-ad-client="ca-pub-1738717539808673"
        data-ad-slot="9017634958"
      />
    </div>
  );
}
