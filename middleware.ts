// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { clog } from "./lib/jlogger";
import { NextResponse } from "next/server";

/*PUBLIC ROUTE (NO LOGIN REQUIRED)
 * =========================================
 * [Pre A-1] 공개/비공개 경로 정의
 *   - 직접 경로를 설정하거나 다른 곳에 설정할 수 있다.
 *   - 여기서는 별도 파일(/lib/db/data/routes-data.ts)에 설정한다.
    + const publicPages: string[] = [ "/", "/login", "/register", "/about", "/blog", "/contact", "/search", "/blog/(.*)", "/page/(.*)" ];
    // PROTECTED ROUTES (LOGIN REQUIRED)
    + const protectedRoutes: string[] = ["/dashboard", "/profile", "/admin"];
 * ========================================= */

/*i18n LOCALE PREFIX
 * =========================================
 * [Pre A-2] i18n locale 목록 및 prefix 관리
    + const locales = i18n.locales.map((locale) => locale.slug); // 전체 [ "ko", "en", "vn" ]
    + const defaultLocale = i18n.defaultLocale; // 예: "ko"
 * ========================================= */

/*LOCALE DETECTION - DEPRECATED
 * =========================================
 * [Pre A-3] 브라우저 언어 감지 - localeDetection 여부 (옵션)
 *    true -> Accept-Language 헤더 감지 사용
 *    false -> Accept-Language 무시
 * ========================================= */
// const localeDetection = true;

/* 다국어 미들웨어 생성(routing 객체 전달, createMiddleware 함수 사용)
 * =========================================
 * [Pre-A] next-intl / next-auth 설정
 * ========================================= */
const intlMiddleware = createMiddleware(routing);

// nextAuth 인증 미들웨어 래퍼
const { auth } = NextAuth(authConfig);

/* ####### MIDDLEWARE FUNCTION #######
 * =========================================
 * MAIN MIDDLEWARE
 * ========================================= */
export default auth((req) => {
  // [Step A] next-intl 미들웨어 (rewrite/locale 설정 등) 먼저 실행
  const { pathname } = req.nextUrl;

  /* URL PREFIX 추출
   * =============================
   * [Step A] URL에서 prefix 를 추출한다.
   *   - locales: 언어 목록
   *   - defaultLocale: 기본 언어
   *  ============================= */
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  // 1). URL prefix 추출 및 로깅
  const prefix = pathname.split("/")[1] || "";

  clog.info("[middleware - Step A] pathname comes: ", pathname);
  clog.info("[middleware - Step A] prefix extracted: ", prefix);

  /* LANGUAGE SETTINGS
   * =============================
   * [Step B] 언어 설정
   *   - currentLocale: URL에서 추출한 언어(prefix) -> 쿠키 -> 기본 언어 순서
   *  ============================= */
  const currentLocale = locales.includes(prefix) ? prefix : req.cookies.get("NEXT_LOCALE")?.value || defaultLocale;

  clog.info("[middleware - Step B] currentLocale: ", currentLocale);

  /* next-intl 미들웨어를 실행
   * =============================
   * [Step C] next-intl 미들웨어 실행
   *   - currentLocale: URL에서 추출한 언어(prefix) -> 쿠키 -> 기본 언어 순서
   *  ============================= */
  const response = intlMiddleware(req);

  /* COOKIE SETTINGS
   * =============================
   * [Step D] NEXT_LOCALE 쿠키 설정
   *   - 조건에 따라 쿠키를 설정한다.
   *   - a). NEXT_LOCALE 쿠키를 가져오지 못한 경우
   *   - b). NEXT_LOCALE 쿠키가 있지만, 현재 언어(currentLocale)와 다른 경우
   *  ============================= */
  if (!req.cookies.get("NEXT_LOCALE") || req.cookies.get("NEXT_LOCALE")?.value !== currentLocale) {
    response.cookies.set("NEXT_LOCALE", currentLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 30 days
      secure: process.env.NODE_ENV === "production", // VERCEL HTTPS support
    });
    clog.log("[middleware - Step D] NEXT_LOCALE cookie set: ", currentLocale);
  }

  return response;
});

/* =========================================
 * next.js 미들웨어 설정
 * ========================================= */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
