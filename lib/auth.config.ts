// lib/auth.config.ts

import { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  callbacks: {
    // authorized() 에서 어떤 경로든 true를 반환하여 모든 경로를 public으로 설정한다.
    authorized() {
      return true; // 모든 경로에서 인증을 허용
    },
  },

  /* ======================== 향후 추가 내용 =========================
  callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authorized({ request, auth }: any) {
      const protectedPaths = ["/login", "/register"];
      const { pathname } = request.nextUrl;
      if (protectedPaths.(some((p) => p.test(pathname))) return !!auth;
      return true;
      },
    },
  ==================================================================== */
} satisfies NextAuthConfig;
