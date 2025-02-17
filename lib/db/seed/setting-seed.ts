// lib/db/seed/setting-seed.ts

import { cwd } from "process";
import { loadEnvConfig } from "@next/env";
import { connectToDatabase } from "..";
import data from "../data/data";
import Setting from "../models/setting.model";

// 1). .env 파일을 현재 작업 폴더에서 불러와서 환경 변수를 설정한다.
loadEnvConfig(cwd());

const main = async () => {
  try {
    // 미리 정의된 설정(Setting) 정보(data)를 불러온다.
    const { settings } = data;
    await connectToDatabase(process.env.MONGODB_URI);

    // 기존 설정 데이터를 삭제한다.
    await Setting.deleteMany();

    // 설정 데이터를 넣는다.
    const createSetting = await Setting.insertMany(settings);
    console.log({
      createSetting,
      message: "Seed database successfully!",
    });
    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database.");
  }
};

main();
