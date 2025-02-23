import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 문자열을 슬러그로 변환하는 유틸리티
export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    // .replace(/[^\w\s-]+/g, "") <-- 여기에서 한글이 제거됨 (임시 주석)
    .replace(/[^\p{L}\p{N}\s-]+/gu, "") // 한글 및 유니코드 문자 허용
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = (error: any): string => {
  if (error.name === "ZodError") {
    // (1). Object.keys() 함수를 사용하여 error.errors 객체의 키를 배열로 변환한다. (email, password)
    const fieldErrors = Object.keys(error.errors).map((field) => {
      // error 객체의 errors 객체의 키(field)에 해당하는 메시지를 반환한다.
      // 즉 email 키의 값은 "Invalid email"이고, password 키의 값은 "Invalid password"이다.
      // 이 값들이 배열로 fieldErrors에 저장된다.
      const errorMessage = error.errors[field].message;
      return errorMessage;
    });
    // (2). 배열로 변환된 fieldErrors를 join() 함수를 사용하여 문자열로 변환한다.
    return fieldErrors.join(". ");
  }
  // 다른 에러에 대한 처리
  else if (error.name === "ValidationError") {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message;
      return errorMessage;
    });
    return fieldErrors.join(". ");
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0];
    return `${duplicateField} already exists.`;
  } else {
    // return 'Something Wrong'
    return typeof error.message === "string" ? error.message : JSON.stringify(error.message);
  }
};

/*
 * 미들웨어에서 사용하는 공개/비공개 경로인지 비교할자자수 있도록 하는 유틸
 * 경로 문자열("/blogpost/[slug]") 을 입력받아 정규식(RegExp) 객체로 변환한다.
 *   - "/blogpost/[slug]" → 정규식 ^/blogpost/[^/]+$
 *   - "/profile/[id]/settings" → 정규식 ^/profile/[^/]+/settings$
 */
export function routeToRegex(route: string): RegExp {
  // 먼저 정규식 특수문자를 escape 처리한다. -> (/.?*+^$[] 등)
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // [slug] 같은 패턴을 ([^/]+) 로 변환한다.
  const pattern = escaped.replace(/\\\[.*?\\\]/g, "[^/]+");

  return new RegExp(`^${pattern}$`);
}

// 경로가 매칭되는지 확인하는 함수
export function isMatch(path: string, routeSet: Set<string>): boolean {
  return [...routeSet].some((route) => {
    return routeToRegex(route).test(path);
  });
}

/**
 * "/blogpost/[slug]"
 *   -> 정규식 ^/blogpost/(?<slug>[^/]+)$
 * "/profile/[id]/settings"
 *   -> 정규식 ^/profile/(?<id>[^/]+)/settings$
 *
 * 이렇게 그룹 이름으로 추출 가능( match.groups.slug 등 )
 */
export function routeToNamedRegex(route: string): RegExp {
  // 정규식 특수문자 이스케이프
  const escaped = route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // 2). [id], [slug] 같은 부분을 (?<id>[^/]+), (?<slug>[^/]+) 형태로 변환
  const named = escaped.replace(/\\\[([^/]+?)\\]/g, (_, groupName) => {
    return `(?<${groupName}>[^/]+)`;
  });

  // 3). ^...$ 로 감싸서 전체 매칭
  return new RegExp(`^${named}$`);
}
