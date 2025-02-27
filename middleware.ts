// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { protectedPaths, publicPaths } from "./lib/db/data/routes-data";
import { NextResponse } from "next/server";
import { isMatch } from "./lib/utils";

/*PUBLIC ROUTE (NO LOGIN REQUIRED)
 * =========================================
 * [Pre A-1] 공개/비공개 경로 정의
 *   - 직접 경로를 설정하거나 다른 곳에 설정할 수 있다.
 *   - 여기서는 별도 파일(/lib/db/data/routes-data.ts)에 설정한다.
    + const publicPages: string[] = [ "/", "/login", "/register", "/about", "/blog", "/contact", "/search", "/blog/(.*)", "/page/(.*)" ];
    // PROTECTED ROUTES (LOGIN REQUIRED)
    + const protectedRoutes: string[] = ["/dashboard", "/profile", "/admin"];
 * ========================================= */

/*PUBLIC ROUTE (NO LOGIN REQUIRED)
 * =========================================
* 0) 공개/비공개 경로 정의
  + const publicRoutes: string[] = [ "/", "/login", "/register", "/about", "/blog",
      "/contact", "/search", "/blogpost/(.*)", "/page/(.*)" ];
  // PROTECTED ROUTES (LOGIN REQUIRED)
  + const protectedRoutes: string[] = ["/dashboard", "/profile", "/admin"];
* ========================================= */

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

  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;
  /* URL PREFIX 추출
   * =============================
   * [Step A] URL에서 prefix 를 추출한다.
   *   - locales: 언어 목록
   *   - defaultLocale: 기본 언어
   *  ============================= */
  const pathnameParts = pathname.split("/").filter(Boolean); // 빈 문자열 제거
  const prefix = pathnameParts[0] || "";
  const pathnameSegments = req.nextUrl.pathname.split("/");

  console.log("[middleware - Step B] pathname comes: ", pathname);
  console.log("[middleware - Step B] prefix extracted: ", pathnameParts);
  console.log("[middleware - Step B] pathnameSegments: ", pathnameSegments);

  /* LANGUAGE SETTINGS
   * =============================
   * [Step B] 현재 URL 에서 locale을 감지한다.
   *   - urlLocale : URL에서 추출한 언어(prefix)
   *   - userLocale: 쿠키에서 추출한 언어
   *   - currentLocale: URL에서 추출한 언어(prefix) -> 쿠키 -> 기본 언어 순서
   *  ============================= */
  const urlLocale = locales.includes(prefix as "ko" | "en" | "vn") ? prefix : null;
  const userLocale = req.cookies.get("NEXT_LOCALE")?.value;
  const currentLocale = userLocale || defaultLocale;

  console.log(
    "[middleware - Step C]: ",
    "[urlLocale]: ",
    urlLocale,
    "[userLocale]: ",
    userLocale,
    "[currentLocale]: ",
    currentLocale,
  );

  /* PATH CHECK
   * =============================
   * [Step C] 공개/비공개 경로 확인
   *   - pathWithoutPrefix: prefix를 제거한 경로
   *   - isPublicRoute: 요청된 경로가 공개 경로인지 확인
   * ============================= */

  const pathWithoutPrefix = `/${pathnameParts.slice(1).join("/")}` || "/";
  const isPublicRoute = isMatch(pathWithoutPrefix, publicPaths);
  const isProtectedRoute = isMatch(pathWithoutPrefix, protectedPaths);
  console.log("[middleware - Step D] pathWithoutPrefix: ", pathWithoutPrefix);
  console.log("[middleware - Step D] isPublicRoute: ", isPublicRoute);
  console.log("[middleware - Step D] isProtectedRoute: ", isProtectedRoute);

  // 모든 경로에 대해 intlMiddleware 실행(잘못된 경로는 외부처리)
  let response = NextResponse.next(); // 기본 응답 생성

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
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV === "production", // VERCEL HTTPS support
    });
    console.log("[middleware - Step D] NEXT_LOCALE cookie set early: ", currentLocale);
  }

  // 공개 경로 처리
  if (isPublicRoute) {
    return intlMiddleware(req);
  }

  // 비공개 경로 처리
  if (isProtectedRoute) {
    if (!req.auth) {
      const loginUrl = new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.nextUrl.origin);

      return NextResponse.redirect(loginUrl);
    }
  }

  // console.log("[middleware - Step D] NEXT_LOCALE cookie set: ", currentLocale);

  // console.log("[middleware - Final] Response locale: ", currentLocale);
  response = intlMiddleware(req);

  return response;
});

/* =========================================
 * next.js 미들웨어 설정
 * ========================================= */
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
  // matcher: ["/", "/(ko|en|vn)/:path*"],
  // matcher: ["/((?!api|_next|.*\\..*).*)"],
  matcher: ["/((?!api|image|_next|favicon.ico|_next/image|icons|_next/static|_vercel\\..*).*)"],
};
