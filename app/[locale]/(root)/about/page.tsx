// app/[locale]/(root)/about/page.tsx

import { getTranslations } from "next-intl/server";
import React from "react";

const AboutPage = async () => {
  const t = await getTranslations("About");

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">{t("Introduction")}</h1>
      <p className="text-lg">{t("Guide Message")}</p>
      <p>
        Lorem ipsum dolor sit l, consectetur l elite. Dolor perspective quae nisi non, consequence ea navigation i it,
        lilo preferences aspersors quam molesting nescient nobs anim officio quos distinction nam? Lorem ipsum dolor sit
        l, consectetur l elite. Dolor perspective quae nisi non, consequence ea navigation i it, lilo preferences
        aspersors quam molesting nescient nobs anim officio quos distinction nam? Lorem ipsum dolor sit l, consectetur l
        elite. Dolor perspective quae nisi non, consequence ea navigation i it, lilo preferences aspersors quam
        molesting nescient nobs anim officio quos distinction nam? Lorem ipsum dolor sit l, consectetur l elite. Dolor
        perspective quae nisi non, consequence ea navigation i it, lilo preferences aspersors quam molesting nescient
        nobs anim officio quos distinction nam? Lorem ipsum dolor sit l, consectetur l elite. Dolor perspective quae
        nisi non, consequence ea navigation i it, lilo preferences aspersors quam molesting nescient nobs anim officio
        quos distinction nam?
      </p>
    </div>
  );
};

export default AboutPage;
