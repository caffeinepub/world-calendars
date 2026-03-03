import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  PartyPopper,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { CalendarEntry } from "../backend.d.ts";
import {
  CALENDAR_CONFIG,
  type DayInfo,
  type HolidayInfo,
  buildMonthGrid,
  getMonthInfo,
  getWeekDayNames,
  navigateMonth,
} from "../utils/calendarUtils";

// Per-calendar header tint colors and background config
const CALENDAR_TINTS: Record<string, string> = {
  gregorian: "#D4A017",
  islamic: "#1B6B7B",
  hebrew: "#4B0082",
  chinese: "#C0392B",
  persian: "#1F3A8F",
  ethiopian: "#C0532C",
  coptic: "#B8860B",
  hindu: "#FF6B00",
  buddhist: "#CCA900",
  japanese: "#1A2744",
  korean: "#0D5C5C",
  tibetan: "#800020",
  marathi: "#FF6600",
  french: "#002395",
};

function CalendarBackground({ id }: { id: string }) {
  switch (id) {
    case "gregorian":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="greg-radial" cx="50%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="greg-columns"
              x="0"
              y="0"
              width="120"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              {/* Roman column silhouette */}
              <rect
                x="10"
                y="10"
                width="16"
                height="120"
                rx="2"
                fill="#D4A017"
                fillOpacity="0.08"
              />
              <rect
                x="8"
                y="10"
                width="20"
                height="6"
                rx="1"
                fill="#D4A017"
                fillOpacity="0.1"
              />
              <rect
                x="6"
                y="120"
                width="24"
                height="8"
                rx="1"
                fill="#D4A017"
                fillOpacity="0.1"
              />
              <rect
                x="4"
                y="128"
                width="28"
                height="5"
                rx="1"
                fill="#D4A017"
                fillOpacity="0.08"
              />
              {/* Fluted lines */}
              <line
                x1="13"
                y1="16"
                x2="13"
                y2="128"
                stroke="#D4A017"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
              <line
                x1="16"
                y1="16"
                x2="16"
                y2="128"
                stroke="#D4A017"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
              <line
                x1="19"
                y1="16"
                x2="19"
                y2="128"
                stroke="#D4A017"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
              <line
                x1="22"
                y1="16"
                x2="22"
                y2="128"
                stroke="#D4A017"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </pattern>
            <linearGradient id="greg-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60%" stopColor="transparent" />
              <stop
                offset="100%"
                stopColor="var(--color-background, #0a0a0a)"
                stopOpacity="1"
              />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#greg-radial)" />
          <rect width="20%" height="100%" fill="url(#greg-columns)" />
          <rect x="80%" width="20%" height="100%" fill="url(#greg-columns)" />
          <rect width="100%" height="100%" fill="url(#greg-fade)" />
        </svg>
      );

    case "islamic":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="islamic-star"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              {/* 8-pointed Islamic star */}
              <g
                transform="translate(30,30)"
                fill="none"
                stroke="#1B6B7B"
                strokeWidth="0.8"
                strokeOpacity="0.25"
              >
                <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" />
                <polygon
                  points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4"
                  transform="rotate(45)"
                />
                <circle r="5" strokeOpacity="0.15" />
                <circle r="16" strokeOpacity="0.08" />
              </g>
            </pattern>
            <linearGradient id="islamic-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1B6B7B" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#1B6B7B" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#1B6B7B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-fade)" />
          <rect width="100%" height="100%" fill="url(#islamic-star)" />
        </svg>
      );

    case "hebrew":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="hebrew-star"
              x="0"
              y="0"
              width="70"
              height="70"
              patternUnits="userSpaceOnUse"
            >
              {/* Star of David */}
              <g
                transform="translate(35,35)"
                fill="none"
                stroke="#8B6914"
                strokeWidth="0.9"
                strokeOpacity="0.2"
              >
                <polygon points="0,-16 13.8,8 -13.8,8" />
                <polygon points="0,16 13.8,-8 -13.8,-8" />
                <circle r="6" strokeOpacity="0.12" />
              </g>
            </pattern>
            <radialGradient id="hebrew-glow" cx="50%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#B8860B" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#hebrew-glow)" />
          <rect width="100%" height="100%" fill="url(#hebrew-star)" />
        </svg>
      );

    case "chinese":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="chinese-lattice"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              {/* Chinese window lattice: nested squares */}
              <rect
                x="2"
                y="2"
                width="44"
                height="44"
                fill="none"
                stroke="#C0392B"
                strokeWidth="0.8"
                strokeOpacity="0.18"
              />
              <rect
                x="10"
                y="10"
                width="28"
                height="28"
                fill="none"
                stroke="#C0392B"
                strokeWidth="0.7"
                strokeOpacity="0.14"
              />
              <rect
                x="18"
                y="18"
                width="12"
                height="12"
                fill="none"
                stroke="#C0392B"
                strokeWidth="0.6"
                strokeOpacity="0.12"
              />
              {/* Cross lines */}
              <line
                x1="24"
                y1="2"
                x2="24"
                y2="46"
                stroke="#C0392B"
                strokeWidth="0.5"
                strokeOpacity="0.1"
              />
              <line
                x1="2"
                y1="24"
                x2="46"
                y2="24"
                stroke="#C0392B"
                strokeWidth="0.5"
                strokeOpacity="0.1"
              />
            </pattern>
            <radialGradient id="chinese-glow" cx="50%" cy="0%" r="60%">
              <stop offset="0%" stopColor="#C0392B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#C0392B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#chinese-glow)" />
          <rect width="100%" height="100%" fill="url(#chinese-lattice)" />
        </svg>
      );

    case "persian":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="persian-arabesque"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Persian arabesque: interlocking floral curves */}
              <g
                fill="none"
                stroke="#1F3A8F"
                strokeWidth="0.8"
                strokeOpacity="0.2"
              >
                {/* Petals */}
                <path d="M40,10 Q55,25 40,40 Q25,25 40,10Z" />
                <path d="M40,40 Q55,55 40,70 Q25,55 40,40Z" />
                <path d="M10,40 Q25,55 40,40 Q25,25 10,40Z" />
                <path d="M40,40 Q55,25 70,40 Q55,55 40,40Z" />
                {/* Center */}
                <circle cx="40" cy="40" r="6" strokeOpacity="0.15" />
                {/* Connecting arcs */}
                <path d="M40,10 Q70,10 70,40" strokeOpacity="0.1" />
                <path d="M70,40 Q70,70 40,70" strokeOpacity="0.1" />
                <path d="M40,70 Q10,70 10,40" strokeOpacity="0.1" />
                <path d="M10,40 Q10,10 40,10" strokeOpacity="0.1" />
              </g>
            </pattern>
            <radialGradient id="persian-glow" cx="50%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#1F3A8F" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1F3A8F" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#persian-glow)" />
          <rect width="100%" height="100%" fill="url(#persian-arabesque)" />
        </svg>
      );

    case "ethiopian":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="ethiopian-cross"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Lalibela cross shape */}
              <g
                transform="translate(40,40)"
                fill="none"
                stroke="#C0532C"
                strokeWidth="0.9"
                strokeOpacity="0.22"
              >
                {/* Main cross */}
                <rect x="-4" y="-20" width="8" height="40" rx="1" />
                <rect x="-20" y="-4" width="40" height="8" rx="1" />
                {/* Ornate arm ends */}
                <rect x="-6" y="-22" width="12" height="4" rx="1" />
                <rect x="-6" y="18" width="12" height="4" rx="1" />
                <rect x="-22" y="-6" width="4" height="12" rx="1" />
                <rect x="18" y="-6" width="4" height="12" rx="1" />
                {/* Center diamond */}
                <polygon points="0,-5 5,0 0,5 -5,0" strokeOpacity="0.18" />
              </g>
            </pattern>
            <radialGradient id="ethiopian-glow" cx="50%" cy="15%" r="55%">
              <stop offset="0%" stopColor="#C0532C" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#C0532C" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#ethiopian-glow)" />
          <rect width="100%" height="100%" fill="url(#ethiopian-cross)" />
        </svg>
      );

    case "coptic":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="coptic-cross"
              x="0"
              y="0"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              {/* Coptic cross with flared ends */}
              <g
                transform="translate(32,32)"
                fill="none"
                stroke="#B8860B"
                strokeWidth="0.9"
                strokeOpacity="0.2"
              >
                <rect x="-3" y="-18" width="6" height="36" rx="1" />
                <rect x="-18" y="-3" width="36" height="6" rx="1" />
                {/* Flared tips */}
                <path d="M-5,-18 Q0,-22 5,-18" />
                <path d="M-5,18 Q0,22 5,18" />
                <path d="M-18,-5 Q-22,0 -18,5" />
                <path d="M18,-5 Q22,0 18,5" />
                <circle r="4" strokeOpacity="0.12" />
              </g>
            </pattern>
            <radialGradient id="coptic-glow" cx="50%" cy="10%" r="50%">
              <stop offset="0%" stopColor="#B8860B" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#coptic-glow)" />
          <rect width="100%" height="100%" fill="url(#coptic-cross)" />
        </svg>
      );

    case "hindu":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="hindu-radial" cx="50%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#FF6B00" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="hindu-lotus"
              x="0"
              y="0"
              width="90"
              height="90"
              patternUnits="userSpaceOnUse"
            >
              {/* Lotus mandala petals */}
              <g
                transform="translate(45,45)"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="0.8"
                strokeOpacity="0.18"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <ellipse
                    key={angle}
                    cx={Math.sin((angle * Math.PI) / 180) * 14}
                    cy={-Math.cos((angle * Math.PI) / 180) * 14}
                    rx="5"
                    ry="12"
                    transform={`rotate(${angle})`}
                    strokeOpacity="0.16"
                  />
                ))}
                <circle r="8" strokeOpacity="0.12" />
                <circle r="4" strokeOpacity="0.2" />
                <circle r="20" strokeOpacity="0.06" strokeDasharray="2 4" />
                <circle r="30" strokeOpacity="0.05" strokeDasharray="3 6" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hindu-radial)" />
          <rect width="100%" height="100%" fill="url(#hindu-lotus)" />
        </svg>
      );

    case "buddhist":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="buddhist-glow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#CCA900" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#CCA900" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#buddhist-glow)" />
          {/* Dharma wheel watermark centered */}
          <g
            transform="translate(50%,38%)"
            fill="none"
            stroke="#CCA900"
            strokeOpacity="0.12"
            strokeWidth="1.2"
          >
            <circle r="55" />
            <circle r="30" />
            <circle r="8" />
            {/* 8 spokes */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((a) => (
              <line
                key={a}
                x1={Math.cos((a * Math.PI) / 180) * 8}
                y1={Math.sin((a * Math.PI) / 180) * 8}
                x2={Math.cos((a * Math.PI) / 180) * 55}
                y2={Math.sin((a * Math.PI) / 180) * 55}
              />
            ))}
            {/* Rim details */}
            <circle r="45" strokeOpacity="0.07" strokeDasharray="4 8" />
          </g>
        </svg>
      );

    case "japanese":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="seigaiha"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              {/* Seigaiha - overlapping wave scales */}
              <g
                fill="none"
                stroke="#1A2744"
                strokeWidth="0.7"
                strokeOpacity="0.2"
              >
                <path d="M20,0 A20,20 0 0,1 40,20 L0,20 A20,20 0 0,1 20,0Z" />
                <path d="M0,20 A20,20 0 0,1 20,40 L-20,40 A20,20 0 0,1 0,20Z" />
                <path d="M40,20 A20,20 0 0,1 60,40 L20,40 A20,20 0 0,1 40,20Z" />
                {/* Inner arc detail */}
                <path
                  d="M20,8 A12,12 0 0,1 32,20 L8,20 A12,12 0 0,1 20,8Z"
                  strokeOpacity="0.12"
                />
              </g>
            </pattern>
            <linearGradient id="japanese-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1A2744" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#1A2744" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#japanese-fade)" />
          <rect width="100%" height="100%" fill="url(#seigaiha)" />
        </svg>
      );

    case "korean":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="dancheong"
              x="0"
              y="0"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              {/* Dancheong - Korean decorative geometric motif */}
              <g
                fill="none"
                stroke="#0D5C5C"
                strokeWidth="0.8"
                strokeOpacity="0.2"
              >
                {/* Outer frame */}
                <rect x="2" y="2" width="68" height="68" rx="4" />
                {/* Inner diamond */}
                <polygon points="36,8 64,36 36,64 8,36" />
                {/* Cross */}
                <line x1="36" y1="2" x2="36" y2="70" strokeOpacity="0.1" />
                <line x1="2" y1="36" x2="70" y2="36" strokeOpacity="0.1" />
                {/* Corner squares */}
                <rect
                  x="6"
                  y="6"
                  width="12"
                  height="12"
                  rx="2"
                  strokeOpacity="0.15"
                />
                <rect
                  x="54"
                  y="6"
                  width="12"
                  height="12"
                  rx="2"
                  strokeOpacity="0.15"
                />
                <rect
                  x="6"
                  y="54"
                  width="12"
                  height="12"
                  rx="2"
                  strokeOpacity="0.15"
                />
                <rect
                  x="54"
                  y="54"
                  width="12"
                  height="12"
                  rx="2"
                  strokeOpacity="0.15"
                />
                {/* Center */}
                <circle cx="36" cy="36" r="6" strokeOpacity="0.18" />
              </g>
            </pattern>
            <radialGradient id="korean-glow" cx="50%" cy="10%" r="55%">
              <stop offset="0%" stopColor="#0D5C5C" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#0D5C5C" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#korean-glow)" />
          <rect width="100%" height="100%" fill="url(#dancheong)" />
        </svg>
      );

    case "tibetan":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="endless-knot"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Srivatsa / endless knot simplified */}
              <g
                fill="none"
                stroke="#800020"
                strokeWidth="1"
                strokeOpacity="0.2"
              >
                {/* Outer loop */}
                <path d="M40,10 Q60,10 60,30 Q60,50 40,50 Q20,50 20,30 Q20,10 40,10Z" />
                {/* Inner crossing */}
                <path
                  d="M30,20 Q40,30 50,20 Q60,10 50,40 Q40,50 30,20Z"
                  strokeOpacity="0.14"
                />
                <path
                  d="M30,40 Q40,30 50,40 Q60,50 50,20 Q40,10 30,40Z"
                  strokeOpacity="0.14"
                />
                {/* Extensions */}
                <line x1="40" y1="10" x2="40" y2="2" />
                <line x1="40" y1="50" x2="40" y2="58" />
                <line x1="20" y1="30" x2="12" y2="30" />
                <line x1="60" y1="30" x2="68" y2="30" />
                {/* Corner ornaments */}
                <circle
                  cx="40"
                  cy="2"
                  r="2"
                  fill="#800020"
                  fillOpacity="0.12"
                  stroke="none"
                />
                <circle
                  cx="40"
                  cy="58"
                  r="2"
                  fill="#800020"
                  fillOpacity="0.12"
                  stroke="none"
                />
                <circle
                  cx="12"
                  cy="30"
                  r="2"
                  fill="#800020"
                  fillOpacity="0.12"
                  stroke="none"
                />
                <circle
                  cx="68"
                  cy="30"
                  r="2"
                  fill="#800020"
                  fillOpacity="0.12"
                  stroke="none"
                />
              </g>
            </pattern>
            <radialGradient id="tibetan-glow" cx="50%" cy="15%" r="50%">
              <stop offset="0%" stopColor="#800020" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#800020" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#tibetan-glow)" />
          <rect width="100%" height="100%" fill="url(#endless-knot)" />
        </svg>
      );

    case "marathi":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="marathi-glow" cx="50%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#FF6600" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#FF6600" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="marathi-rangoli"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              {/* Rangoli lotus pattern */}
              <g
                transform="translate(50,50)"
                fill="none"
                stroke="#FF6600"
                strokeWidth="0.8"
                strokeOpacity="0.18"
              >
                {/* Outer petals (8 lotus petals) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <path
                    key={`outer-${angle}`}
                    d={`M0,0 Q${Math.sin(((angle + 22.5) * Math.PI) / 180) * 24},${-Math.cos(((angle + 22.5) * Math.PI) / 180) * 24} ${Math.sin((angle * Math.PI) / 180) * 34},${-Math.cos((angle * Math.PI) / 180) * 34} Q${Math.sin(((angle - 22.5) * Math.PI) / 180) * 24},${-Math.cos(((angle - 22.5) * Math.PI) / 180) * 24} 0,0`}
                    strokeOpacity="0.14"
                  />
                ))}
                {/* Inner petals (8 small lotus petals) */}
                {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
                  (angle) => (
                    <path
                      key={`inner-${angle}`}
                      d={`M0,0 Q${Math.sin(((angle + 15) * Math.PI) / 180) * 12},${-Math.cos(((angle + 15) * Math.PI) / 180) * 12} ${Math.sin((angle * Math.PI) / 180) * 18},${-Math.cos((angle * Math.PI) / 180) * 18} Q${Math.sin(((angle - 15) * Math.PI) / 180) * 12},${-Math.cos(((angle - 15) * Math.PI) / 180) * 12} 0,0`}
                      strokeOpacity="0.12"
                    />
                  ),
                )}
                {/* Decorative concentric circles */}
                <circle r="8" strokeOpacity="0.2" />
                <circle r="20" strokeOpacity="0.1" strokeDasharray="2 3" />
                <circle r="36" strokeOpacity="0.08" strokeDasharray="3 5" />
                <circle r="44" strokeOpacity="0.06" strokeDasharray="1 4" />
                {/* Dot accents at compass points */}
                {[0, 90, 180, 270].map((angle) => (
                  <circle
                    key={`dot-${angle}`}
                    cx={Math.sin((angle * Math.PI) / 180) * 36}
                    cy={-Math.cos((angle * Math.PI) / 180) * 36}
                    r="2"
                    fill="#FF6600"
                    fillOpacity="0.15"
                    stroke="none"
                  />
                ))}
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marathi-glow)" />
          <rect width="100%" height="100%" fill="url(#marathi-rangoli)" />
        </svg>
      );

    case "french":
      return (
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="french-glow" cx="50%" cy="10%" r="55%">
              <stop offset="0%" stopColor="#002395" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#002395" stopOpacity="0" />
            </radialGradient>
            <pattern
              id="french-fleur"
              x="0"
              y="0"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              {/* Fleur-de-lis symbol */}
              <g
                transform="translate(36,36)"
                fill="none"
                stroke="#002395"
                strokeWidth="0.8"
                strokeOpacity="0.2"
              >
                {/* Central upright petal */}
                <path d="M0,-20 Q6,-12 4,-4 Q0,0 -4,-4 Q-6,-12 0,-20Z" />
                {/* Left petal */}
                <path d="M-16,-4 Q-10,-8 -4,-4 Q-8,2 -14,4 Q-18,-2 -16,-4Z" />
                {/* Right petal */}
                <path d="M16,-4 Q10,-8 4,-4 Q8,2 14,4 Q18,-2 16,-4Z" />
                {/* Horizontal band */}
                <rect x="-14" y="2" width="28" height="3" rx="1" />
                {/* Lower stem */}
                <path d="M-4,5 Q-8,14 -6,20 Q0,16 6,20 Q8,14 4,5Z" />
                {/* Top bud */}
                <circle cx="0" cy="-20" r="2.5" strokeOpacity="0.18" />
                {/* Connecting curves */}
                <path d="M-4,-4 Q-2,2 0,4 Q2,2 4,-4" strokeOpacity="0.12" />
              </g>
            </pattern>
            <linearGradient id="french-tricolor" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#002395" stopOpacity="0.06" />
              <stop offset="33%" stopColor="#002395" stopOpacity="0.02" />
              <stop offset="33%" stopColor="#FFFFFF" stopOpacity="0.04" />
              <stop offset="66%" stopColor="#FFFFFF" stopOpacity="0.02" />
              <stop offset="66%" stopColor="#ED2939" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#ED2939" stopOpacity="0.06" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#french-glow)" />
          <rect width="100%" height="100%" fill="url(#french-tricolor)" />
          <rect width="100%" height="100%" fill="url(#french-fleur)" />
        </svg>
      );

    default:
      return null;
  }
}

