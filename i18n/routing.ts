// i18n/routing.ts

import { i18n } from "@/i18n-config";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: i18n.locales.map((locale) => locale.slug),
  defaultLocale: i18n.defaultLocale,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "en-US": "/en",
      "ko-KR": "",
      "vi-VN": "/vn",
    },
  },
  pathnames: {}, // 경로 이름을 지정하지 않음
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
