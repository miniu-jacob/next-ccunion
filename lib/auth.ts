// lib/auth.ts

// NextAuth를 위한 기본 설정을 가져온다.
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";

// next-auth 의 Session 타입을 확장 (role 추가)
declare module "next-auth" {
  interface Session {
    user: {
      role?: string; // 선택적 role
    } & DefaultSession["user"];
  }
}

// NextAuth를 초기화하여 handlers, auth, signIn, signOut을 내보낸다.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // authConfig 를 전달한다.

  // 페이지 설정
  pages: {}, // 로그인, 회원가입 페이지 지금 필요 없음

  // 세션 설정(옵션)
  /*
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일 유지
  },        */
});
