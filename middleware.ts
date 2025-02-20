// middleware.ts

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { clog } from "./lib/jlogger";
import { i18n } from "./i18n-config";
import { NextResponse } from "next/server";

// 로그인 없이 접근 가능한 페이지 경로 정의
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
// LANGUAGE CODE LIST (ko, en, vn only)
const locales = i18n.locales.map((locale) => locale.slug);

// 다국어 미들웨어 생성 (createMiddleware 함수 사용, routing 객체 전달)
const intlMiddleware = createMiddleware(routing);

const { auth } = NextAuth(authConfig);

/**
 * ✅ 환경별 `baseURL`을 자동 설정
 * - 개발 환경(`development`): `http://localhost:3000`
 * - 프로덕션(`production`): `process.env.NEXT_PUBLIC_SITE_URL` 사용
 */

// const baseURL = new URL(
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3000"
//     : process.env.NEXT_PUBLIC_SITE_URL || "https://next-ccunion.vercel.app",
// ).toString();

// clog.info("[middleware] baseURL : ", baseURL);

// ### MAIN FUNCTION START ###
export default auth((req) => {
  // 다국어 미들웨어를 실행한다. (intlMiddleware) -> locale 검사 rewrite 등 next-intl 내부 로직
  const response = intlMiddleware(req);
  const { pathname } = req.nextUrl;

  // -----------------------------
  // 2) prefix / locale 식별 로직
  // -----------------------------
  // - /en/about => 첫 segment = "en" -> locale = "en"
  // - /vn/about => 첫 segment = "vn" -> locale = "vn"
  // - /about    => 첫 segment = "about" (prefix가 아님) -> locale = "ko" (기본)
  // - /         => segment = ""        -> locale = "ko"
  const segments = pathname.split("/").filter(Boolean);
  const maybePrefix = segments[0] ?? "";

  const localeFromPath = pathname.split("/")[1];

  // ko-KR 에는 prefix가 없으니, /about 같은 경우 localeFromPath는 "about" 이다.
  // en-US -> /en/about 일 때 localeFromPath = "en"
  // vi-VN -> /vn/about 일 때 localeFromPath = "vn"
  // 따라서 "ko" 는 없으므로 "/ko" 경로는 잘못된 것으로 판단하게 된다.
  // 들어온 경로 중 "ko"를 제외하도록 validLocales 를 만든다.
  const validLocalesExDefault = locales.filter((locale) => locale !== "ko");

  const hasLocalePrefix = validLocalesExDefault.includes(maybePrefix);
  const currentLocale = hasLocalePrefix ? maybePrefix : "ko";

  // hasLocalePrefix === true 이면, 경로는 segments.slice(1)
  // 없으면 segments 전체가 실제 라우트
  const routeSegments = hasLocalePrefix ? segments.slice(1) : segments;
  const routePath = "/" + routeSegments.join("/");

  clog.info("[middleware] prefix: ", hasLocalePrefix ? maybePrefix : "(none)");
  clog.info("[middleware] currentLocale: ", currentLocale);
  clog.info("[middleware] routePath: ", routePath);

  // 유효성을 검증한다.
  const isValidLocale =
    // prefix 없이 바로 "/" 또는 "/login" 등으로 들어오면 기본(ko-KR)
    localeFromPath === "" ||
    // 위 두 개 중 하나라면 en-US 또는 vi-VN 이 된다.
    validLocalesExDefault.includes(localeFromPath);

  // "/en" 또는 "/vn" 또는 "/" 인 경우를 루트 경로로 간주한다.
  const isRootPath = pathname === "/" || validLocalesExDefault.some((l) => pathname === `/${l}`);

  // publicPages에 들어 있는 각각의 라우트와 정규식 매칭
  // "/" -> /en, /vn도 루트로 간주하도록 특별 처리
  const isPublicPage = publicPages.some((route) => {
    // 만약 route === "/"라면, "/en" 혹은 "/vn"도 허용
    const regex = new RegExp(`^${route}$`);
    return regex.test(routePath);
  });

  // 보호된 경로인지 체크 -> 로그인 여부 검사
  const isProtectedRoute = protectedRoutes.some((route) => routePath.startsWith(route));

  clog.info("[middleware] isPublicPage: ", isPublicPage);
  clog.info("[middleware] localeFromPath: ", localeFromPath);
  clog.info("[middleware] isValidLocale: ", isValidLocale);
  clog.info("[middleware] isRootPath: ", isRootPath);
  clog.info("[middleware] isProtectedPath: ", isProtectedRoute);

  if (isProtectedRoute) {
    if (!req.auth) {
      clog.warn("[middleware] Unauthenticated -> Redirect to /login");
      const loginUrl = new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (!["ko", "en", "vn"].includes(currentLocale)) {
    clog.warn("[middleware] Invalid locale:", currentLocale);
    return; // => 404
  }

  if (isPublicPage) {
    return response;
  } else {
    // public도 아니고 protected도 아닌(=404) 페이지면
    // Next.js가 라우트를 찾지 못하면 자동 404
    // 혹은 여기가 catch-all 로직이 되려면 return response; 로 통과
    // 필요에 따라 정리:
    return response;
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
