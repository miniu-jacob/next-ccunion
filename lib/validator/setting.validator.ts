// lib/validator/setting.validator.ts

import { z } from "zod";

// 다국어 설정을 위한 스키마 정의 부분 ---------------------------------
export const SiteLanguageSchema = z.object({
  name: z.string().min(1, "Language name is required"), // 언어 이름
  code: z.string().min(1, "Language code is required"), // 언어 코드
});

// 캐러셀 검증 스키마
export const CarouselSchema = z.object({
  title: z.string().min(1, "Title is required"), // 제목
  url: z.string().min(1, "URL is required"), // URL
  image: z.string().min(1, "Image URL is required"), // 이미지 URL
  buttonCaption: z.string().min(1, "Button caption is required"), // 버튼 캡션
});

// DB 설정의 유효성을 검증할 스키마 정의
export const SettingInputSchema = z.object({
  // 공통 설정
  common: z.object({
    pageSize: z.coerce.number().min(1, "Page size must be at least 1").default(9), // 페이지 사이즈
    isMaintenanceMode: z.boolean().default(false), // 유지보수 모드
    defaultTheme: z.string().min(1, "Default theme is required").default("light"), // 기본 테마
    defaultColor: z.string().min(1, "Default color is required").default("gold"), // 기본 색상
  }),
  // 사이트 설정
  site: z.object({
    name: z.string().min(1, "Site name is required"), // 사이트 이름
    logo: z.string().min(1, "Site logo is required"), // 사이트 로고
    slogan: z.string().min(1, "Site slogan is required"), // 사이트 슬로건
    description: z.string().min(1, "Site description is required"), // 사이트 설명
    keywords: z.string().min(1, "Site keywords is required"), // 사이트 키워드
    url: z.string().min(1, "Site URL is required"), // 사이트 URL
    email: z.string().min(1, "Site email is required"), // 관리자 이메일
    phone: z.string().min(1, "Site phone is required"), // 관리자 전화번호
    author: z.string().min(1, "Site author is required"), // 사이트 저자
    copyright: z.string().min(1, "Site copyright is required"), // 사이트 저작권
    address: z.string().min(1, "Site address is required"), // 사이트 주소
  }),
  availableLanguages: z.array(SiteLanguageSchema).min(1, "At least one language is required"), // 사용 가능한 언어
  defaultLanguage: z.string().min(1, "Default language is required"), // 기본 언어
  carousels: z.array(CarouselSchema).min(1, "At least one carousel is required"), // 캐러셀
});
