// lib/db/data/settings-data.ts

import { i18n } from "@/i18n-config";

export const settingsData = {
  settings: [
    {
      common: {
        isMaintenanceMode: false,
        defaultTheme: "light",
        defaultColor: "gold",
        pageSize: 9,
      },
      site: {
        name: "CC UNION",
        description: "Chung Cheong Business Association in Vietnam (CCBA)",
        keywords: "HCM, Chung Cheong, Business, Association, CCBA, Korea, Vietnam",
        url: "next-ccunion.vercel.app",
        logo: "/icons/logo.svg",
        slogan: "Business Association in Vietnam",
        author: "MINIU",
        copyright: "2022-2025 CCBA, All Rights Reserved",
        email: "support@miniu.kr",
        address: "Quan 7, TP. HCM, Vietnam",
        phone: "(+84) (0) 77-123-4567",
      },
      carousels: [
        {
          title: "F & B Business",
          buttonCaption: "See more",
          image: "/images/banner3.jpg",
          url: "/search?category=Food",
        },
        {
          title: "Best Business in Trade",
          buttonCaption: "Shop Now",
          image: "/images/banner1.jpg",
          url: "/search?category=Trade",
        },
        {
          title: "MemberShip Benefits",
          buttonCaption: "See More",
          image: "/images/banner2.jpg",
          url: "/search?category=Members",
        },
      ],
      availableLanguages: i18n.locales.map((locale) => ({
        code: locale.code,
        name: locale.name,
      })),
      defaultLanguage: i18n.defaultLocale,
    },
  ],
};
