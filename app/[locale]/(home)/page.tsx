// app/(home)/page.tsx

import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations();

  // clog.info("Current translations: ", t("Home.See More"));
  return (
    <div className="text-center">
      <h1 className="text-center p-10">Home Page Content</h1>
      <p>{t("Home.See More")}</p>
    </div>
  );
}
