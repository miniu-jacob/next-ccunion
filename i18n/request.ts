// i18n/request.ts

import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // clog.log("[getRequestConfig] locales: ", locale);

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  // locale code를 그대로 사용함 (메시지 JSON 파일명)
  const shortLocale = locale; // 메시지 파일 이름으로 사용할 값: 예: "en-US" -> "en-US", "ko-KR" -> "ko-KR", "vi-VN" -> "vi-VN"

  // clog.log("[getRequestConfig] locale", locale);
  // clog.log("[getRequestConfig] shortLocale", shortLocale);

  return { locale, messages: (await import(`../messages/${shortLocale}.json`)).default };
});
