// lib/db/models/setting.model.ts

import { Schema, model, models, Model, Document } from "mongoose";
import { ISettingInput } from "@/types";

// 1). Document 인터페이스를 상속받아 ISetting을 정의한다.
export interface ISetting extends Document, ISettingInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2). Setting 모델 스키마를 정의한다.
const settingSchema = new Schema<ISetting>(
  {
    // common 설정
    common: {
      pageSize: { type: Number, required: true, default: 4 },
      isMaintenanceMode: { type: Boolean, required: true, default: false },
      defaultTheme: { type: String, required: true, default: "light" },
      defaultColor: { type: String, required: true, default: "blue" },
    },

    // 사이트 설정
    site: {
      name: { type: String, required: true },
      url: { type: String, required: true },
      logo: { type: String, required: true },
      slogan: { type: String, required: true },
      description: { type: String, required: true },
      keywords: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      author: { type: String, required: true },
      copyright: { type: String, required: true },
      address: { type: String, required: true },
    },
    carousels: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        buttonCaption: { type: String, required: true },
      },
    ],

    // 사용 가능 언어
    availableLanguages: [
      {
        name: { type: String, required: true, set: (value: string) => Buffer.from(value).toString("utf8") },
        code: { type: String, required: true },
      },
    ],
    defaultLanguage: { type: String, required: true },
  },
  { timestamps: true },
);

// 3). Setting 모델을 생성한다.
const Setting: Model<ISetting> = models.Setting || model("Setting", settingSchema);

export default Setting;
