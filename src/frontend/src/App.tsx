import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe2, Link2, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { CalendarEntry } from "./backend.d.ts";
import { AdBanner } from "./components/AdBanner";
import { AdSidebar } from "./components/AdSidebar";
import { BioLinkPage } from "./components/BioLinkPage";
import { CalendarSidebar } from "./components/CalendarSidebar";
import { CalendarView } from "./components/CalendarView";
import { LoadingScreen } from "./components/LoadingScreen";
import { RequestAdRemoval } from "./components/RequestAdRemoval";
import { useGetAllCalendarEntries } from "./hooks/useQueries";

// Fallback static entries in case backend is loading
const STATIC_ENTRIES: CalendarEntry[] = [
  {
    id: "gregorian",
    displayName: "Gregorian",
    nativeName: "Gregorian",
    locale: "en",
    description:
      "The most widely used civil calendar in the world, introduced by Pope Gregory XIII in 1582.",
  },
  {
    id: "islamic",
    displayName: "Islamic (Hijri)",
    nativeName: "التقويم الهجري",
    locale: "ar",
    description:
      "A lunar calendar used to determine Islamic holy days and practices, beginning from the Hijra in 622 CE.",
  },
  {
    id: "hebrew",
    displayName: "Hebrew",
    nativeName: "לוח העברי",
    locale: "he",
    description:
      "A lunisolar calendar used by the Jewish people, incorporating both lunar months and solar years.",
  },
  {
    id: "chinese",
    displayName: "Chinese Lunar",
    nativeName: "农历",
    locale: "zh",
    description:
      "Traditional lunisolar calendar of China, used for centuries to govern festivals, agriculture, and astrology.",
  },
  {
    id: "persian",
    displayName: "Persian (Jalali)",
    nativeName: "تقویم جلالی",
    locale: "fa",
    description:
      "An accurate solar calendar used in Iran and Afghanistan, reformed in 1079 CE by Omar Khayyam.",
  },
  {
    id: "ethiopian",
    displayName: "Ethiopian",
    nativeName: "የኢትዮጵያ ቀን መቁጠሪያ",
    locale: "am",
    description:
      "The principal calendar in Ethiopia and Eritrea, similar to the Coptic calendar with 13 months.",
  },
  {
    id: "coptic",
    displayName: "Coptic",
    nativeName: "Ⲡⲓⲉϩⲟⲟⲩ",
    locale: "ar-EG",
    description:
      "Ancient Egyptian calendar used by the Coptic Orthodox Church, derived from the old Egyptian calendar.",
  },
  {
    id: "hindu",
    displayName: "Hindu (Vikram Samvat)",
    nativeName: "विक्रम संवत",
    locale: "hi",
    description:
      "Historic Hindu calendar beginning 57 BCE, widely used across the Indian subcontinent.",
  },
  {
    id: "buddhist",
    displayName: "Buddhist",
    nativeName: "ปฏิทินพุทธ",
    locale: "th",
    description:
      "Solar calendar based on the Buddhist Era, officially used in Thailand, counting from the Parinirvana of the Buddha.",
  },
  {
    id: "japanese",
    displayName: "Japanese",
    nativeName: "和暦",
    locale: "ja",
    description:
      "The traditional Japanese calendar using imperial era names (nengo), alongside the Gregorian calendar.",
  },
  {
    id: "korean",
    displayName: "Korean",
    nativeName: "한국 달력",
    locale: "ko",
    description:
      "Traditional Korean lunisolar calendar, used historically and for traditional festivals like Seollal and Chuseok.",
  },
  {
    id: "tibetan",
    displayName: "Tibetan",
    nativeName: "བོད་ཀྱི་ལོ་ཐོ།",
    locale: "bo",
    description:
      "Traditional Tibetan lunisolar calendar blending Indian Buddhist and Chinese influences, used for religious dates.",
  },
];

