// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { clog } from "./lib/jlogger";

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
  const response = intlMiddleware(req);
  const { pathname } = req.nextUrl;

  clog.log("[middleware - Step A] pathname comes: ", pathname);

  /* URL PREFIX 추출
   * =============================
   * [Step A] URL에서 prefix 를 추출한다.
   *  ============================= */
  const prefix = pathname.split("/")[1] || "";

  // next-intl 미들웨어만 실행하고 바로 반환
  return response;
});

/* =========================================
 * next.js 미들웨어 설정
 * ========================================= */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
