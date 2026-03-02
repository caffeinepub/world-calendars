export interface HolidayInfo {
  name: string;
  nativeName?: string;
  description: string;
  type: "public" | "religious" | "cultural" | "traditional";
  color: string; // Tailwind bg color class
}

interface HolidayEntry {
  month: number; // Gregorian month (1-12)
  day: number; // Gregorian day
  holiday: HolidayInfo;
}

// Key: calendarId, Value: array of holiday entries keyed by Gregorian date
export const HOLIDAYS: Record<string, HolidayEntry[]> = {
  gregorian: [
    {
      month: 1,
      day: 1,
      holiday: {
        name: "New Year's Day",
        nativeName: "January 1st",
        description:
          "The first day of the Gregorian calendar year, celebrated worldwide with fireworks and festivities.",
        type: "public",
        color: "bg-yellow-400",
      },
    },
    {
      month: 2,
      day: 14,
      holiday: {
        name: "Valentine's Day",
        nativeName: "Saint Valentine's Day",
        description:
          "A celebration of love and romance observed around the world with gifts, cards, and gestures of affection.",
        type: "cultural",
        color: "bg-rose-500",
      },
    },
    {
      month: 3,
      day: 8,
      holiday: {
        name: "International Women's Day",
        description:
          "A global day celebrating the social, economic, cultural, and political achievements of women.",
        type: "public",
        color: "bg-purple-500",
      },
    },
    {
      month: 4,
      day: 22,
      holiday: {
        name: "Earth Day",
        description:
          "An annual event dedicated to raising awareness about environmental protection and sustainability.",
        type: "cultural",
        color: "bg-green-500",
      },
    },
    {
      month: 5,
      day: 1,
      holiday: {
        name: "International Labor Day",
        nativeName: "May Day",
        description:
          "A global celebration of workers' rights and the labor movement's achievements.",
        type: "public",
        color: "bg-red-500",
      },
    },
    {
      month: 6,
      day: 5,
      holiday: {
        name: "World Environment Day",
        description:
          "The UN's principal vehicle for encouraging awareness and action for the protection of the environment.",
        type: "cultural",
        color: "bg-emerald-500",
      },
    },
    {
      month: 7,
      day: 30,
      holiday: {
        name: "World Friendship Day",
        description:
          "International Day of Friendship, promoted by the UN to foster bonds between people across cultures.",
        type: "cultural",
        color: "bg-orange-400",
      },
    },
    {
      month: 8,
      day: 12,
      holiday: {
        name: "International Youth Day",
        description:
          "A UN awareness day to highlight issues facing the world's youth and celebrate their positive contributions.",
        type: "public",
        color: "bg-blue-400",
      },
    },
    {
      month: 9,
      day: 21,
      holiday: {
        name: "International Day of Peace",
        nativeName: "World Peace Day",
        description:
          "A day dedicated to world peace, observed through ceasefire and non-violence commitments.",
        type: "public",
        color: "bg-sky-400",
      },
    },
    {
      month: 10,
      day: 31,
      holiday: {
        name: "Halloween",
        nativeName: "All Hallows' Eve",
        description:
          "A cultural celebration involving costumes, trick-or-treating, and spooky festivities, rooted in ancient Celtic traditions.",
        type: "cultural",
        color: "bg-orange-500",
      },
    },
    {
      month: 11,
      day: 11,
      holiday: {
        name: "Remembrance Day",
        nativeName: "Veterans Day",
        description:
          "A memorial day observed to honor armed forces members who have died in the line of duty.",
        type: "public",
        color: "bg-red-700",
      },
    },
    {
      month: 12,
      day: 25,
      holiday: {
        name: "Christmas Day",
        nativeName: "Nativity of Jesus",
        description:
          "The Christian feast day commemorating the birth of Jesus Christ, widely celebrated as a cultural and family holiday.",
        type: "religious",
        color: "bg-red-500",
      },
    },
    {
      month: 12,
      day: 31,
      holiday: {
        name: "New Year's Eve",
        description:
          "The final day of the year, celebrated with countdowns, fireworks, and festivities welcoming the New Year.",
        type: "cultural",
        color: "bg-indigo-400",
      },
    },
  ],

  islamic: [
    {
      month: 1,
      day: 27,
      holiday: {
        name: "Isra and Mi'raj",
        nativeName: "الإسراء والمعراج",
        description:
          "Commemorates the Prophet Muhammad's night journey from Mecca to Jerusalem and ascension to heaven.",
        type: "religious",
        color: "bg-emerald-600",
      },
    },
    {
      month: 3,
      day: 11,
      holiday: {
        name: "Ramadan Start",
        nativeName: "رمضان",
        description:
          "The holy month of fasting, prayer, reflection, and community observed by Muslims worldwide.",
        type: "religious",
        color: "bg-teal-500",
      },
    },
    {
      month: 4,
      day: 5,
      holiday: {
        name: "Laylat al-Qadr",
        nativeName: "ليلة القدر",
        description:
          "The Night of Power — the holiest night in Islam, when the first verses of the Quran were revealed.",
        type: "religious",
        color: "bg-violet-500",
      },
    },
    {
      month: 4,
      day: 10,
      holiday: {
        name: "Eid al-Fitr",
        nativeName: "عيد الفطر",
        description:
          "The Festival of Breaking the Fast marking the end of Ramadan, celebrated with prayers, feasts, and charity.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 6,
      day: 17,
      holiday: {
        name: "Eid al-Adha",
        nativeName: "عيد الأضحى",
        description:
          "The Festival of Sacrifice commemorating Ibrahim's willingness to sacrifice his son, marked with prayers and sharing of meat.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 7,
      day: 7,
      holiday: {
        name: "Islamic New Year",
        nativeName: "رأس السنة الهجرية",
        description:
          "Marks the beginning of the new Islamic Hijri year, commemorating the Prophet's migration from Mecca to Medina.",
        type: "religious",
        color: "bg-cyan-500",
      },
    },
    {
      month: 7,
      day: 16,
      holiday: {
        name: "Day of Ashura",
        nativeName: "عاشوراء",
        description:
          "The 10th day of Muharram, observed by Sunnis as a day of fasting and by Shia Muslims as a day of mourning.",
        type: "religious",
        color: "bg-red-600",
      },
    },
    {
      month: 9,
      day: 15,
      holiday: {
        name: "Mawlid al-Nabi",
        nativeName: "المولد النبوي",
        description:
          "Celebrates the birth of the Prophet Muhammad, observed with prayers, processions, and recitations.",
        type: "religious",
        color: "bg-green-600",
      },
    },
  ],

  hebrew: [
    {
      month: 1,
      day: 25,
      holiday: {
        name: "Tu BiShvat",
        nativeName: 'ט"ו בשבט',
        description:
          "The New Year of the Trees — a Jewish holiday celebrating the ecological New Year for fruit trees.",
        type: "traditional",
        color: "bg-green-500",
      },
    },
    {
      month: 3,
      day: 14,
      holiday: {
        name: "Purim",
        nativeName: "פורים",
        description:
          "A joyous festival celebrating the salvation of the Jewish people in ancient Persia, with costumes and festivities.",
        type: "religious",
        color: "bg-purple-500",
      },
    },
    {
      month: 4,
      day: 13,
      holiday: {
        name: "Passover (Pesach)",
        nativeName: "פֶּסַח",
        description:
          "Commemorates the Exodus of Israelites from Egypt, celebrated with the Seder meal and matzah.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 5,
      day: 1,
      holiday: {
        name: "Yom HaAtzmaut",
        nativeName: "יום העצמאות",
        description:
          "Israel's Independence Day, marking the establishment of the State of Israel in 1948.",
        type: "public",
        color: "bg-blue-500",
      },
    },
    {
      month: 6,
      day: 2,
      holiday: {
        name: "Shavuot",
        nativeName: "שבועות",
        description:
          "The Feast of Weeks, commemorating the giving of the Torah at Mount Sinai and celebrating the harvest.",
        type: "religious",
        color: "bg-yellow-400",
      },
    },
    {
      month: 8,
      day: 5,
      holiday: {
        name: "Tisha B'Av",
        nativeName: "תשעה באב",
        description:
          "A day of mourning commemorating the destruction of the First and Second Temples in Jerusalem.",
        type: "religious",
        color: "bg-slate-500",
      },
    },
    {
      month: 10,
      day: 3,
      holiday: {
        name: "Rosh Hashanah",
        nativeName: "ראש השנה",
        description:
          "The Jewish New Year, marking the creation of the world and a time of reflection and repentance.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 10,
      day: 12,
      holiday: {
        name: "Yom Kippur",
        nativeName: "יום כיפור",
        description:
          "The Day of Atonement — the holiest day in Judaism, observed with fasting and prayer.",
        type: "religious",
        color: "bg-white",
      },
    },
    {
      month: 10,
      day: 17,
      holiday: {
        name: "Sukkot",
        nativeName: "סוכות",
        description:
          "The Feast of Tabernacles, a week-long harvest festival during which Jews dwell in temporary huts (sukkot).",
        type: "religious",
        color: "bg-orange-400",
      },
    },
    {
      month: 10,
      day: 24,
      holiday: {
        name: "Simchat Torah",
        nativeName: "שמחת תורה",
        description:
          "Celebrates the completion and restart of the annual Torah reading cycle with joyous dancing and singing.",
        type: "religious",
        color: "bg-indigo-500",
      },
    },
    {
      month: 12,
      day: 26,
      holiday: {
        name: "Hanukkah",
        nativeName: "חֲנוּכָּה",
        description:
          "The Festival of Lights, celebrating the rededication of the Temple in Jerusalem with the lighting of the menorah.",
        type: "religious",
        color: "bg-blue-400",
      },
    },
  ],

  chinese: [
    {
      month: 1,
      day: 28,
      holiday: {
        name: "Spring Festival Eve",
        nativeName: "除夕",
        description:
          "New Year's Eve dinner, the most important family reunion meal of the Chinese calendar year.",
        type: "traditional",
        color: "bg-red-500",
      },
    },
    {
      month: 1,
      day: 29,
      holiday: {
        name: "Chinese New Year",
        nativeName: "春节",
        description:
          "The most important Chinese festival, celebrating the new lunar year with fireworks, dragon dances, and family reunions.",
        type: "public",
        color: "bg-red-600",
      },
    },
    {
      month: 2,
      day: 12,
      holiday: {
        name: "Lantern Festival",
        nativeName: "元宵节",
        description:
          "Marks the end of the Chinese New Year celebrations with lantern displays, riddle games, and tangyuan.",
        type: "traditional",
        color: "bg-yellow-400",
      },
    },
    {
      month: 4,
      day: 5,
      holiday: {
        name: "Qingming Festival",
        nativeName: "清明节",
        description:
          "A time to honor ancestors by cleaning graves, making offerings, and participating in spring outings.",
        type: "traditional",
        color: "bg-green-500",
      },
    },
    {
      month: 6,
      day: 10,
      holiday: {
        name: "Dragon Boat Festival",
        nativeName: "端午节",
        description:
          "Celebrates the poet Qu Yuan with dragon boat races and the eating of sticky rice dumplings (zongzi).",
        type: "public",
        color: "bg-cyan-500",
      },
    },
    {
      month: 8,
      day: 6,
      holiday: {
        name: "Qixi Festival",
        nativeName: "七夕节",
        description:
          "The Chinese Valentine's Day, celebrating the annual reunion of the cowherd and weaver girl in the Milky Way.",
        type: "traditional",
        color: "bg-pink-500",
      },
    },
    {
      month: 9,
      day: 17,
      holiday: {
        name: "Mid-Autumn Festival",
        nativeName: "中秋节",
        description:
          "A harvest festival celebrated with mooncakes, lanterns, and family gatherings under the full moon.",
        type: "public",
        color: "bg-amber-400",
      },
    },
    {
      month: 10,
      day: 11,
      holiday: {
        name: "Double Ninth Festival",
        nativeName: "重阳节",
        description:
          "Also known as Chongyang Festival, a day to honor the elderly and climb mountains for good health.",
        type: "traditional",
        color: "bg-orange-400",
      },
    },
    {
      month: 12,
      day: 22,
      holiday: {
        name: "Winter Solstice",
        nativeName: "冬至",
        description:
          "An important Chinese festival marking the winter solstice, celebrated with family meals of tangyuan and dumplings.",
        type: "traditional",
        color: "bg-indigo-400",
      },
    },
  ],

  persian: [
    {
      month: 2,
      day: 1,
      holiday: {
        name: "Sadeh",
        nativeName: "جشن سده",
        description:
          "An ancient Zoroastrian festival marking 50 days before the Persian New Year, celebrated by lighting bonfires.",
        type: "traditional",
        color: "bg-orange-500",
      },
    },
    {
      month: 3,
      day: 18,
      holiday: {
        name: "Chaharshanbeh Suri",
        nativeName: "چهارشنبه‌سوری",
        description:
          "Festival of Fire — a Persian pre-New Year celebration involving jumping over bonfires on the last Tuesday evening.",
        type: "traditional",
        color: "bg-red-500",
      },
    },
    {
      month: 3,
      day: 20,
      holiday: {
        name: "Nowruz",
        nativeName: "نوروز",
        description:
          "The Persian New Year marking the spring equinox, the most important celebration in Iranian culture.",
        type: "public",
        color: "bg-emerald-500",
      },
    },
    {
      month: 3,
      day: 21,
      holiday: {
        name: "Eid-e-Nowruz",
        nativeName: "عید نوروز",
        description:
          "The first day of the Persian New Year, a public holiday celebrated across Iran, Afghanistan, and Central Asia.",
        type: "public",
        color: "bg-green-500",
      },
    },
    {
      month: 4,
      day: 1,
      holiday: {
        name: "Sizdah Bedar",
        nativeName: "سیزده‌به‌در",
        description:
          "Nature Day — the 13th day of Nowruz when Iranians head outdoors for picnics to ward off bad luck.",
        type: "traditional",
        color: "bg-lime-500",
      },
    },
    {
      month: 7,
      day: 1,
      holiday: {
        name: "Tirgan",
        nativeName: "جشن تیرگان",
        description:
          "An ancient Iranian water festival celebrating rain and abundance, observed with water games and traditional foods.",
        type: "traditional",
        color: "bg-blue-400",
      },
    },
    {
      month: 10,
      day: 2,
      holiday: {
        name: "Mehregan",
        nativeName: "جشن مهرگان",
        description:
          "The Persian Festival of Autumn celebrating Mithra, the god of love and friendship, with feasting and music.",
        type: "traditional",
        color: "bg-amber-500",
      },
    },
    {
      month: 12,
      day: 21,
      holiday: {
        name: "Yalda Night",
        nativeName: "شب یلدا",
        description:
          "The longest night of the year — families stay up all night reading Hafez poetry, eating pomegranates and watermelon.",
        type: "traditional",
        color: "bg-red-700",
      },
    },
  ],

  ethiopian: [
    {
      month: 1,
      day: 7,
      holiday: {
        name: "Ethiopian Christmas (Genna)",
        nativeName: "ጌና",
        description:
          "Ethiopian Orthodox Christmas celebrated on January 7th with early morning church services and traditional games.",
        type: "religious",
        color: "bg-red-500",
      },
    },
    {
      month: 1,
      day: 19,
      holiday: {
        name: "Timkat (Epiphany)",
        nativeName: "ጥምቀት",
        description:
          "Ethiopian Orthodox Epiphany celebrating the baptism of Jesus, featuring colorful processions to bodies of water.",
        type: "religious",
        color: "bg-blue-500",
      },
    },
    {
      month: 3,
      day: 2,
      holiday: {
        name: "Adwa Victory Day",
        nativeName: "የዓድዋ ድል",
        description:
          "Celebrates Ethiopia's victory over Italian forces at the Battle of Adwa in 1896, a symbol of African independence.",
        type: "public",
        color: "bg-green-600",
      },
    },
    {
      month: 4,
      day: 10,
      holiday: {
        name: "Eid al-Fitr",
        nativeName: "ኢድ አልፈጥር",
        description:
          "End of Ramadan celebration, widely observed by the Muslim community in Ethiopia.",
        type: "religious",
        color: "bg-teal-500",
      },
    },
    {
      month: 4,
      day: 20,
      holiday: {
        name: "Fasika (Ethiopian Easter)",
        nativeName: "ፋሲካ",
        description:
          "The most important holiday in the Ethiopian Orthodox calendar, marking Christ's resurrection after 55 days of fasting.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 8,
      day: 19,
      holiday: {
        name: "Buhe",
        nativeName: "ቡሄ",
        description:
          "A pre-Transfiguration celebration where boys sing traditional songs door-to-door and receive bread and candles.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 9,
      day: 11,
      holiday: {
        name: "Ethiopian New Year (Enkutatash)",
        nativeName: "እንቁጣጣሽ",
        description:
          "The Ethiopian and Eritrean New Year marking the end of rainy season, celebrated with flowers, songs, and church services.",
        type: "public",
        color: "bg-yellow-400",
      },
    },
    {
      month: 9,
      day: 27,
      holiday: {
        name: "Meskel",
        nativeName: "መስቀል",
        description:
          "Finding of the True Cross — a major Ethiopian Orthodox festival with the burning of the Demera bonfire.",
        type: "religious",
        color: "bg-orange-500",
      },
    },
  ],

  coptic: [
    {
      month: 1,
      day: 7,
      holiday: {
        name: "Coptic Christmas",
        nativeName: "ليلة الميلاد المجيد",
        description:
          "Coptic Orthodox Christmas celebrated on January 7th, with midnight mass and fasting broken with a festive meal.",
        type: "religious",
        color: "bg-red-500",
      },
    },
    {
      month: 1,
      day: 19,
      holiday: {
        name: "Coptic Epiphany (Timket)",
        nativeName: "عيد الغطاس",
        description:
          "The Feast of Theophany commemorating the baptism of Jesus in the Jordan River.",
        type: "religious",
        color: "bg-blue-400",
      },
    },
    {
      month: 4,
      day: 13,
      holiday: {
        name: "Coptic Palm Sunday",
        nativeName: "أحد الشعانين",
        description:
          "Marks Jesus's triumphal entry into Jerusalem, celebrated by Coptic Christians with palm branches and church processions.",
        type: "religious",
        color: "bg-green-500",
      },
    },
    {
      month: 4,
      day: 20,
      holiday: {
        name: "Coptic Easter",
        nativeName: "عيد القيامة",
        description:
          "The most significant feast in the Coptic Orthodox calendar, preceded by 55 days of fasting.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 4,
      day: 25,
      holiday: {
        name: "Feast of St. Mark",
        nativeName: "عيد القديس مرقس",
        description:
          "Commemorates the martyrdom and ministry of Saint Mark, founder of the Coptic Church in Alexandria.",
        type: "religious",
        color: "bg-purple-500",
      },
    },
    {
      month: 8,
      day: 22,
      holiday: {
        name: "Feast of the Assumption",
        nativeName: "عيد انتقال السيدة العذراء",
        description:
          "Celebrates the assumption of the Virgin Mary into heaven, a major feast in the Coptic Orthodox Church.",
        type: "religious",
        color: "bg-blue-300",
      },
    },
    {
      month: 9,
      day: 11,
      holiday: {
        name: "Coptic New Year (Nayrouz)",
        nativeName: "نيروز",
        description:
          "The Coptic New Year marking the start of the Coptic calendar and a day commemorating Christian martyrs.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 9,
      day: 27,
      holiday: {
        name: "Feast of the Cross",
        nativeName: "عيد الصليب",
        description:
          "Commemorates the discovery of the True Cross by Saint Helena, celebrated with church services and bonfires.",
        type: "religious",
        color: "bg-orange-500",
      },
    },
  ],

  hindu: [
    {
      month: 1,
      day: 14,
      holiday: {
        name: "Makar Sankranti",
        nativeName: "मकर संक्रांति",
        description:
          "Harvest festival marking the sun's transition into Capricorn, celebrated with kite-flying and sesame sweets.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 3,
      day: 8,
      holiday: {
        name: "Maha Shivratri",
        nativeName: "महाशिवरात्रि",
        description:
          "The Great Night of Shiva — a major Hindu festival honoring Lord Shiva observed with fasting and all-night vigils.",
        type: "religious",
        color: "bg-indigo-500",
      },
    },
    {
      month: 3,
      day: 14,
      holiday: {
        name: "Holi",
        nativeName: "होली",
        description:
          "The Festival of Colors celebrating the arrival of spring, victory of good over evil, and the legend of Prahlad.",
        type: "religious",
        color: "bg-pink-500",
      },
    },
    {
      month: 4,
      day: 17,
      holiday: {
        name: "Ram Navami",
        nativeName: "राम नवमी",
        description:
          "Celebrates the birth of Lord Rama, seventh avatar of Vishnu and the hero of the epic Ramayana.",
        type: "religious",
        color: "bg-orange-500",
      },
    },
    {
      month: 4,
      day: 23,
      holiday: {
        name: "Hanuman Jayanti",
        nativeName: "हनुमान जयंती",
        description:
          "Marks the birth of Lord Hanuman, the divine monkey warrior and devoted companion of Lord Rama.",
        type: "religious",
        color: "bg-red-500",
      },
    },
    {
      month: 8,
      day: 19,
      holiday: {
        name: "Raksha Bandhan",
        nativeName: "रक्षा बन्धन",
        description:
          "Celebrates the bond between brothers and sisters, with sisters tying a sacred thread (rakhi) on their brother's wrist.",
        type: "traditional",
        color: "bg-yellow-400",
      },
    },
    {
      month: 8,
      day: 26,
      holiday: {
        name: "Janmashtami",
        nativeName: "जन्माष्टमी",
        description:
          "Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu, with midnight prayers and fasting.",
        type: "religious",
        color: "bg-blue-500",
      },
    },
    {
      month: 9,
      day: 7,
      holiday: {
        name: "Ganesh Chaturthi",
        nativeName: "गणेश चतुर्थी",
        description:
          "Celebrates the birth of Lord Ganesha, the elephant-headed god of beginnings and remover of obstacles.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 10,
      day: 3,
      holiday: {
        name: "Navaratri",
        nativeName: "नवरात्रि",
        description:
          "Nine nights of worship dedicated to the goddess Durga, featuring fasting, dance (Garba), and divine music.",
        type: "religious",
        color: "bg-red-600",
      },
    },
    {
      month: 10,
      day: 12,
      holiday: {
        name: "Dussehra",
        nativeName: "दशहरा",
        description:
          "Celebrates the victory of Lord Rama over Ravana, symbolizing the triumph of good over evil.",
        type: "religious",
        color: "bg-orange-600",
      },
    },
    {
      month: 11,
      day: 1,
      holiday: {
        name: "Diwali",
        nativeName: "दीपावली",
        description:
          "The Festival of Lights — the most popular Hindu festival, celebrating the victory of light over darkness with oil lamps and fireworks.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 11,
      day: 8,
      holiday: {
        name: "Chhath Puja",
        nativeName: "छठ पूजा",
        description:
          "An ancient Hindu festival dedicated to the sun god Surya, observed with rigorous fasting and ritual bathing in rivers.",
        type: "religious",
        color: "bg-amber-600",
      },
    },
  ],

  buddhist: [
    {
      month: 2,
      day: 12,
      holiday: {
        name: "Makha Bucha",
        nativeName: "มาฆบูชา",
        description:
          "Commemorates a spontaneous gathering of 1,250 monks in the presence of the Buddha, marked by candlelit processions.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 4,
      day: 13,
      holiday: {
        name: "Songkran (Thai New Year)",
        nativeName: "สงกรานต์",
        description:
          "The Thai New Year water festival — a joyous celebration symbolizing purification and the washing away of bad luck.",
        type: "public",
        color: "bg-blue-400",
      },
    },
    {
      month: 5,
      day: 13,
      holiday: {
        name: "Visakha Bucha",
        nativeName: "วิสาขบูชา",
        description:
          "The most sacred day in Buddhism, commemorating the birth, enlightenment, and passing of the Buddha.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 7,
      day: 10,
      holiday: {
        name: "Asalha Bucha",
        nativeName: "อาสาฬหบูชา",
        description:
          "Commemorates the Buddha's first sermon (Dhammacakkappavattana Sutta) to his first five disciples.",
        type: "religious",
        color: "bg-orange-400",
      },
    },
    {
      month: 7,
      day: 11,
      holiday: {
        name: "Khao Phansa (Buddhist Lent begins)",
        nativeName: "เข้าพรรษา",
        description:
          "The start of Buddhist Lent — a three-month period of retreat during the rainy season when monks remain in their temples.",
        type: "religious",
        color: "bg-teal-500",
      },
    },
    {
      month: 10,
      day: 7,
      holiday: {
        name: "Ok Phansa (End of Buddhist Lent)",
        nativeName: "ออกพรรษา",
        description:
          "Marks the end of the Buddhist Lent period, celebrated with offerings to monks and boat races.",
        type: "religious",
        color: "bg-emerald-500",
      },
    },
    {
      month: 10,
      day: 8,
      holiday: {
        name: "Kathin Ceremony",
        nativeName: "กฐิน",
        description:
          "A one-month period after Ok Phansa when laypeople offer robes and necessities to Buddhist monks.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 11,
      day: 15,
      holiday: {
        name: "Loy Krathong",
        nativeName: "ลอยกระทง",
        description:
          "The Festival of Light — people float decorated baskets (krathong) on waterways to honor the water goddess.",
        type: "traditional",
        color: "bg-yellow-400",
      },
    },
  ],

  japanese: [
    {
      month: 1,
      day: 1,
      holiday: {
        name: "New Year (Oshogatsu)",
        nativeName: "お正月",
        description:
          "The most important Japanese holiday, celebrated with family gatherings, shrine visits, and traditional foods.",
        type: "public",
        color: "bg-red-500",
      },
    },
    {
      month: 1,
      day: 13,
      holiday: {
        name: "Coming of Age Day",
        nativeName: "成人の日",
        description:
          "Honors young people who have turned 20, with ceremonies and traditional formal wear (furisode and hakama).",
        type: "public",
        color: "bg-purple-500",
      },
    },
    {
      month: 2,
      day: 11,
      holiday: {
        name: "National Foundation Day",
        nativeName: "建国記念の日",
        description:
          "Commemorates the founding of Japan and the accession of its first Emperor, Jimmu.",
        type: "public",
        color: "bg-red-400",
      },
    },
    {
      month: 2,
      day: 23,
      holiday: {
        name: "Emperor's Birthday",
        nativeName: "天皇誕生日",
        description:
          "A national holiday celebrating the birthday of Emperor Naruhito of Japan.",
        type: "public",
        color: "bg-amber-500",
      },
    },
    {
      month: 3,
      day: 3,
      holiday: {
        name: "Hinamatsuri (Doll's Festival)",
        nativeName: "ひな祭り",
        description:
          "Girls' Day — families display ornamental dolls representing the Emperor's court to pray for girls' health and happiness.",
        type: "traditional",
        color: "bg-pink-400",
      },
    },
    {
      month: 4,
      day: 29,
      holiday: {
        name: "Golden Week begins (Showa Day)",
        nativeName: "ゴールデンウィーク",
        description:
          "The start of Japan's Golden Week — a series of four national holidays where most businesses close for vacation.",
        type: "public",
        color: "bg-yellow-400",
      },
    },
    {
      month: 5,
      day: 5,
      holiday: {
        name: "Children's Day",
        nativeName: "こどもの日",
        description:
          "A national holiday celebrating children's happiness and respecting their personalities, featuring carp-shaped koinobori streamers.",
        type: "public",
        color: "bg-cyan-500",
      },
    },
    {
      month: 7,
      day: 7,
      holiday: {
        name: "Tanabata",
        nativeName: "七夕",
        description:
          "The Star Festival based on the legend of two stars (Vega and Altair) meeting once a year across the Milky Way.",
        type: "traditional",
        color: "bg-indigo-500",
      },
    },
    {
      month: 8,
      day: 13,
      holiday: {
        name: "Obon",
        nativeName: "お盆",
        description:
          "A Buddhist custom honoring the spirits of ancestors with lanterns, dances (Bon Odori), and family reunions.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 9,
      day: 15,
      holiday: {
        name: "Respect for the Aged Day",
        nativeName: "敬老の日",
        description:
          "A national holiday in Japan to honor elderly citizens and appreciate their contributions to society.",
        type: "public",
        color: "bg-teal-500",
      },
    },
    {
      month: 10,
      day: 14,
      holiday: {
        name: "Sports Day",
        nativeName: "スポーツの日",
        description:
          "A national holiday celebrating sports and physical activity, originally commemorating the 1964 Tokyo Olympics.",
        type: "public",
        color: "bg-orange-500",
      },
    },
    {
      month: 11,
      day: 3,
      holiday: {
        name: "Culture Day",
        nativeName: "文化の日",
        description:
          "Promotes culture and the arts in Japan, with ceremonies at the Imperial Palace and exhibitions across the country.",
        type: "public",
        color: "bg-purple-400",
      },
    },
    {
      month: 11,
      day: 15,
      holiday: {
        name: "Shichi-Go-San",
        nativeName: "七五三",
        description:
          "A traditional rite of passage for children aged 3, 5, and 7, celebrated at Shinto shrines with prayers for health.",
        type: "traditional",
        color: "bg-pink-500",
      },
    },
  ],

  korean: [
    {
      month: 1,
      day: 29,
      holiday: {
        name: "Seollal (Korean New Year)",
        nativeName: "설날",
        description:
          "The Korean Lunar New Year, the most important traditional holiday, celebrated with ancestral rites and family gatherings.",
        type: "public",
        color: "bg-red-500",
      },
    },
    {
      month: 3,
      day: 1,
      holiday: {
        name: "Independence Movement Day",
        nativeName: "삼일절",
        description:
          "Commemorates the March 1st Movement of 1919, when Koreans peacefully protested Japanese colonial rule.",
        type: "public",
        color: "bg-blue-500",
      },
    },
    {
      month: 5,
      day: 5,
      holiday: {
        name: "Children's Day",
        nativeName: "어린이날",
        description:
          "A national holiday in South Korea dedicated to children's happiness, with outings and gift-giving.",
        type: "public",
        color: "bg-yellow-400",
      },
    },
    {
      month: 5,
      day: 5,
      holiday: {
        name: "Buddha's Birthday",
        nativeName: "부처님오신날",
        description:
          "Celebrates the birth of Siddhartha Gautama with temple lantern festivals and lotus lantern parades.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 6,
      day: 6,
      holiday: {
        name: "Memorial Day",
        nativeName: "현충일",
        description:
          "Honors the soldiers and civilians who sacrificed their lives for South Korea's independence and protection.",
        type: "public",
        color: "bg-slate-500",
      },
    },
    {
      month: 8,
      day: 15,
      holiday: {
        name: "Liberation Day (Gwangbokjeol)",
        nativeName: "광복절",
        description:
          "Celebrates Korea's liberation from Japanese rule on August 15, 1945, and the establishment of the Korean government.",
        type: "public",
        color: "bg-red-400",
      },
    },
    {
      month: 9,
      day: 17,
      holiday: {
        name: "Chuseok",
        nativeName: "추석",
        description:
          "The Korean Harvest Festival — a three-day holiday celebrating the harvest with ancestral rites, food, and family reunions.",
        type: "public",
        color: "bg-amber-400",
      },
    },
    {
      month: 10,
      day: 3,
      holiday: {
        name: "National Foundation Day (Gaecheonjeol)",
        nativeName: "개천절",
        description:
          "Celebrates the founding of the first Korean kingdom of Gojoseon by the legendary Dangun in 2333 BCE.",
        type: "public",
        color: "bg-teal-500",
      },
    },
    {
      month: 10,
      day: 9,
      holiday: {
        name: "Hangul Day",
        nativeName: "한글날",
        description:
          "Celebrates the creation of the Korean alphabet (Hangul) by King Sejong the Great in the 15th century.",
        type: "public",
        color: "bg-blue-400",
      },
    },
  ],

  marathi: [
    {
      month: 1,
      day: 14,
      holiday: {
        name: "Makar Sankranti",
        nativeName: "मकर संक्रांती",
        description:
          "A major Marathi harvest festival marking the sun's transit into Capricorn, celebrated with til-gul sweets, kite-flying, and the exchange of sesame-jaggery laddoos.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 3,
      day: 14,
      holiday: {
        name: "Holi",
        nativeName: "होळी",
        description:
          "The vibrant Marathi festival of colors celebrating the triumph of good over evil and the arrival of spring, with bonfires (Holika Dahan) the night before.",
        type: "religious",
        color: "bg-pink-500",
      },
    },
    {
      month: 3,
      day: 30,
      holiday: {
        name: "Gudi Padwa",
        nativeName: "गुढी पाडवा",
        description:
          "The Marathi New Year — families erect a Gudi (a decorated bamboo staff with a bright cloth and neem leaves) outside their homes to usher in prosperity.",
        type: "public",
        color: "bg-orange-500",
      },
    },
    {
      month: 5,
      day: 1,
      holiday: {
        name: "Maharashtra Day",
        nativeName: "महाराष्ट्र दिन",
        description:
          "Celebrates the formation of the state of Maharashtra on May 1, 1960, following the Samyukta Maharashtra movement.",
        type: "public",
        color: "bg-orange-600",
      },
    },
    {
      month: 5,
      day: 10,
      holiday: {
        name: "Akshaya Tritiya",
        nativeName: "अक्षय्य तृतीया",
        description:
          "An auspicious day considered ideal for new beginnings, investments, and weddings; Maharashtrians traditionally buy gold and start new ventures.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 7,
      day: 17,
      holiday: {
        name: "Ashadhi Ekadashi",
        nativeName: "आषाढी एकादशी",
        description:
          "A sacred pilgrimage day dedicated to Lord Vitthal of Pandharpur; millions of warkari devotees walk hundreds of kilometres to reach the temple.",
        type: "religious",
        color: "bg-amber-600",
      },
    },
    {
      month: 8,
      day: 19,
      holiday: {
        name: "Narali Purnima",
        nativeName: "नारळी पूर्णिमा",
        description:
          "Coconut Full Moon — the Marathi coastal festival marking the end of monsoon when fishermen offer coconuts to the sea god Varuna before resuming fishing.",
        type: "traditional",
        color: "bg-teal-500",
      },
    },
    {
      month: 9,
      day: 7,
      holiday: {
        name: "Ganesh Chaturthi",
        nativeName: "गणेश चतुर्थी",
        description:
          "Maharashtra's grandest festival celebrating Lord Ganesha's birth, marked by elaborate clay idols, ten days of music and dance, and a sea immersion procession.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 10,
      day: 12,
      holiday: {
        name: "Dasara",
        nativeName: "दसरा",
        description:
          "Vijayadashami — celebrates Lord Rama's victory over Ravana and Goddess Durga's victory over Mahishasura, with weapon worship (Shastra Puja) and cultural processions.",
        type: "religious",
        color: "bg-orange-600",
      },
    },
    {
      month: 10,
      day: 17,
      holiday: {
        name: "Kojagiri Purnima",
        nativeName: "कोजागरी पौर्णिमा",
        description:
          "The harvest full moon night when Maharashtrians offer milk to the moon goddess Lakshmi, stay awake all night playing games, and drink spiced milk.",
        type: "traditional",
        color: "bg-yellow-300",
      },
    },
    {
      month: 11,
      day: 1,
      holiday: {
        name: "Diwali",
        nativeName: "दीपावली",
        description:
          "The Festival of Lights — Maharashtrians celebrate Abhyanga Snan (ritual oil bath), Lakshmi Puja, and burst fireworks over five festive days.",
        type: "religious",
        color: "bg-yellow-500",
      },
    },
    {
      month: 11,
      day: 11,
      holiday: {
        name: "Kartiki Ekadashi",
        nativeName: "कार्तिकी एकादशी",
        description:
          "The second major Vari pilgrimage to Pandharpur; devotees walk to seek blessings from Lord Vitthal as the holy Kartik month reaches its auspicious eleventh day.",
        type: "religious",
        color: "bg-amber-600",
      },
    },
  ],

  french: [
    {
      month: 1,
      day: 1,
      holiday: {
        name: "New Year's Day",
        nativeName: "Jour de l'An",
        description:
          "The first day of the year, celebrated with festivities, fireworks at the Eiffel Tower, and gatherings across France.",
        type: "public",
        color: "bg-yellow-400",
      },
    },
    {
      month: 1,
      day: 6,
      holiday: {
        name: "Epiphany",
        nativeName: "Épiphanie",
        description:
          "Celebrates the visit of the Magi to the infant Jesus; French families share the Galette des Rois (King's Cake) with a hidden charm inside.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 2,
      day: 14,
      holiday: {
        name: "Valentine's Day",
        nativeName: "Saint-Valentin",
        description:
          "The feast day of Saint Valentine, widely celebrated in France as the city of love with roses, chocolates, and romantic dinners.",
        type: "cultural",
        color: "bg-rose-500",
      },
    },
    {
      month: 4,
      day: 1,
      holiday: {
        name: "April Fools' Day",
        nativeName: "Poisson d'Avril",
        description:
          "April Fish Day — French children tape paper fish to each other's backs as pranks; one of the most beloved and light-hearted French traditions.",
        type: "cultural",
        color: "bg-sky-400",
      },
    },
    {
      month: 4,
      day: 21,
      holiday: {
        name: "Easter Monday",
        nativeName: "Lundi de Pâques",
        description:
          "The day after Easter Sunday, a public holiday in France following midnight masses and egg hunts; traditionally associated with church bells dropping chocolates.",
        type: "religious",
        color: "bg-yellow-300",
      },
    },
    {
      month: 5,
      day: 1,
      holiday: {
        name: "Labour Day",
        nativeName: "Fête du Travail",
        description:
          "International Workers' Day — a French public holiday where workers march in unions; lily-of-the-valley (muguet) flowers are traditionally gifted for good luck.",
        type: "public",
        color: "bg-red-500",
      },
    },
    {
      month: 5,
      day: 8,
      holiday: {
        name: "Victory in Europe Day",
        nativeName: "Victoire 1945",
        description:
          "Celebrates the formal end of World War II in Europe on May 8, 1945; commemorated with ceremonies at the Arc de Triomphe and war memorials across France.",
        type: "public",
        color: "bg-blue-600",
      },
    },
    {
      month: 7,
      day: 14,
      holiday: {
        name: "Bastille Day",
        nativeName: "Fête Nationale",
        description:
          "France's national day commemorating the storming of the Bastille fortress in 1789, symbolising the French Revolution; celebrated with the world's oldest military parade on the Champs-Élysées.",
        type: "public",
        color: "bg-blue-500",
      },
    },
    {
      month: 8,
      day: 15,
      holiday: {
        name: "Assumption of Mary",
        nativeName: "Assomption de Marie",
        description:
          "A Catholic feast day celebrating the bodily assumption of the Virgin Mary into heaven; a public holiday marked by pilgrimages, processions, and family gatherings.",
        type: "religious",
        color: "bg-indigo-400",
      },
    },
    {
      month: 11,
      day: 1,
      holiday: {
        name: "All Saints' Day",
        nativeName: "La Toussaint",
        description:
          "A French public holiday for honouring all saints; families visit cemeteries to place chrysanthemums on graves, and children have a two-week autumn school holiday.",
        type: "religious",
        color: "bg-purple-500",
      },
    },
    {
      month: 11,
      day: 11,
      holiday: {
        name: "Armistice Day",
        nativeName: "Armistice de 1918",
        description:
          "Remembrance Day commemorating the armistice that ended World War I at the 11th hour of the 11th day of the 11th month of 1918; ceremonies at the Unknown Soldier's tomb under the Arc de Triomphe.",
        type: "public",
        color: "bg-red-700",
      },
    },
    {
      month: 12,
      day: 25,
      holiday: {
        name: "Christmas Day",
        nativeName: "Noël",
        description:
          "The most important Christian feast in France, celebrated with the Réveillon de Noël dinner on Christmas Eve, decorated trees, the Père Noël, and the bûche de Noël cake.",
        type: "religious",
        color: "bg-red-500",
      },
    },
    {
      month: 12,
      day: 31,
      holiday: {
        name: "New Year's Eve",
        nativeName: "Saint-Sylvestre",
        description:
          "Réveillon de la Saint-Sylvestre — French New Year's Eve celebrated with champagne, gala dinners, fireworks over the Eiffel Tower, and festive midnight kisses.",
        type: "cultural",
        color: "bg-indigo-400",
      },
    },
  ],

  tibetan: [
    {
      month: 2,
      day: 10,
      holiday: {
        name: "Losar (Tibetan New Year)",
        nativeName: "ལོ་གསར།",
        description:
          "The most important Tibetan Buddhist festival, celebrating the new year with prayers, dances, and ritual offerings.",
        type: "public",
        color: "bg-yellow-500",
      },
    },
    {
      month: 2,
      day: 15,
      holiday: {
        name: "Monlam Prayer Festival",
        nativeName: "སྨོན་ལམ་ཆེན་མོ།",
        description:
          "The Great Prayer Festival held shortly after Losar, featuring large-scale public prayers and Buddhist ceremonies.",
        type: "religious",
        color: "bg-amber-400",
      },
    },
    {
      month: 2,
      day: 24,
      holiday: {
        name: "Butter Lamp Festival",
        nativeName: "མར་མེ་ཆོ་ག",
        description:
          "A spectacular festival where thousands of butter lamps are lit in monasteries and streets to honor the Buddha.",
        type: "religious",
        color: "bg-orange-400",
      },
    },
    {
      month: 6,
      day: 11,
      holiday: {
        name: "Saga Dawa",
        nativeName: "ས་ག་ཟླ་བ།",
        description:
          "The most sacred Tibetan Buddhist month, commemorating the Buddha's birth, enlightenment, and Parinirvana.",
        type: "religious",
        color: "bg-yellow-400",
      },
    },
    {
      month: 11,
      day: 7,
      holiday: {
        name: "Lhabab Duchen",
        nativeName: "ལྷ་བབས་དུས་ཆེན།",
        description:
          "Commemorates the Buddha's descent from the Tushita Heaven after teaching the Dharma to his mother.",
        type: "religious",
        color: "bg-indigo-500",
      },
    },
    {
      month: 11,
      day: 26,
      holiday: {
        name: "Ganden Ngamchoe",
        nativeName: "དགའ་ལྡན་ལྔ་མཆོད།",
        description:
          "Festival of lights commemorating the death anniversary of Je Tsongkhapa, founder of the Gelug school of Tibetan Buddhism.",
        type: "religious",
        color: "bg-amber-500",
      },
    },
    {
      month: 3,
      day: 10,
      holiday: {
        name: "Tibetan Uprising Day",
        nativeName: "བོད་རང་དབང་གི་ཉིན་མོ།",
        description:
          "Commemorates the 1959 Tibetan uprising against Chinese rule and the subsequent exile of the Dalai Lama.",
        type: "public",
        color: "bg-red-500",
      },
    },
    {
      month: 7,
      day: 6,
      holiday: {
        name: "Dalai Lama's Birthday",
        nativeName: "ཏཱ་ལའི་བླ་མའི་འཁྲུངས་སྐར།",
        description:
          "Celebrates the birthday of the 14th Dalai Lama, Tenzin Gyatso, the spiritual leader of Tibetan Buddhism.",
        type: "public",
        color: "bg-yellow-600",
      },
    },
  ],
};
