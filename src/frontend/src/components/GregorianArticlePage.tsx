import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Globe,
  Info,
  Scroll,
  Search,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface GregorianArticlePageProps {
  open: boolean;
  onClose: () => void;
}

const ADOPTION_TIMELINE = [
  {
    year: "1582",
    countries: "Catholic nations: Spain, Portugal, Poland, Italy, France (Dec)",
    detail:
      "Pope Gregory XIII issued the papal bull 'Inter gravissimas' on February 24. Catholic countries under papal authority adopted it swiftly — October 4 was immediately followed by October 15.",
    icon: "⛪",
  },
  {
    year: "1700",
    countries: "Protestant German states, Denmark, Norway",
    detail:
      "More than a century after Catholic adoption, Protestant Northern Europe finally accepted the calendar — primarily for commercial and diplomatic reasons rather than religious ones.",
    icon: "🏰",
  },
  {
    year: "1752",
    countries: "Britain, Ireland & British colonies (including America)",
    detail:
      "Britain dropped 11 days: September 2 was followed by September 14. Riots reportedly broke out with crowds demanding 'Give us our eleven days!' The Julian New Year (March 25) was also replaced by January 1.",
    icon: "🦁",
  },
  {
    year: "1873",
    countries: "Japan",
    detail:
      "Japan adopted the Gregorian calendar during the Meiji Restoration as part of a sweeping modernization effort, aligning with Western nations for international trade.",
    icon: "⛩️",
  },
  {
    year: "1912",
    countries: "China (Republic of China)",
    detail:
      "The newly established Republic of China officially adopted the Gregorian calendar after the 1911 revolution, though the traditional Chinese lunar calendar continued to be used culturally.",
    icon: "🐉",
  },
  {
    year: "1918",
    countries: "Russia (Soviet Union)",
    detail:
      "After the Bolshevik Revolution, the Soviet government decreed a switch from the Julian calendar. Russia had been 13 days behind — January 31 (Julian) became February 14 (Gregorian).",
    icon: "⭐",
  },
  {
    year: "1923",
    countries: "Greece",
    detail:
      "Greece was one of the last European countries to adopt the calendar, following Turkey's modernization. The Greek Orthodox Church still uses the Julian calendar for religious observances.",
    icon: "🏛️",
  },
  {
    year: "1949",
    countries: "People's Republic of China",
    detail:
      "The newly proclaimed People's Republic of China formally confirmed the Gregorian calendar as the official civil calendar, while traditional festivals continued to follow the lunar calendar.",
    icon: "🌟",
  },
];

const INTERESTING_FACTS = [
  {
    icon: "⏱️",
    title: "Still Drifting — Very Slowly",
    body: "The Gregorian calendar year (365.2425 days) is still about 26 seconds longer than the actual solar year (365.24219 days). This means it will gain one full day every ~3,236 years — a virtually negligible error.",
  },
  {
    icon: "🏷️",
    title: "Named After Gregory, Designed by Lilius",
    body: "Pope Gregory XIII got naming rights, but the calendar was primarily designed by Aloysius Lilius (Luigi Lilio), an Italian physician and astronomer. Christopher Clavius, a Jesuit mathematician, also made significant contributions.",
  },
  {
    icon: "📅",
    title: "The Year 3200 Leap Year Proposal",
    body: "Some astronomers have proposed that the year 3200 should NOT be a leap year (even though it is divisible by 400), which would fine-tune the drift. This change has not been officially adopted.",
  },
  {
    icon: "🔢",
    title: "The Leap Year Formula",
    body: "A year is a leap year if: (1) divisible by 4 AND (2) NOT divisible by 100, UNLESS (3) also divisible by 400. So 2000 was a leap year, but 1900 was not. The next century year that won't be a leap year: 2100.",
  },
  {
    icon: "🌍",
    title: "Not Truly Universal",
    body: "While the Gregorian calendar is the global civil standard, billions still use other calendars for religious or cultural life: the Islamic calendar for Ramadan, the Hebrew calendar for Jewish holidays, the Chinese lunisolar calendar for New Year.",
  },
  {
    icon: "📐",
    title: "The 10-Day Gap",
    body: "When Catholic countries switched in 1582, they dropped 10 days to re-align the spring equinox with March 21. By the time Britain switched in 1752, the gap had grown to 11 days; by the time Russia switched in 1918, it was 13 days.",
  },
];

interface SectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function Section({ icon, title, children }: SectionProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "rgb(212 160 23 / 0.15)",
            border: "1px solid rgb(212 160 23 / 0.25)",
          }}
        >
          {icon}
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground leading-tight">
          {title}
        </h2>
      </div>
      <div className="pl-0 md:pl-12">{children}</div>
    </section>
  );
}

