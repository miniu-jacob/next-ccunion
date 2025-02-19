// types/index.ts

import { SettingInputSchema, SiteLanguageSchema } from "@/lib/validator/setting.validator";
import { z } from "zod";

// 초기화, seed 데이터 또는 DB에 데이터가 없을 때 사용할 기본 설정의 타입을 정의한다.
export type Data = {
  settings: ISettingInput[]; // 다른 곳에서 const { settings } = data; 와 같이 사용할 수 있다.
  headerMenus: {
    name: string;
    href: string;
  }[];
};

// 다국어 설정 타입도 추가해 준다.
export type SiteLanguage = z.infer<typeof SiteLanguageSchema>;

// Setting 타입 정의
export type ISettingInput = z.infer<typeof SettingInputSchema>;

