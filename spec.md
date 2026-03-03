# World Calendars

## Current State
The app has a "History of the Gregorian Calendar" article page accessible from the Gregorian calendar view. It covers introduction, origins (Julian Calendar), Pope Gregory XIII's reform, adoption timeline, structure, and interesting facts.

## Requested Changes (Diff)

### Add
- A **"Julian vs Gregorian: Key Differences"** comparison section inside the article -- a side-by-side table or card layout showing differences in: leap year rule, year length, calendar drift, current date difference (~13 days), and which countries/churches still use Julian.
- A **"Leap Year Explained"** deep-dive section inside the article -- covers:
  - What a leap year is and why we need it (solar year = 365.2422 days)
  - Julian rule: every 4 years = 365.25 days average (too long by ~11 min/year)
  - Gregorian rule: divisible by 4 = leap year, EXCEPT centuries unless also divisible by 400
  - Examples: 1900 (not a leap year), 2000 (leap year), 2100 (not a leap year)
  - A simple interactive leap year checker: user types a year and sees if it's a leap year under both Julian and Gregorian rules
  - Fun fact: the Gregorian year is still off by ~26 seconds per year

### Modify
- Existing article page gets these two new sections inserted between "The Reform" and "Adoption Timeline" (or at the end, whichever flows better).

### Remove
- Nothing removed.

## Implementation Plan
1. Add a Julian vs Gregorian comparison section with a clear visual table/cards to `GregorianArticlePage.tsx`.
2. Add a Leap Year Explained section with a simple interactive checker (user inputs year, result shows Julian + Gregorian verdict).
3. Validate and build.