const LEAP_YEAR_EXAMPLES = [
  {
    year: 1900,
    julian: true,
    gregorian: false,
    note: "Century year — not divisible by 400",
  },
  {
    year: 2000,
    julian: true,
    gregorian: true,
    note: "Divisible by 400 — leap year in both",
  },
  {
    year: 2024,
    julian: true,
    gregorian: true,
    note: "Divisible by 4, not a century year",
  },
  {
    year: 2100,
    julian: true,
    gregorian: false,
    note: "Century year — not divisible by 400",
  },
];

function isJulianLeap(year: number): boolean {
  return year % 4 === 0;
}

function isGregorianLeap(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function LeapYearSection() {
  const [inputYear, setInputYear] = useState("");
  const parsedYear = Number.parseInt(inputYear, 10);
  const validYear =
    !Number.isNaN(parsedYear) && parsedYear > 0 && parsedYear < 10000;
  const julianResult = validYear ? isJulianLeap(parsedYear) : null;
  const gregorianResult = validYear ? isGregorianLeap(parsedYear) : null;
  const resultsDiffer = validYear && julianResult !== gregorianResult;

  return (
    <Section
      id="leap-year"
      icon={<Calendar className="w-4 h-4" style={{ color: "#D4A017" }} />}
      title="Leap Year Explained"
    >
      {/* Why leap years exist */}
      <div className="space-y-3 mb-6">
        <div
          className="p-4 rounded-lg"
          style={{
            background: "rgb(212 160 23 / 0.06)",
            border: "1px solid rgb(212 160 23 / 0.15)",
            borderLeft: "3px solid #D4A017",
          }}
        >
          <h3 className="font-ui font-semibold text-sm text-foreground mb-1">
            Why do leap years exist?
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            The solar year is approximately{" "}
            <strong className="text-foreground">365.2422 days</strong> long.
            Because a calendar year must be a whole number of days, we
            accumulate ~0.2422 extra days per year. Without correction, the
            seasons would drift by one full day every ~4 years — after a few
            centuries, summer would arrive in what the calendar calls winter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Julian rule */}
          <div
            className="p-4 rounded-lg"
            style={{
              background: "rgb(100 100 120 / 0.08)",
              border: "1px solid rgb(100 100 120 / 0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚔️</span>
              <h3 className="font-ui font-semibold text-sm text-foreground">
                Julian Rule
              </h3>
              <Badge
                variant="secondary"
                className="text-[10px] font-mono ml-auto"
              >
                Simple
              </Badge>
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Add a leap day every{" "}
              <strong className="text-foreground">4 years</strong> — any year
              divisible by 4 gets February 29.
            </p>
            <div className="mt-2 font-mono text-xs text-muted-foreground bg-border/20 px-2 py-1 rounded">
              year % 4 === 0 → LEAP
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Average: 365.25 days/year. Still ~11 min too long → drifts 1 day
              per 128 years.
            </p>
          </div>

          {/* Gregorian rule */}
          <div
            className="p-4 rounded-lg"
            style={{
              background: "rgb(212 160 23 / 0.06)",
              border: "1px solid rgb(212 160 23 / 0.2)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📅</span>
              <h3 className="font-ui font-semibold text-sm text-foreground">
                Gregorian Rule
              </h3>
              <Badge
                className="text-[10px] font-mono ml-auto"
                style={{
                  backgroundColor: "rgb(212 160 23 / 0.15)",
                  color: "#D4A017",
                  border: "1px solid rgb(212 160 23 / 0.3)",
                }}
              >
                Precise
              </Badge>
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Leap every 4 years,{" "}
              <strong className="text-foreground">
                skip centuries (÷ 100)
              </strong>
              , but{" "}
              <strong className="text-foreground">
                restore every 400 years (÷ 400)
              </strong>
              .
            </p>
            <div className="mt-2 font-mono text-xs text-muted-foreground bg-border/20 px-2 py-1 rounded leading-relaxed">
              (÷4 &amp;&amp; !÷100) || ÷400 → LEAP
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Average: 365.2425 days/year. Only ~26 sec off — drifts 1 day per
              3,236 years.
            </p>
          </div>
        </div>
      </div>

      {/* Examples table */}
      <h3 className="font-ui font-semibold text-sm text-foreground mb-3">
        Notable Leap Year Examples
      </h3>
      <div
        className="overflow-hidden rounded-lg mb-6"
        style={{ border: "1px solid rgb(212 160 23 / 0.15)" }}
      >
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "rgb(212 160 23 / 0.08)" }}>
              <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider">
                Year
              </th>
              <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider">
                Julian
              </th>
              <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider">
                Gregorian
              </th>
              <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider hidden sm:table-cell">
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {LEAP_YEAR_EXAMPLES.map((row) => (
              <tr
                key={row.year}
                className="border-t"
                style={{ borderColor: "rgb(212 160 23 / 0.08)" }}
              >
                <td
                  className="px-3 py-2 font-display font-bold"
                  style={{ color: "#D4A017" }}
                >
                  {row.year}
                </td>
                <td className="px-3 py-2">
                  {row.julian ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                      ✓ Leap
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
                      ✗ Not Leap
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">
                  {row.gregorian ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                      ✓ Leap
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
                      ✗ Not Leap
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground hidden sm:table-cell">
                  {row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive leap year checker */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "rgb(212 160 23 / 0.05)",
          border: "1px solid rgb(212 160 23 / 0.2)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4" style={{ color: "#D4A017" }} />
          <h3 className="font-ui font-semibold text-sm text-foreground">
            Interactive Leap Year Checker
          </h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Type any year to instantly compare Julian vs Gregorian leap year
          status.
        </p>

        <Input
          data-ocid="leap_year_checker.input"
          type="number"
          placeholder="e.g. 1900, 2000, 2100, 2024…"
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
          className="max-w-xs font-mono text-sm"
          min={1}
          max={9999}
          aria-label="Enter a year to check if it is a leap year"
        />

        <div
          data-ocid="leap_year_checker.result"
          className="mt-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {validYear ? (
            <motion.div
              key={parsedYear}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Julian result */}
                <div
                  className="p-3 rounded-lg flex items-start gap-3"
                  style={{
                    background: julianResult
                      ? "rgb(34 197 94 / 0.08)"
                      : "rgb(239 68 68 / 0.08)",
                    border: `1px solid ${julianResult ? "rgb(34 197 94 / 0.25)" : "rgb(239 68 68 / 0.25)"}`,
                  }}
                >
                  <span className="text-xl flex-shrink-0">
                    {julianResult ? "✅" : "❌"}
                  </span>
                  <div>
                    <div className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                      ⚔️ Julian Calendar
                    </div>
                    <div
                      className="font-display font-bold text-base"
                      style={{
                        color: julianResult
                          ? "rgb(74 222 128)"
                          : "rgb(248 113 113)",
                      }}
                    >
                      {julianResult ? "LEAP YEAR" : "NOT A LEAP YEAR"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {parsedYear} ÷ 4 ={" "}
                      {parsedYear % 4 === 0
                        ? "0 remainder"
                        : `remainder ${parsedYear % 4}`}
                    </div>
                  </div>
                </div>

                {/* Gregorian result */}
                <div
                  className="p-3 rounded-lg flex items-start gap-3"
                  style={{
                    background: gregorianResult
                      ? "rgb(34 197 94 / 0.08)"
                      : "rgb(239 68 68 / 0.08)",
                    border: `1px solid ${gregorianResult ? "rgb(34 197 94 / 0.25)" : "rgb(239 68 68 / 0.25)"}`,
                  }}
                >
                  <span className="text-xl flex-shrink-0">
                    {gregorianResult ? "✅" : "❌"}
                  </span>
                  <div>
                    <div className="text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                      📅 Gregorian Calendar
                    </div>
                    <div
                      className="font-display font-bold text-base"
                      style={{
                        color: gregorianResult
                          ? "rgb(74 222 128)"
                          : "rgb(248 113 113)",
                      }}
                    >
                      {gregorianResult ? "LEAP YEAR" : "NOT A LEAP YEAR"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {parsedYear % 4 === 0
                        ? parsedYear % 400 === 0
                          ? "÷ 400 → always leap"
                          : parsedYear % 100 === 0
                            ? "Century year, not ÷ 400 → skipped"
                            : "÷ 4 and not a century year → leap"
                        : "Not ÷ 4 → not a leap year"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Difference highlight */}
              {resultsDiffer && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 rounded-lg"
                  style={{
                    background: "rgb(212 160 23 / 0.12)",
                    border: "1px solid rgb(212 160 23 / 0.35)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg flex-shrink-0">⚠️</span>
                    <div>
                      <div
                        className="font-ui font-semibold text-sm mb-0.5"
                        style={{ color: "#D4A017" }}
                      >
                        The calendars disagree on {parsedYear}!
                      </div>
                      <p className="text-xs text-foreground/75 leading-relaxed">
                        {parsedYear} is a leap year under the Julian calendar
                        (every 4 years) but NOT under the Gregorian rule
                        (century years are skipped unless divisible by 400).
                        This is the exact type of correction that makes the
                        Gregorian calendar more accurate — it removes 3 leap
                        days per 400 years.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {!resultsDiffer && julianResult && (
                <p className="text-xs text-muted-foreground text-center">
                  Both calendars agree: {parsedYear} is a leap year. ✓
                </p>
              )}
              {!resultsDiffer && !julianResult && (
                <p className="text-xs text-muted-foreground text-center">
                  Both calendars agree: {parsedYear} is not a leap year. ✓
                </p>
              )}
            </motion.div>
          ) : inputYear.length > 0 ? (
            <p className="text-xs text-muted-foreground/60 italic">
              Enter a valid year (1–9999) to see the result.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground/50 italic">
              Start typing a year above…
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

export function GregorianArticlePage({
  open,
  onClose,
}: GregorianArticlePageProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-ocid="gregorian_article.modal"
          className="fixed inset-0 z-50 bg-background flex flex-col"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Ambient background */}
          <div
            className="pointer-events-none fixed inset-0"
            style={{
              background: `
                radial-gradient(ellipse 80% 40% at 50% -10%, rgb(212 160 23 / 0.12) 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 80% 80%, rgb(212 160 23 / 0.05) 0%, transparent 50%)
              `,
            }}
          />

          {/* Sticky header */}
          <header className="flex-shrink-0 sticky top-0 z-10 border-b border-border bg-card/60 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto flex items-center gap-3 px-4 h-14">
              <button
                type="button"
                data-ocid="gregorian_article.close_button"
                onClick={onClose}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-150 group"
                aria-label="Go back to calendar"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-150 group-hover:-translate-x-0.5" />
                <span className="text-sm font-ui font-medium hidden sm:inline">
                  Back to Calendar
                </span>
              </button>

              <div className="w-px h-5 bg-border mx-1 hidden sm:block" />

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <BookOpen
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "#D4A017" }}
                />
                <h1 className="font-display text-base font-semibold text-foreground truncate">
                  History of the Gregorian Calendar
                </h1>
              </div>
            </div>
          </header>

          {/* Scrollable article content */}
          <ScrollArea className="flex-1">
            <article className="max-w-3xl mx-auto px-4 py-10">
              {/* Hero section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl">📅</span>
                  <div>
                    <span
                      className="inline-block text-xs font-ui font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-1"
                      style={{
                        backgroundColor: "rgb(212 160 23 / 0.12)",
                        color: "#D4A017",
                        border: "1px solid rgb(212 160 23 / 0.2)",
                      }}
                    >
                      Calendar History
                    </span>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
                      History of the
                      <br />
                      <span style={{ color: "#D4A017" }}>
                        Gregorian Calendar
                      </span>
                    </h1>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  The world's most widely used civil calendar — governing nearly
                  every international business, legal, and diplomatic
                  interaction — was born from a religious crisis, a 10-minute
                  astronomical error, and one pope's determination to fix
                  Easter.
                </p>

                {/* Quick stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {[
                    { value: "1582", label: "Year introduced" },
                    { value: "365.2425", label: "Days per year" },
                    { value: "~26 sec", label: "Annual drift" },
                    { value: "195+", label: "Countries using it" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg px-3 py-3 text-center"
                      style={{
                        backgroundColor: "rgb(212 160 23 / 0.07)",
                        border: "1px solid rgb(212 160 23 / 0.15)",
                      }}
                    >
                      <div
                        className="font-display text-xl font-bold"
                        style={{ color: "#D4A017" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-ui mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-border mb-10" />

              {/* Section 1: Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Section
                  id="intro"
                  icon={
                    <Globe className="w-4 h-4" style={{ color: "#D4A017" }} />
                  }
                  title="Introduction"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    The{" "}
                    <strong className="text-foreground">
                      Gregorian calendar
                    </strong>{" "}
                    is the international civil calendar used by most of the
                    world today. It is a solar calendar — meaning it is based on
                    the Earth's orbit around the Sun — and is designed to keep
                    the calendar year synchronized with the astronomical, or
                    tropical, year.
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    A Gregorian year consists of 365 days in an ordinary year
                    and 366 days in a leap year, divided into 12 months. Its
                    primary advantage over its predecessor, the Julian calendar,
                    is a more accurate leap year rule that prevents the calendar
                    from drifting significantly out of alignment with the
                    seasons.
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                    Today, the calendar is the{" "}
                    <strong className="text-foreground">
                      de facto global standard
                    </strong>{" "}
                    for commerce, diplomacy, and international coordination —
                    used by virtually every nation on Earth as the official
                    civil calendar, even when other calendars remain in use for
                    cultural or religious purposes.
                  </p>
                </Section>
              </motion.div>

              {/* Section 2: Origins - Julian Calendar */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Section
                  id="julian"
                  icon={
                    <Scroll className="w-4 h-4" style={{ color: "#D4A017" }} />
                  }
                  title="Origins: The Julian Calendar"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    Before the Gregorian calendar, the Western world used the{" "}
                    <strong className="text-foreground">Julian calendar</strong>
                    , introduced by Julius Caesar in{" "}
                    <strong className="text-foreground">45 BCE</strong>{" "}
                    following his consulship of Egypt. Caesar, advised by the
                    Alexandrian astronomer Sosigenes, reformed the chaotic Roman
                    republican calendar, which had been manipulated by
                    politicians to extend their terms.
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    The Julian system was elegantly simple: a year of{" "}
                    <strong className="text-foreground">365 days</strong>, with
                    a leap year of 366 days every four years (divisible by 4).
                    This gave an average year length of exactly 365.25 days — a
                    significant improvement over previous Roman timekeeping.
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                    The Julian calendar served Europe well for over 1,600 years.
                    It standardized timekeeping across the Roman Empire and,
                    later, the Christian world. The 12-month structure we use
                    today — with its month names (January from Janus, July from
                    Julius Caesar, August from Augustus) — comes directly from
                    the Julian reform.
                  </p>

                  {/* Callout box */}
                  <div
                    className="mt-4 px-4 py-3 rounded-lg text-sm text-foreground/75 leading-relaxed"
                    style={{
                      backgroundColor: "rgb(212 160 23 / 0.06)",
                      border: "1px solid rgb(212 160 23 / 0.15)",
                      borderLeft: "3px solid #D4A017",
                    }}
                  >
                    <strong className="text-foreground">
                      Historical note:
                    </strong>{" "}
                    The Julian calendar was so dominant that it remained in use
                    in some countries well into the 20th century. Russia, for
                    example, only switched in 1918 — which is why the Bolshevik
                    "October Revolution" is commemorated in November by the
                    Gregorian calendar.
                  </div>
                </Section>
              </motion.div>

              {/* Section 2b: Julian vs Gregorian Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <Section
                  id="comparison"
                  icon={
                    <Scroll className="w-4 h-4" style={{ color: "#D4A017" }} />
                  }
                  title="Julian vs Gregorian: Key Differences"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-5">
                    The Gregorian calendar didn't replace the Julian out of
                    convenience — it replaced it out of necessity. Here's how
                    the two systems compare across the features that matter
                    most.
                  </p>

                  {/* Desktop: two-column cards; Mobile: stacked rows */}
                  <div className="overflow-x-auto -mx-1">
                    <div className="min-w-[540px] px-1">
                      {/* Header row */}
                      <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-2 mb-2">
                        <div className="px-3 py-2" />
                        <div
                          className="px-3 py-2 rounded-t-lg text-center font-ui font-semibold text-sm text-foreground/75"
                          style={{
                            background: "rgb(100 100 120 / 0.12)",
                            border: "1px solid rgb(100 100 120 / 0.2)",
                            borderBottom: "none",
                          }}
                        >
                          <span className="text-lg mr-1">⚔️</span> Julian
                        </div>
                        <div
                          className="px-3 py-2 rounded-t-lg text-center font-ui font-semibold text-sm"
                          style={{
                            background: "rgb(212 160 23 / 0.12)",
                            border: "1px solid rgb(212 160 23 / 0.25)",
                            borderBottom: "none",
                            color: "#D4A017",
                          }}
                        >
                          <span className="text-lg mr-1">📅</span> Gregorian
                        </div>
                      </div>

                      {/* Data rows */}
                      {[
                        {
                          feature: "Introduced",
                          julian: "45 BCE by Julius Caesar",
                          gregorian: "1582 CE by Pope Gregory XIII",
                        },
                        {
                          feature: "Leap year rule",
                          julian: "Every year ÷ 4",
                          gregorian:
                            "÷ 4, EXCEPT centuries — unless also ÷ 400",
                        },
                        {
                          feature: "Avg. year length",
                          julian: "365.25 days",
                          gregorian: "365.2425 days",
                        },
                        {
                          feature: "Drift vs solar year",
                          julian: "~11 min/year too long",
                          gregorian: "~26 sec/year too long",
                        },
                        {
                          feature: "Cumulative offset",
                          julian: "~13 days behind Gregorian",
                          gregorian: "Standard civil calendar",
                        },
                        {
                          feature: "Still used by",
                          julian: "Eastern Orthodox churches, some communities",
                          gregorian: "Most of the world (195+ nations)",
                        },
                      ].map((row, i) => (
                        <div
                          key={row.feature}
                          className="grid grid-cols-[1.6fr_1fr_1fr] gap-2 mb-1"
                        >
                          <div
                            className={cn(
                              "px-3 py-2.5 text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wide flex items-center",
                              i === 5 ? "rounded-bl-lg" : "",
                            )}
                            style={{
                              background: "rgb(212 160 23 / 0.04)",
                              border: "1px solid rgb(212 160 23 / 0.08)",
                            }}
                          >
                            {row.feature}
                          </div>
                          <div
                            className={cn(
                              "px-3 py-2.5 text-sm text-foreground/70 leading-snug",
                              i === 5 ? "rounded-bl-lg" : "",
                            )}
                            style={{
                              background: "rgb(100 100 120 / 0.07)",
                              border: "1px solid rgb(100 100 120 / 0.15)",
                            }}
                          >
                            {row.julian}
                          </div>
                          <div
                            className={cn(
                              "px-3 py-2.5 text-sm text-foreground leading-snug",
                              i === 5 ? "rounded-br-lg" : "",
                            )}
                            style={{
                              background: "rgb(212 160 23 / 0.06)",
                              border: "1px solid rgb(212 160 23 / 0.15)",
                            }}
                          >
                            {row.gregorian}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    The difference between 365.25 and 365.2425 days seems tiny,
                    but over centuries it compounds into weeks — that's exactly
                    the drift that prompted the 1582 reform.
                  </p>
                </Section>
              </motion.div>

              {/* Section 2c: Leap Year Explained */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <LeapYearSection />
              </motion.div>

              {/* Section 3: The Problem */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Section
                  id="drift"
                  icon={
                    <Clock className="w-4 h-4" style={{ color: "#D4A017" }} />
                  }
                  title="The Problem: Calendar Drift"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    The Julian calendar's year of 365.25 days is not quite
                    right. The actual tropical year — the time it takes Earth to
                    orbit the Sun, measured from spring equinox to spring
                    equinox — is approximately{" "}
                    <strong className="text-foreground">365.24219 days</strong>.
                    This means the Julian year is about{" "}
                    <strong className="text-foreground">
                      11 minutes and 14 seconds too long
                    </strong>
                    .
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    That tiny error accumulates:{" "}
                    <strong className="text-foreground">
                      one full day every ~128 years
                    </strong>
                    . By the 16th century, the Julian calendar had drifted
                    roughly 10 days out of alignment with the actual solar year.
                    The spring equinox, which had fallen on March 21 at the time
                    of the First Council of Nicaea (325 CE), now arrived around
                    March 11.
                  </p>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed">
                    This drift had a specific religious consequence:{" "}
                    <strong className="text-foreground">
                      Easter was being calculated on the wrong date
                    </strong>
                    . The Council of Nicaea had established that Easter should
                    be on the first Sunday after the first full moon on or after
                    the spring equinox. With the equinox slipping earlier,
                    Easter was drifting further from its astronomical foundation
                    — a theological problem that had troubled the Church for
                    centuries.
                  </p>

                  {/* Drift visualizer */}
                  <div
                    className="mt-5 rounded-lg p-4"
                    style={{
                      background: "rgb(212 160 23 / 0.05)",
                      border: "1px solid rgb(212 160 23 / 0.12)",
                    }}
                  >
                    <h3 className="text-sm font-ui font-semibold text-foreground mb-3">
                      Calendar Drift Over Time
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          year: "325 CE",
                          days: 0,
                          label: "Council of Nicaea — equinox on Mar 21",
                        },
                        {
                          year: "900 CE",
                          days: 4.5,
                          label: "~4.5 days drift accumulated",
                        },
                        {
                          year: "1200 CE",
                          days: 7,
                          label: "~7 days drift — equinox now ~Mar 14",
                        },
                        {
                          year: "1582 CE",
                          days: 10,
                          label: "10 days drift — reform enacted",
                        },
                      ].map((row) => (
                        <div key={row.year} className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground w-16 flex-shrink-0">
                            {row.year}
                          </span>
                          <div className="flex-1 bg-border/40 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: "#D4A017",
                                width: `${(row.days / 10) * 100}%`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${(row.days / 10) * 100}%` }}
                              transition={{
                                delay: 0.4,
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0 text-right hidden sm:block max-w-[200px] leading-tight">
                            {row.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Section>
              </motion.div>

              {/* Section 4: Gregory's Reform */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Section
                  id="reform"
                  icon={
                    <Info className="w-4 h-4" style={{ color: "#D4A017" }} />
                  }
                  title="Pope Gregory XIII's Reform (1582)"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-3">
                    In{" "}
                    <strong className="text-foreground">February 1582</strong>,
                    Pope Gregory XIII issued the papal bull{" "}
                    <em className="text-foreground font-medium">
                      "Inter gravissimas"
                    </em>{" "}
                    ("Among the most serious"), announcing the reform of the
                    Julian calendar. The bull was based primarily on the work of
                    the Calabrian physician{" "}
                    <strong className="text-foreground">Aloysius Lilius</strong>{" "}
                    (also known as Luigi Lilio), who had died before seeing it
                    implemented.
                  </p>

                  <h3 className="font-ui font-semibold text-foreground text-sm mb-2 mt-4">
                    The Two-Part Reform
                  </h3>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-2">
                    The reform had two distinct components:
                  </p>

                  <div className="space-y-3 mb-4">
                    <div
                      className="flex gap-3 p-3 rounded-lg"
                      style={{
                        background: "rgb(212 160 23 / 0.06)",
                        border: "1px solid rgb(212 160 23 / 0.1)",
                      }}
                    >
                      <div className="text-xl flex-shrink-0">①</div>
                      <div>
                        <div className="font-ui font-semibold text-sm text-foreground mb-1">
                          The One-Time Correction
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          To re-align the calendar with the seasons,{" "}
                          <strong className="text-foreground">
                            10 days were dropped
                          </strong>{" "}
                          from October 1582. In Catholic countries, October 4
                          (Thursday) was immediately followed by October 15
                          (Friday). The calendar was now back in sync with the
                          solar year.
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex gap-3 p-3 rounded-lg"
                      style={{
                        background: "rgb(212 160 23 / 0.06)",
                        border: "1px solid rgb(212 160 23 / 0.1)",
                      }}
                    >
                      <div className="text-xl flex-shrink-0">②</div>
                      <div>
                        <div className="font-ui font-semibold text-sm text-foreground mb-1">
                          The New Leap Year Rule
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          To prevent future drift, Lilius proposed an elegant
                          modification to the leap year system:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-foreground/75">
                          <li className="flex items-start gap-2">
                            <span style={{ color: "#D4A017" }}>✓</span>
                            <span>
                              A year divisible by{" "}
                              <strong className="text-foreground">4</strong> IS
                              a leap year...
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-destructive">✗</span>
                            <span>
                              ...EXCEPT century years (100, 200, 300...) are NOT
                              leap years...
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span style={{ color: "#D4A017" }}>✓</span>
                            <span>
                              ...UNLESS the century year is also divisible by{" "}
                              <strong className="text-foreground">400</strong>{" "}
                              (1600, 2000, 2400...).
                            </span>
                          </li>
                        </ul>
                        <p className="mt-2 text-sm text-muted-foreground">
                          This eliminates 3 leap years every 400 years, giving
                          an average year of exactly 365.2425 days — accurate to
                          within 26 seconds of the astronomical year.
                        </p>
                      </div>
                    </div>
                  </div>
                </Section>
              </motion.div>

              {/* Section 5: Adoption Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Section
                  id="timeline"
                  icon={
                    <Calendar
                      className="w-4 h-4"
                      style={{ color: "#D4A017" }}
                    />
                  }
                  title="Adoption Timeline"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-5">
                    The Gregorian calendar's adoption was slow and politically
                    contentious. Protestant nations initially rejected it as a
                    "Catholic" imposition. It took nearly 400 years for the
                    calendar to become truly universal.
                  </p>

                  {/* Timeline */}
                  <div className="relative">
                    {/* Vertical line */}
                    <div
                      className="absolute left-[11px] top-0 bottom-0 w-px"
                      style={{ background: "rgb(212 160 23 / 0.25)" }}
                    />

                    <div className="space-y-4">
                      {ADOPTION_TIMELINE.map((item, idx) => (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          className="flex gap-4 relative pl-1"
                        >
                          {/* Dot */}
                          <div
                            className="w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center text-[11px] relative z-10"
                            style={{
                              background: "oklch(0.16 0.028 265)",
                              border: "2px solid #D4A017",
                            }}
                          />

                          <div className="pb-4 flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span
                                className="font-display text-lg font-bold"
                                style={{ color: "#D4A017" }}
                              >
                                {item.year}
                              </span>
                              <span className="text-sm">{item.icon}</span>
                              <span className="text-sm font-ui font-semibold text-foreground leading-tight">
                                {item.countries}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Section>
              </motion.div>

              {/* Section 6: Structure */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Section
                  id="structure"
                  icon={
                    <BookOpen
                      className="w-4 h-4"
                      style={{ color: "#D4A017" }}
                    />
                  }
                  title="Structure of the Calendar"
                >
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-4">
                    The Gregorian calendar divides the year into 12 months with
                    varying lengths, a system inherited from the Julian and
                    ultimately the Roman republican calendar.
                  </p>

                  {/* Month table */}
                  <div
                    className="overflow-x-auto rounded-lg"
                    style={{ border: "1px solid rgb(212 160 23 / 0.15)" }}
                  >
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ background: "rgb(212 160 23 / 0.08)" }}>
                          <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider">
                            Month
                          </th>
                          <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider">
                            Days
                          </th>
                          <th className="text-left px-3 py-2 font-ui font-semibold text-foreground text-xs uppercase tracking-wider hidden sm:table-cell">
                            Origin of Name
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            month: "January",
                            days: "31",
                            origin: "Janus, Roman god of beginnings",
                          },
                          {
                            month: "February",
                            days: "28/29",
                            origin: "Februa, Roman purification festival",
                          },
                          {
                            month: "March",
                            days: "31",
                            origin: "Mars, Roman god of war",
                          },
                          {
                            month: "April",
                            days: "30",
                            origin: "Latin 'aperire' (to open) or Aphrodite",
                          },
                          {
                            month: "May",
                            days: "31",
                            origin: "Maia, Roman goddess of fertility",
                          },
                          {
                            month: "June",
                            days: "30",
                            origin: "Juno, Roman goddess (or 'iuniores')",
                          },
                          {
                            month: "July",
                            days: "31",
                            origin: "Julius Caesar (renamed from Quintilis)",
                          },
                          {
                            month: "August",
                            days: "31",
                            origin: "Emperor Augustus (renamed from Sextilis)",
                          },
                          {
                            month: "September",
                            days: "30",
                            origin:
                              "Latin 'septem' (seven) — once the 7th month",
                          },
                          {
                            month: "October",
                            days: "31",
                            origin: "Latin 'octo' (eight) — once the 8th month",
                          },
                          {
                            month: "November",
                            days: "30",
                            origin: "Latin 'novem' (nine) — once the 9th month",
                          },
                          {
                            month: "December",
                            days: "31",
                            origin: "Latin 'decem' (ten) — once the 10th month",
                          },
                        ].map((row, i) => (
                          <tr
                            key={row.month}
                            className={cn(
                              "border-t text-sm",
                              i % 2 === 0 ? "" : "",
                            )}
                            style={{ borderColor: "rgb(212 160 23 / 0.08)" }}
                          >
                            <td className="px-3 py-2 font-ui font-semibold text-foreground">
                              {row.month}
                            </td>
                            <td
                              className="px-3 py-2 font-mono text-sm"
                              style={{ color: "#D4A017" }}
                            >
                              {row.days}
                            </td>
                            <td className="px-3 py-2 text-muted-foreground hidden sm:table-cell">
                              {row.origin}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    A common mnemonic for month lengths: "30 days hath
                    September, April, June, and November; all the rest have 31,
                    save February which has 28 (or 29 in a leap year)."
                    February's short length dates to ancient Roman calendar
                    manipulation — Julius Caesar's reforms later fixed most
                    inconsistencies.
                  </p>
                </Section>
              </motion.div>

              {/* Section 7: Interesting Facts */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Section
                  id="facts"
                  icon={
                    <Info className="w-4 h-4" style={{ color: "#D4A017" }} />
                  }
                  title="Fascinating Facts"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {INTERESTING_FACTS.map((fact) => (
                      <div
                        key={fact.title}
                        className="rounded-xl p-4"
                        style={{
                          background: "rgb(212 160 23 / 0.05)",
                          border: "1px solid rgb(212 160 23 / 0.12)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{fact.icon}</span>
                          <h3 className="font-ui font-semibold text-sm text-foreground">
                            {fact.title}
                          </h3>
                        </div>
                        <p className="text-sm text-foreground/75 leading-relaxed">
                          {fact.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              </motion.div>

              {/* Closing note */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <div
                  className="rounded-xl p-5 mt-2 mb-10"
                  style={{
                    background: "rgb(212 160 23 / 0.07)",
                    border: "1px solid rgb(212 160 23 / 0.18)",
                  }}
                >
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    The Gregorian calendar's dominance is a testament to the
                    power of international standardization. It is not perfect —
                    no calendar can perfectly track the messy, irrational
                    movements of celestial bodies — but it is accurate enough,
                    simple enough, and widespread enough to serve as humanity's
                    shared framework for organizing time across cultures,
                    languages, and borders.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Explore the other 13 calendar systems in World Calendars to
                    see how different civilizations solved the same fundamental
                    problem: tracking time.
                  </p>
                </div>
              </motion.div>
            </article>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
