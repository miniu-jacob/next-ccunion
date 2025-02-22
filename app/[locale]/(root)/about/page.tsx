// app/[locale]/(root)/about/page.tsx

import { clog } from "@/lib/jlogger";
import { getTranslations } from "next-intl/server";
import React from "react";

const AboutPage = async () => {
  const t = await getTranslations("About");

  const list1 = ["apple", "banana"];
  const list2 = ["banana", "orange"];
  const combined = new Set([...list1, ...list2]);
  clog.info(combined);
  clog.info([...combined]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">{t("Introduction")}</h1>
      <p className="text-lg">{t("Guide Message")}</p>
    </div>
  );
};

export default AboutPage;
