// hooks/use-setting-store.ts

import data from "@/lib/db/data/data";
import { ISettingInput } from "@/types";
import { create } from "zustand";

// 1). SettingState 타입을 정의한다.
interface SettingState {
  setting: ISettingInput; // ISettingInput 타입을 사용한다.
  // 5). setting을 업데이트하는 함수를 정의한다.
  setSetting: (newSetting: ISettingInput) => void;
}

// 2). create<>() 함수를 이용하여 스토어를 생성한다.
const useSettingStore = create<SettingState>((set, get) => ({
  // 3). useSettingStore 를 정의하며 초기값 setting: {} 을 설정한다.
  setting: {
    // 4). setting의 초기값은 데이터를 복사한다.
    ...data.settings[0], // data.settings[0] 을 복사한다.
  } as ISettingInput,

  // setSetting - setting을 업데이트하는 함수
  setSetting: (newSetting: ISettingInput) =>
    set({
      setting: {
        ...newSetting, // newSetting을 복사한다.
      },
    }),
}));

export default useSettingStore;
