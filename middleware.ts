// middleware.ts

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";

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

/**
 * nonDefaultPrefixes 추출
 * 기본 언어(ko-KR)는 prefix가 없으므로, 나머지 언어의 prefix만 추출 (예: "en", "vn")
 */
const nonDefaultPrefixes = Object.entries(
  (routing.localePrefix as { mode: "as-needed"; prefixes: Record<string, string> }).prefixes,
)
  .filter(([code]) => code !== routing.defaultLocale)
  .map(([_, prefix]) => prefix.replace(/^\//, "")); // 앞의 "/" 제거

/**
 * publicPages 배열을 기반으로 언어 prefix까지 포함하는 정규식을 동적으로 생성한다.
 *
 * 정규식 구조:
 *   ^               // 문자열 시작
 *   (?:/(...))?     // 선택적으로 "/" + 언어 prefix (non-default)
 *   (publicPages)   // 공개 페이지 패턴들
 *   /?              // 선택적인 trailing slash
 *   $               // 문자열 종료
 *
 * publicPages 배열에 "/"가 있다면, 빈 문자열과 "/" 모두를 허용하도록 처리한다.
 */

const publicPathnameRegex = RegExp(
  `^(?:/(${nonDefaultPrefixes.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
  "i",
);

// clog.info("[middleware] Generated publicPathname Regex : ", publicPathnameRegex);

// 다국어 미들웨어 생성 (createMiddleware 함수 사용, routing 객체 전달)
const intlMiddleware = createMiddleware(routing);

const { auth } = NextAuth(authConfig);

/**
 * 미들웨어 함수
 * - 공개 페이지(publicPages)라면 다국어 미들웨어(intlMiddleware)를 실행
 * - 비공개 페이지일 경우, 인증 여부를 확인하여 인증되지 않았다면 로그인 페이지로 리다이렉션한다.
 */

// req.nextUrl.origin을 사용할 때 반드시 https:// 또는 http:// 가 포함되도록 보장한다.
/**
 * ✅ 환경별 `baseURL`을 자동 설정
 * - 개발 환경(`development`): `http://localhost:3000`
 * - 프로덕션(`production`): `process.env.NEXT_PUBLIC_SITE_URL` 사용
 */

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_SITE_URL || "https://next-ccunion.vercel.app";

export default auth((req) => {
  let { pathname } = req.nextUrl;

  // URL 정규화: 기본 언어 SLUG(예: "/ko")를 "/"로 변경
  if (pathname.startsWith("/ko")) {
    pathname = pathname.replace(/^\/ko/, "");
    if (pathname === "") pathname = "/";
  }

  // 요청된 페이지가 공개 페이지 목록에 있는지 확인
  const isPublicPage = publicPathnameRegex.test(pathname);

  if (isPublicPage) {
    // 공개 페이지라면 다국어 미들웨어만 실행, 로그인 검사 생략
    return intlMiddleware(req);
  } else {
    // 인증되지 않은 경우, 로그인 페이지로 리다이렉션 (callbackUrl 포함)
    if (!req.auth) {
      const redirectUrl = new URL(`/login?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`, baseURL) // 로그인 후 이동할 페이지
      return Response.redirect(redirectUrl);
    } else {
      return intlMiddleware(req);
    }
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
