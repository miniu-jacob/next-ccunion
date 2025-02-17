// components/shared/app-initializer.tsx

import useSettingStore from "@/hooks/use-setting-store";
import { ISettingInput } from "@/types";
import React, { useEffect, useState } from "react";

export default function AppInitializer({ setting, children }: { setting: ISettingInput; children: React.ReactNode }) {
  // 초기 설정을 적용하기 위해서 랜더링 상태를 관리한다.
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    // 초기 설정을 적용한다.
    setRendered(true);
  }, [setting]);

  if (!rendered) {
    // 랜더링 되기 전 한번만 설정을 적용한다. (랜더링 되면 다시 설정을 적용하지 않는다.)
    // setState({ setting }) 은 스토어 내부에서 set({ setting: { ...newSetting }}) 메서드를 호출하는 것과 같다.
    useSettingStore.setState({ setting });
  }

  return children;
}
