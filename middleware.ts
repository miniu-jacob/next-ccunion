// middleware.ts

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { clog } from "./lib/jlogger";
import { i18n } from "./i18n-config";
import { NextResponse } from "next/server";

/* PUBLIC ROUTE (NO LOGIN REQUIRED)
 * =========================================
 * 0) 공개/비공개 경로 정의
 * ========================================= */
const publicPages: string[] = [
  "/",
  "/login",
  "/register",
  "/about",
  "/blog",
  "/contact",
  "/search",
  "/blogpost/(.*)",
  "/page/(.*)",
];

// PROTECTED ROUTES (LOGIN REQUIRED)
const protectedRoutes: string[] = ["/dashboard", "/profile", "/admin"];

/* i18n LOCALE PREFIX
 * =========================================
 * 1) i18n locale 목록 및 prefix 관리
 * ========================================= */
const locales = i18n.locales.map((locale) => locale.slug); // 전체 [ "ko", "en", "vn" ]
const defaultLocale = i18n.defaultLocale; // 예: "ko"
const pathLocales = locales.filter((l) => l !== defaultLocale); // 예: [ "en", "vn" ] => prefix 로 "/en", "vn" 사용

/* 다국어 미들웨어 생성(routing 객체 전달, createMiddleware 함수 사용)
 * =========================================
 * 2) next-intl / next-auth 설정
 * ========================================= */
const intlMiddleware = createMiddleware(routing);

// nextAuth 인증 미들웨어 래퍼
const { auth } = NextAuth(authConfig);

/*LOCALE DETECTION - DEPRECATED
 * =========================================
 * 3) localeDetection 여부 (옵션)
 *    true => Accept-Language 헤더 감지 사용
 *    false => Accept-Language 무시
 * ========================================= */
// const localeDetection = true;

/* MIDDLEWARE FUNCTION
 * =========================================
 * MAIN MIDDLEWARE
 * ========================================= */
export default auth((req) => {
  // [Step A] next-intl 미들웨어 (rewrite/locale 설정 등) 먼저 실행
  const response = intlMiddleware(req);

  // 미들웨어 내에서 Response 헤더/쿠키를 수정하고 싶다면
  // response.headers.set(...) / response.cookies.set(...) 가능.
  // Vercel Edge 환경에서는 NextResponse API 사용.

  const { pathname } = req.nextUrl;

  clog.log("[middleware - Step A] pathname: ", pathname);

  /* URL PREFIX
   * =========================================
   * [Step B] URL prefix 추출
   * ========================================= */
  const segments = pathname.split("/").filter(Boolean); // 예: "/en/about" => [ "", "en", "about" ]
  const prefix = segments[0] ?? "";

  clog.info("[middleware - Step B] segments: ", segments);
  clog.info("[middleware - Step B] prefix: ", prefix);

  let currentLocale: string = defaultLocale;
  let routeSegments = segments;

  // prefix가 pathLocales 중 하나라면 => currentLocale = prefix
  if (pathLocales.includes(prefix)) {
    currentLocale = prefix; // 예: prefix = "en" => currentLocale = "en"
    routeSegments = segments.slice(1); // 예: [ "en", "about" ] => [ "about" ]
  }

  // 최종 실제 라우트 경로
  // "/en/about" -> routePath = "/about",  "/about" -> routePath = "/about"
  const routePath = "/" + routeSegments.join("/");

  /*COOKIE CHECK (NEXT_LOCALE)
   * =========================================
   * [Step C] 쿠키 확인 (NEXT_LOCALE)
   * ========================================= */
  if (!pathLocales.includes(prefix)) {
    // prefix 값이 있다? -> URL 우선 적용 -> 무시
    const userLocale = req.cookies.get("NEXT_LOCALE")?.value;
    if (userLocale && locales.includes(userLocale)) {
      currentLocale = userLocale;

      clog.info("[middleware - Step C] currentLocale: ", currentLocale);
    }
  }

  /* CURRENT LOCALE
   * =========================================
   * [Step E] 결국 currentLocale이 ko|en|vn 중 하나로 결정
   * 만약 ko|en|vn이 아니면 => 404
   * ========================================= */
  if (!locales.includes(currentLocale)) {
    clog.warn("[middleware - Step E] Invalid locale:", currentLocale);
    return;
  }

  /* PUBLIC/PROTECTED PAGE CHECK
   * =========================================
   * [Step F] 공개/비공개 경로 체크
   * ========================================= */
  const isPublicPage = publicPages.some((pattern) => {
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(routePath);
  });

  const isProtectedRoute = protectedRoutes.some((p) => routePath.startsWith(p));

  clog.info("[middleware - G] routePath:", routePath);
  clog.info("[middleware - G] currentLocale:", currentLocale);
  clog.info("[middleware - G] isPublicPage:", isPublicPage);
  clog.info("[middleware - G] isProtectedRoute:", isProtectedRoute);
  clog.info("[middleware - G] auth:", req.auth ? "logged-in" : "no-auth");

  /* LOGIN REDIRECT
   * =========================================
   * [Step G] 보호 페이지인데 인증 없음 => 로그인 리다이렉트
   * ========================================= */
  if (isProtectedRoute && !req.auth) {
    clog.warn("[middleware - Step H] Not authenticated -> Redirect to /login");
    const loginUrl = new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  /*SAVE COOKIE
   * =========================================
   * [Step H] 쿠키가 없거나 invalid 했다면, defaultLocale가 확정된 시점에
   * NEXT_LOCALE 쿠키를 저장 (선택 사항)
   * ====================================================
  // 만약 currentLocale === defaultLocale이고, 쿠키가 전혀 없는 상황이라면 => 한 번 저장해두자
  const userLocaleInCookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (!userLocaleInCookie) {
        // response는 next-intl 미들웨어가 생성한 Response
        // NextResponse 쿠키 API 사용
        response.cookies.set("NEXT_LOCALE", currentLocale, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365, // 1년
          secure: true, // HTTPS에서만 전송 (Vercel 대부분 HTTPS)
          sameSite: "lax",
        });
      }
  * ========================================= */

  /* =========================================
   * [Step I] 공개 페이지라면 그냥 통과
   * 나머지도 통과 (404는 Next.js가 처리)
   * ========================================= */
  return response;
});

/* =========================================
 * next.js 미들웨어 설정
 * ========================================= */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