interface CalendarViewProps {
  entry: CalendarEntry;
  onReadArticle?: () => void;
}

export function CalendarView({ entry, onReadArticle }: CalendarViewProps) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [direction, setDirection] = useState<1 | -1>(1);

  const config = CALENDAR_CONFIG[entry.id];
  const isRTL = config?.isRTL ?? false;

  const monthInfo = useMemo(
    () => getMonthInfo(entry.id, viewDate),
    [entry.id, viewDate],
  );
  const weekDays = useMemo(() => getWeekDayNames(entry.id), [entry.id]);
  const days = useMemo(
    () => buildMonthGrid(entry.id, viewDate),
    [entry.id, viewDate],
  );

  // Current date info for header
  const currentDateInfo = useMemo(
    () => getMonthInfo(entry.id, new Date()),
    [entry.id],
  );

  // Collect holidays for this month (deduplicated by name)
  const monthHolidays = useMemo(() => {
    const seen = new Set<string>();
    const result: Array<{ day: DayInfo; holiday: HolidayInfo }> = [];
    for (const day of days) {
      if (!day.isCurrentMonth) continue;
      for (const holiday of day.holidays) {
        const key = `${holiday.name}-${day.gregorianDay}`;
        if (!seen.has(key)) {
          seen.add(key);
          result.push({ day, holiday });
        }
      }
    }
    return result;
  }, [days]);

  function handlePrev() {
    setDirection(-1);
    setViewDate((d) => navigateMonth(d, -1));
  }

  function handleNext() {
    setDirection(1);
    setViewDate((d) => navigateMonth(d, 1));
  }

  function handleToday() {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    setViewDate(d);
  }

  const monthKey = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${entry.id}`;

  const tintColor = CALENDAR_TINTS[entry.id] ?? "#888888";

  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-full flex flex-col overflow-hidden relative">
        {/* Cultural background decoration */}
        <CalendarBackground id={entry.id} />

        {/* Calendar Header */}
        <div
          className="px-6 py-5 border-b border-border flex-shrink-0 relative"
          style={{ backgroundColor: `${tintColor}14` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className={cn("flex-1 min-w-0", isRTL ? "rtl-text" : "")}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{config?.emoji ?? "📅"}</span>
                <div>
                  <h1 className="font-display text-2xl font-semibold text-foreground leading-tight">
                    {entry.displayName}
                  </h1>
                  <p
                    className={cn(
                      "native-script text-primary font-medium text-base",
                      isRTL ? "rtl-text" : "",
                    )}
                  >
                    {entry.nativeName}
                  </p>
                </div>
              </div>
              {entry.description && (
                <p className="text-sm text-muted-foreground mt-1 max-w-lg leading-relaxed">
                  {entry.description}
                </p>
              )}
              {/* Read History button — only for Gregorian */}
              {entry.id === "gregorian" && onReadArticle && (
                <Button
                  data-ocid="gregorian_article.open_modal_button"
                  variant="outline"
                  size="sm"
                  onClick={onReadArticle}
                  className="mt-3 gap-1.5 text-xs font-ui font-semibold border-border/60 hover:bg-accent hover:border-primary/40 hover:text-primary transition-all duration-150"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read History
                </Button>
              )}
            </div>

            {/* Today's date in this calendar */}
            <div className="flex-shrink-0 bg-accent rounded-xl px-4 py-3 text-right border border-border">
              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                <MapPin className="w-3 h-3" />
                Today
              </div>
              <div
                className={cn(
                  "native-script text-primary font-semibold text-sm leading-tight",
                  isRTL ? "rtl-text" : "",
                )}
              >
                {currentDateInfo.eraName && (
                  <span className="text-xs text-muted-foreground block">
                    {currentDateInfo.eraName}
                  </span>
                )}
                {currentDateInfo.monthName} {currentDateInfo.yearName}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Row */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-border/50 flex-shrink-0 bg-card/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>

          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={monthKey}
                initial={{ opacity: 0, y: direction > 0 ? 8 : -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction > 0 ? -8 : 8 }}
                transition={{ duration: 0.2 }}
                className={cn("text-center", isRTL ? "rtl-text" : "")}
              >
                {monthInfo.eraName && (
                  <div className="text-xs text-muted-foreground">
                    {monthInfo.eraName}
                  </div>
                )}
                <div className="native-script font-display text-xl font-semibold text-foreground">
                  {monthInfo.monthName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {monthInfo.yearName}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToday}
              className="gap-1 text-muted-foreground hover:text-foreground border-border/50"
            >
              <Calendar className="w-3.5 h-3.5" />
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="gap-1 text-muted-foreground hover:text-foreground"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Week day headers */}
        <div className="px-4 pt-3 pb-1 flex-shrink-0">
          <div className="calendar-grid">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-ui font-semibold text-muted-foreground uppercase tracking-wider py-1"
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Month Grid + Holidays List */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={monthKey}
              initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="calendar-grid"
            >
              {days.map((day, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: calendar grid cells are positional
                <DayCell key={i} day={day} isRTL={isRTL} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Monthly Holidays & Festivals Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`holidays-${monthKey}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <PartyPopper className="w-4 h-4 text-primary" />
                <h2 className="font-ui font-semibold text-sm text-foreground uppercase tracking-wider">
                  Holidays & Festivals This Month
                </h2>
                {monthHolidays.length > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-full">
                    {monthHolidays.length}
                  </span>
                )}
              </div>

              {monthHolidays.length === 0 ? (
                <p className="text-sm text-muted-foreground/50 italic py-3 text-center">
                  No holidays recorded this month
                </p>
              ) : (
                <div className="space-y-2">
                  {monthHolidays.map(({ day, holiday }, idx) => (
                    <motion.div
                      // biome-ignore lint/suspicious/noArrayIndexKey: holiday list items are positional
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-card/40 border border-border/40 hover:border-border/70 hover:bg-card/60 transition-all duration-150"
                    >
                      {/* Colored dot */}
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            holiday.color,
                          )}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <span className="font-ui font-semibold text-sm text-foreground">
                              {holiday.name}
                            </span>
                            {holiday.nativeName && (
                              <span className="ml-2 text-xs text-muted-foreground native-script">
                                {holiday.nativeName}
                              </span>
                            )}
                          </div>
                          <span className="flex-shrink-0 text-xs text-muted-foreground/60 bg-muted/30 px-1.5 py-0.5 rounded font-mono">
                            {viewDate.toLocaleString("en", { month: "short" })}{" "}
                            {day.gregorianDay}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {holiday.description}
                        </p>
                        <span
                          className={cn(
                            "inline-block mt-1 text-[10px] font-ui font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-sm",
                            holiday.type === "religious" &&
                              "bg-amber-500/10 text-amber-400",
                            holiday.type === "public" &&
                              "bg-blue-500/10 text-blue-400",
                            holiday.type === "cultural" &&
                              "bg-purple-500/10 text-purple-400",
                            holiday.type === "traditional" &&
                              "bg-emerald-500/10 text-emerald-400",
                          )}
                        >
                          {holiday.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  );
}

interface DayCellProps {
  day: DayInfo;
  isRTL: boolean;
}

function DayCell({ day, isRTL }: DayCellProps) {
  const hasHolidays = day.holidays.length > 0;
  const visibleDots = day.holidays.slice(0, 3);

  const cell = (
    <div
      className={cn(
        "day-cell min-h-[52px] rounded-md relative p-1",
        day.isToday && "today",
        !day.isCurrentMonth && "opacity-30",
        !day.isToday && day.isCurrentMonth && hasHolidays && "bg-primary/5",
        !day.isToday && day.isCurrentMonth && !hasHolidays && "hover:bg-accent",
        !day.isToday &&
          day.isCurrentMonth &&
          hasHolidays &&
          "hover:bg-primary/10",
      )}
    >
      <div className="flex flex-col items-center justify-center h-full gap-0.5">
        {/* Calendar day number (native) */}
        <span
          className={cn(
            "native-script leading-none font-semibold",
            day.isToday
              ? "text-lg text-today-fg"
              : day.isCurrentMonth
                ? "text-base text-foreground"
                : "text-sm text-muted-foreground",
            isRTL && "rtl-text",
          )}
        >
          {day.calendarDay}
        </span>

        {/* Gregorian day (small, secondary) */}
        <span
          className={cn(
            "text-[10px] leading-none",
            day.isToday ? "text-today-fg/70" : "text-muted-foreground/50",
          )}
        >
          {day.gregorianDay}
        </span>

        {/* Holiday dots */}
        {hasHolidays && day.isCurrentMonth && (
          <div className="flex items-center gap-0.5 mt-0.5">
            {visibleDots.map((h, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: dots are positional
                key={i}
                className={cn("w-1 h-1 rounded-full flex-shrink-0", h.color)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Today indicator dot */}
      {day.isToday && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-today-fg/60" />
      )}
    </div>
  );

  if (!hasHolidays || !day.isCurrentMonth) {
    return cell;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{cell}</TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[220px] p-0 overflow-hidden border border-border bg-popover"
      >
        <div className="p-2 space-y-2">
          {day.holidays.map((h, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: tooltip items are positional
            <div key={i} className="flex items-start gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0 mt-0.5",
                  h.color,
                )}
              />
              <div>
                <p className="text-xs font-semibold text-popover-foreground leading-tight">
                  {h.name}
                </p>
                {h.nativeName && (
                  <p className="text-[10px] text-muted-foreground native-script leading-tight">
                    {h.nativeName}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                  {h.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
