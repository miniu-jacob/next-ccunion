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
