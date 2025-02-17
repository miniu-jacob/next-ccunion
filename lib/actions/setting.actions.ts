// lib/actions/setting.actions.ts

"use server";

import { ISettingInput } from "@/types";
import { connectToDatabase } from "../db";
import Setting from "../db/models/setting.model";
import data from "../db/data/data";
import { formatError } from "../utils";

// 캐시된 설정을 사용하기 위해서 전역 캐싱용 변수를 만든다.
const globalForSettings = global as unknown as { cachedSettings: ISettingInput | null };

// 캐싱된 설정이 아닌 DB 직접 조회 함수 정의
export const getNoCachedSetting = async (): Promise<ISettingInput> => {
  await connectToDatabase();
  const setting = await Setting.findOne();
  return JSON.parse(JSON.stringify(setting)) as ISettingInput;
};

// Setting 모델(DB) 에서 설정을 조회하는 함수를 정의한다.
export const getSetting = async (): Promise<ISettingInput> => {
  // 캐시된 설정이 있는지를 확인한다. 있다면 캐시된 설정을 반환한다.
  if (!globalForSettings.cachedSettings) {
    // 캐싱된 설정이 없다면 DB 에서 설정을 조회한다.
    await connectToDatabase();
    const setting = await Setting.findOne().lean();

    // 조회된 설정을 캐시에 저장한다. 없다면 data.settings[0] 을 캐시에 저장한다.
    globalForSettings.cachedSettings = setting ? JSON.parse(JSON.stringify(setting)) : data.settings[0];
  }

  // 캐싱된 설정이 있다면 이를 반환한다.
  return globalForSettings.cachedSettings as ISettingInput;
};

// DB 에 설정을 업데이트하는 함수를 정의한다.
export async function updateSetting(newSetting: ISettingInput) {
  try {
    await connectToDatabase();
    const updateSetting = await Setting.findOneAndUpdate({}, newSetting, {
      upsert: true,
      new: true,
    }).lean();

    // 업데이트된 설정을 캐시에 저장한다.
    globalForSettings.cachedSettings = JSON.parse(JSON.stringify(updateSetting));

    // 업데이트된 설정을 반환한다.
    return {
      success: true,
      message: "Setting updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
