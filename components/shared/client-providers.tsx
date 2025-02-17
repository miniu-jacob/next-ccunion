// components/shared/client-providers.tsx

"use client";

import React from "react";
import AppInitializer from "./app-initializer";
import { ISettingInput } from "@/types";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({ setting, children }: { setting: ISettingInput; children: React.ReactNode }) {
  return (
    <AppInitializer setting={setting}>
      <div>{children}</div>
      {/* 토스트 팝업 사용을 위한 토스트  */}
      <Toaster position="bottom-right" reverseOrder={false} />
    </AppInitializer>
  );
}
