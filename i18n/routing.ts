// i18n/routing.ts

import { i18n } from "@/i18n-config";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

/* ROUTING CONFIGURATION
 * =============================
 * [Step D] Routing 설정을 정의한다.
 *   - locales: 언어 목록
 *   - defaultLocale: 기본 언어
 *   - localeCookie: 쿠키 설정 (선택)
 *   - localePrefix: 언어별 prefix 설정 - 모드 설정 시 pathnames와 관계 없이 prefix 설정
 *   - pathnames: URL 경로가 다른 경우 필요
 * ============================= */
export const routing = defineRouting({
  locales: i18n.locales.map((locale) => locale.slug),
  defaultLocale: i18n.defaultLocale,
  localePrefix: { mode: "as-needed" },
  pathnames: {}, // 전체 경로 설정
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
