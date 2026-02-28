import Array "mo:core/Array";

actor {
  type CalendarEntry = {
    id : Text;
    displayName : Text;
    nativeName : Text;
    description : Text;
    locale : Text;
  };

  let calendarEntries : [CalendarEntry] = [
    {
      id = "gregorian";
      displayName = "Gregorian Calendar";
      nativeName = "Gregorian Calendar";
      description = "Standard civil calendar used in most of the world.";
      locale = "en-US";
    },
    {
      id = "islamic";
      displayName = "Islamic (Hijri) Calendar";
      nativeName = "التقويم الهجري";
      description = "Lunar calendar used by Muslims globally.";
      locale = "ar-SA";
    },
    {
      id = "hebrew";
      displayName = "Hebrew Calendar";
      nativeName = "הלוח העברי";
      description = "Lunisolar calendar used by Jewish communities.";
      locale = "he-IL";
    },
    {
      id = "chinese_lunar";
      displayName = "Chinese Lunar Calendar";
      nativeName = "农历";
      description = "Traditional calendar system in China.";
      locale = "zh-CN";
    },
    {
      id = "persian";
      displayName = "Persian (Jalali) Calendar";
      nativeName = "تقویم هجری شمسی";
      description = "Solar calendar used in Iran and Afghanistan.";
      locale = "fa-IR";
    },
    {
      id = "ethiopian";
      displayName = "Ethiopian Calendar";
      nativeName = "የኢትዮጵያ የአመት መቁጠሪያ";
      description = "Solar calendar with 13 months.";
      locale = "am-ET";
    },
    {
      id = "coptic";
      displayName = "Coptic Calendar";
      nativeName = "Ⲓⲉⲣⲉ-̀ⲡⲁⲧⲣⲓⲁ̀ⲣⲭⲟⲥ";
      description = "Ancient Egyptian calendar system.";
      locale = "cop-EG";
    },
    {
      id = "hindu";
      displayName = "Hindu (Vikram Samvat) Calendar";
      nativeName = "विक्रमी संवत";
      description = "Lunisolar calendar used in India and Nepal.";
      locale = "hi-IN";
    },
    {
      id = "buddhist";
      displayName = "Buddhist Calendar";
      nativeName = "พุทธศักราช";
      description = "Used in Southeast Asian Buddhist countries.";
      locale = "th-TH";
    },
    {
      id = "japanese";
      displayName = "Japanese Calendar";
      nativeName = "和暦";
      description = "Era-based system for Japan.";
      locale = "ja-JP";
    },
    {
      id = "korean";
      displayName = "Korean Calendar";
      nativeName = "한국식 달력";
      description = "Traditional Korean lunisolar calendar.";
      locale = "ko-KR";
    },
    {
      id = "tibetan";
      displayName = "Tibetan Calendar";
      nativeName = "དུས་ཐོ";
      description = "Lunisolar calendar used in Tibet.";
      locale = "bo-CN";
    },
  ];

  public query ({ caller }) func getAllCalendarEntries() : async [CalendarEntry] {
    calendarEntries;
  };
};
