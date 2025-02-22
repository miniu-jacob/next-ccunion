// i18n-config.ts

export const i18n = {
  locales: [
    { slug: "ko", name: "한국어", code: "ko-KR", icon: "/icons/flags/ko.svg" },
    { slug: "en", name: "English", code: "en-US", icon: "/icons/flags/us.svg" },
    { slug: "vn", name: "Tiếng Việt", code: "vi-VN", icon: "/icons/flags/vn.svg" },
  ],
  defaultLocale: "ko",
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];
