import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { CalendarEntry } from "../backend.d.ts";
import { CALENDAR_CONFIG } from "../utils/calendarUtils";

interface CalendarSidebarProps {
  entries: CalendarEntry[];
  selectedId: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

export function CalendarSidebar({
  entries,
  selectedId,
  onSelect,
  isLoading,
}: CalendarSidebarProps) {
  return (
    <aside className="h-full flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Calendar Systems
        </h2>
        <p className="text-xs text-muted-foreground/60 mt-0.5">
          {isLoading ? "Loading..." : `${entries.length} traditions`}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders have no stable id
                <div key={i} className="px-3 py-2.5">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))
            : entries.map((entry, index) => {
                const config = CALENDAR_CONFIG[entry.id];
                const isSelected = entry.id === selectedId;

                return (
                  <motion.button
                    key={entry.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.3 }}
                    onClick={() => onSelect(entry.id)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150",
                      "group flex items-start gap-3 hover:bg-accent",
                      isSelected
                        ? "bg-primary/15 border border-primary/30 shadow-[0_0_12px_oklch(0.78_0.135_75_/_0.15)]"
                        : "border border-transparent",
                    )}
                  >
                    <span className="text-lg leading-tight flex-shrink-0 mt-0.5">
                      {config?.emoji ?? "📅"}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={cn(
                          "text-sm font-medium font-ui leading-tight truncate",
                          isSelected ? "text-primary" : "text-foreground",
                        )}
                      >
                        {entry.displayName}
                      </div>
                      <div
                        className={cn(
                          "text-xs mt-0.5 leading-tight",
                          entry.id === "islamic" ||
                            entry.id === "hebrew" ||
                            entry.id === "persian"
                            ? "rtl-text"
                            : "",
                          isSelected
                            ? "text-primary/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {entry.nativeName}
                      </div>
                      {config?.region && (
                        <div className="text-xs text-muted-foreground/50 mt-0.5">
                          {config.region}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
        </div>
      </ScrollArea>

      <div className="px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground/40 text-center">
          Powered by Intl API
        </p>
      </div>
    </aside>
  );
}
