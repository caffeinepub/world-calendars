# World Calendars

## Current State
A multi-calendar website displaying 12 world calendar systems with cultural backgrounds, holidays/festivals, and navigation sidebar. The app has a header, sidebar, main calendar view, and a slim footer.

## Requested Changes (Diff)

### Add
- A top banner ad slot below the header (full-width, prominent placement)
- A sidebar ad slot at the bottom of the desktop sidebar (below calendar list)
- A bottom banner ad slot above the footer (full-width)
- Ad placeholders styled as realistic ad banners with "Advertisement" label, placeholder image/graphic, headline, description, and a CTA button — all static/dummy content that looks like real ads

### Modify
- App layout to accommodate the new ad slots without breaking existing calendar navigation or view

### Remove
- Nothing

## Implementation Plan
1. Create an `AdBanner` component for horizontal banner ads (top/bottom placement) with realistic placeholder content
2. Create an `AdSidebar` component for vertical/sidebar ads
3. Insert top banner ad below the header in App.tsx
4. Insert sidebar ad at the bottom of the desktop sidebar in CalendarSidebar or App.tsx
5. Insert bottom banner ad above the footer in App.tsx
6. Ensure ads are clearly labeled "Advertisement" and visually distinct but styled to fit the app's design language