export default function App() {
  const { data: backendEntries, isLoading } = useGetAllCalendarEntries();
  const [selectedId, setSelectedId] = useState("gregorian");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bioLinkOpen, setBioLinkOpen] = useState(false);

  // Inject Adsterra ad script into footer
  useEffect(() => {
    const slot = document.getElementById("adsterra-footer-slot");
    if (slot && !slot.querySelector("script[data-adsterra]")) {
      const script = document.createElement("script");
      script.src =
        "https://pl28814381.effectivegatecpm.com/aa/41/b8/aa41b81759b5eb1244882078ccae7f8a.js";
      script.setAttribute("data-adsterra", "true");
      slot.appendChild(script);
    }
  }, []);

  // Inject Adsterra effectivegatecpm ad unit (async) - header slot
  useEffect(() => {
    const slot = document.getElementById("adsterra-ecpm-header-slot");
    if (slot && !slot.querySelector("script[data-adsterra-ecpm]")) {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src =
        "https://pl28814524.effectivegatecpm.com/73d0547c819b58702bf24da07eea6927/invoke.js";
      script.setAttribute("data-adsterra-ecpm", "true");
      slot.appendChild(script);
    }
  }, []);

  // Inject HighPerformanceFormat (HPF) ad script into banner slot
  useEffect(() => {
    const slot = document.getElementById("hpf-banner-slot");
    if (slot && !slot.querySelector("script[data-hpf]")) {
      // Set atOptions config
      const configScript = document.createElement("script");
      configScript.text = `
        var atOptions = {
          'key': '1bf46126ba1e152835245964a0e08fa0',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
      `;
      slot.appendChild(configScript);
      // Load the ad invoke script
      const invokeScript = document.createElement("script");
      invokeScript.src =
        "https://www.highperformanceformat.com/1bf46126ba1e152835245964a0e08fa0/invoke.js";
      invokeScript.setAttribute("data-hpf", "true");
      slot.appendChild(invokeScript);
    }
  }, []);

  // Use backend entries when available, fall back to static
  const entries =
    backendEntries && backendEntries.length > 0
      ? backendEntries
      : STATIC_ENTRIES;
  const selectedEntry = entries.find((e) => e.id === selectedId) ?? entries[0];

  // Close sidebar when screen becomes large
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-30">
        <div className="flex items-center gap-3 px-4 h-14">
          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden flex-shrink-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle calendar list"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <Globe2 className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-lg font-bold text-foreground leading-tight truncate">
                World Calendars
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {entries.length} calendar systems from around the world
              </p>
            </div>
          </div>

          {/* Selected calendar badge on mobile */}
          <div className="lg:hidden text-sm text-muted-foreground truncate max-w-[140px]">
            {selectedEntry?.displayName}
          </div>

          {/* Request Ad Removal button */}
          <RequestAdRemoval />

          {/* My Links button */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-shrink-0 gap-1.5 font-ui text-xs font-semibold",
              "border border-border/40 bg-card/40 hover:bg-card/70",
              "text-muted-foreground hover:text-foreground",
              "transition-all duration-200 hidden sm:flex",
            )}
            onClick={() => setBioLinkOpen(true)}
            aria-label="Open bio links"
          >
            <Link2 className="w-3.5 h-3.5" />
            My Links
          </Button>
          {/* Mobile icon-only version */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 sm:hidden border border-border/40 bg-card/40 hover:bg-card/70"
            onClick={() => setBioLinkOpen(true)}
            aria-label="Open bio links"
          >
            <Link2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Adsterra Header Ad */}
      <div
        id="adsterra-ecpm-header-slot"
        className="flex justify-center bg-card/20 py-1"
      />

      {/* HighPerformanceFormat Banner */}
      <div
        id="hpf-banner-slot"
        className="flex justify-center bg-card/20 py-1"
      />

      {/* Top Ad Banner */}
      <AdBanner variant="top" />

      {/* Body */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 border-r border-border bg-card/40 backdrop-blur-sm">
          <CalendarSidebar
            entries={entries}
            selectedId={selectedId}
            onSelect={setSelectedId}
            isLoading={isLoading}
          />
          <AdSidebar />
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 35 }}
                className="fixed left-0 top-14 bottom-0 z-50 w-72 bg-card border-r border-border lg:hidden"
              >
                <CalendarSidebar
                  entries={entries}
                  selectedId={selectedId}
                  onSelect={(id) => {
                    setSelectedId(id);
                    setSidebarOpen(false);
                  }}
                  isLoading={isLoading}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedEntry ? (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <CalendarView entry={selectedEntry} />
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  Select a calendar to view
                </p>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner variant="bottom" />

      {/* Footer */}
      <footer className="flex-shrink-0 border-t border-border bg-card/30 px-6 py-3">
        <div id="adsterra-footer-slot" />
        <div id="container-73d0547c819b58702bf24da07eea6927" />

        <div className="flex items-center justify-between text-xs text-muted-foreground/50">
          <span>Displaying {entries.length} world calendar traditions</span>
          <span>
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </span>
        </div>
      </footer>

      {/* Bio Link Page */}
      <BioLinkPage open={bioLinkOpen} onClose={() => setBioLinkOpen(false)} />
    </div>
  );
}
