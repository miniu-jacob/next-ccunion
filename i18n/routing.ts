// i18n/routing.ts

import { routesData } from "@/lib/db/data/routes-data";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

// routesData 에서 모든 경로 추출
// const allPaths = [
//   ...routesData.public.static,
//   ...routesData.public.dynamic,
//   ...routesData.protected.static,
//   ...routesData.protected.dynamic,
// ];
//
// const pathnames = Object.fromEntries(allPaths.map((path) => [path, path]));

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
  locales: ["ko", "en", "vn"],
  defaultLocale: "ko",
  // localeDetection: false,
  // localeCookie: { name: "NEXT_LOCALE" },
  localePrefix: "always",
  pathnames: {},
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
