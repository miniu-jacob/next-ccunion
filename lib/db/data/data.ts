// lib/db/data/data.ts

import { Data } from "@/types";
import { settingsData } from "./settings-data";

const data: Data = {
  settings: settingsData.settings, // settingsData에서 settings를 가져온다.
};

export default data;
