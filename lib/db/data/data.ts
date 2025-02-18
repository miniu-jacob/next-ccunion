// lib/db/data/data.ts

import { Data } from "@/types";
import { settingsData } from "./settings-data";
import { headerMenus } from "./headerMenus-data";

const data: Data = {
  headerMenus, // headerMenus를 가져온다.
  settings: settingsData.settings, // settingsData에서 settings를 가져온다.
};

export default data;
