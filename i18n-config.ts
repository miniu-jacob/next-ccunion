// i18n-config.ts

export const i18n = {
  locales: [
    { code: "ko-KR", name: "한국어", icon: "/icons/flags/ko.svg" },
    { code: "en-US", name: "English", icon: "/icons/flags/us.svg" },
    { code: "vi-VN", name: "Tiếng Việt", icon: "/icons/flags/vn.svg" },
  ],
  defaultLocale: "ko-KR",
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];
