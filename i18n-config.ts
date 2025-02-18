// i18n-config.ts

export const i18n = {
  locales: [
    { code: "ko-KR", name: "한국어", slug: "ko", icon: "/icons/flags/ko.svg" },
    { code: "en-US", name: "English", slug: "en", icon: "/icons/flags/us.svg" },
    { code: "vi-VN", name: "Tiếng Việt", slug: "vn", icon: "/icons/flags/vn.svg" },
  ],
  defaultLocale: "ko",
};

export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];
