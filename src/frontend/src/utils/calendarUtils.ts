import { HOLIDAYS } from "./holidaysData";
export type { HolidayInfo } from "./holidaysData";

export type CalendarId =
  | "gregorian"
  | "islamic"
  | "hebrew"
  | "chinese"
  | "persian"
  | "ethiopian"
  | "coptic"
  | "hindu"
  | "buddhist"
  | "japanese"
  | "korean"
  | "tibetan";

export interface CalendarConfig {
  intlCalendar: string;
  locale: string;
  numberingSystem?: string;
  isRTL?: boolean;
  weekStart?: 0 | 1; // 0 = Sunday, 1 = Monday
  emoji: string;
  region: string;
}

export const CALENDAR_CONFIG: Record<string, CalendarConfig> = {
  gregorian: {
    intlCalendar: "gregory",
    locale: "en",
    emoji: "🌍",
    region: "Global",
  },
  islamic: {
    intlCalendar: "islamic-umalqura",
    locale: "ar",
    numberingSystem: "arab",
    isRTL: true,
    emoji: "☪️",
    region: "Middle East",
  },
  hebrew: {
    intlCalendar: "hebrew",
    locale: "he",
    numberingSystem: "hebr",
    isRTL: true,
    emoji: "✡️",
    region: "Israel",
  },
  chinese: {
    intlCalendar: "chinese",
    locale: "zh",
    numberingSystem: "hanidec",
    emoji: "🐉",
    region: "East Asia",
  },
  persian: {
    intlCalendar: "persian",
    locale: "fa",
    numberingSystem: "arabext",
    isRTL: true,
    emoji: "🦁",
    region: "Iran",
  },
  ethiopian: {
    intlCalendar: "ethiopic",
    locale: "am",
    emoji: "🦁",
    region: "Ethiopia",
  },
  coptic: {
    intlCalendar: "coptic",
    locale: "ar-EG",
    emoji: "✝️",
    region: "Egypt",
  },
  hindu: {
    intlCalendar: "indian",
    locale: "hi",
    numberingSystem: "deva",
    emoji: "🕉️",
    region: "India",
  },
  buddhist: {
    intlCalendar: "buddhist",
    locale: "th",
    emoji: "☸️",
    region: "Thailand",
  },
  japanese: {
    intlCalendar: "japanese",
    locale: "ja",
    emoji: "🗾",
    region: "Japan",
  },
  korean: {
    intlCalendar: "dangi",
    locale: "ko",
    numberingSystem: "hanidec",
    emoji: "🇰🇷",
    region: "Korea",
  },
  tibetan: {
    intlCalendar: "tibetan",
    locale: "bo",
    emoji: "🏔️",
    region: "Tibet",
  },
};

export interface DayInfo {
  date: Date;
  gregorianDay: number;
  calendarDay: string;
  calendarMonth: string;
  calendarYear: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  holidays: import("./holidaysData").HolidayInfo[];
}

export interface MonthInfo {
  monthName: string;
  yearName: string;
  eraName?: string;
}

function getFormatter(
  calendarId: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const config = CALENDAR_CONFIG[calendarId];
  if (!config) {
    return new Intl.DateTimeFormat("en", options);
  }

  const locale = `${config.locale}-u-ca-${config.intlCalendar}${config.numberingSystem ? `-nu-${config.numberingSystem}` : ""}`;
  try {
    return new Intl.DateTimeFormat(locale, options);
  } catch {
    return new Intl.DateTimeFormat("en", {
      ...options,
      calendar: config.intlCalendar,
    });
  }
}

export function getMonthInfo(calendarId: string, date: Date): MonthInfo {
  try {
    const monthFormatter = getFormatter(calendarId, {
      month: "long",
      year: "numeric",
      era: "short",
    });

    const parts = monthFormatter.formatToParts(date);
    const monthPart = parts.find((p) => p.type === "month")?.value ?? "";
    const yearPart = parts.find((p) => p.type === "year")?.value ?? "";
    const eraPart = parts.find((p) => p.type === "era")?.value;

    return {
      monthName: monthPart,
      yearName: yearPart,
      eraName: eraPart,
    };
  } catch {
    const fallback = new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
    });
    const parts = fallback.formatToParts(date);
    return {
      monthName: parts.find((p) => p.type === "month")?.value ?? "",
      yearName: parts.find((p) => p.type === "year")?.value ?? "",
    };
  }
}

export function getDayNumber(calendarId: string, date: Date): string {
  try {
    const config = CALENDAR_CONFIG[calendarId];
    const formatter = getFormatter(calendarId, { day: "numeric" });
    const parts = formatter.formatToParts(date);
    const dayPart = parts.find((p) => p.type === "day")?.value;
    if (dayPart) return dayPart;

    // Fallback: format just the day
    if (config?.numberingSystem) {
      const locale = `${config.locale}-u-nu-${config.numberingSystem}`;
      return new Intl.NumberFormat(locale).format(date.getDate());
    }
    return String(date.getDate());
  } catch {
    return String(date.getDate());
  }
}

export function buildMonthGrid(calendarId: string, viewDate: Date): DayInfo[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get first and last day of the Gregorian month
  const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const lastDay = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

  // Day of week for first day (0=Sun, 1=Mon, ..., 6=Sat)
  const startDOW = firstDay.getDay(); // 0=Sunday

  const days: DayInfo[] = [];

  // Padding days before
  for (let i = 0; i < startDOW; i++) {
    const d = new Date(firstDay);
    d.setDate(d.getDate() - (startDOW - i));
    days.push(createDayInfo(calendarId, d, today, false));
  }

  // Days of current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    days.push(createDayInfo(calendarId, date, today, true));
  }

  // Padding days after (to complete 6 rows = 42 cells)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(lastDay);
    d.setDate(d.getDate() + i);
    days.push(createDayInfo(calendarId, d, today, false));
  }

  return days;
}

function createDayInfo(
  calendarId: string,
  date: Date,
  today: Date,
  isCurrentMonth: boolean,
): DayInfo {
  const monthInfo = getMonthInfo(calendarId, date);
  const calendarDay = getDayNumber(calendarId, date);

  const calHolidays = HOLIDAYS[calendarId] ?? [];
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  const holidays = calHolidays
    .filter((h) => h.month === gMonth && h.day === gDay)
    .map((h) => h.holiday);

  return {
    date,
    gregorianDay: date.getDate(),
    calendarDay,
    calendarMonth: monthInfo.monthName,
    calendarYear: monthInfo.yearName,
    isToday: date.getTime() === today.getTime(),
    isCurrentMonth,
    holidays,
  };
}

export function navigateMonth(currentDate: Date, direction: -1 | 1): Date {
  const newDate = new Date(currentDate);
  newDate.setMonth(newDate.getMonth() + direction);
  // Keep at first day of month
  newDate.setDate(1);
  return newDate;
}

export function getWeekDayNames(_calendarId: string): string[] {
  // Always use Sun-Sat week layout
  const sunday = new Date(2024, 0, 7); // Jan 7, 2024 is a Sunday
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    try {
      return new Intl.DateTimeFormat("en", { weekday: "short" }).format(d);
    } catch {
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
    }
  });
}
