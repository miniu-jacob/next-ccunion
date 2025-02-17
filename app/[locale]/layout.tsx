// app/[locale]/layout.tsx

import React from "react";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getSetting } from "@/lib/actions/setting.actions";
import { clog } from "@/lib/jlogger";
import { getMessages } from "next-intl/server";
import ClientProviders from "@/components/shared/client-providers";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  // 글로벌 설정을 불러온다.
  const {
    site: { slogan, name, description, url },
  } = await getSetting();

  const newUrl = process.env.NODE_ENV === "production" ? url : "http://localhost:3000";

  // clog.info("site", { slogan, name, description, url });
  // const newUrl = "http://localhost:3000";

  return {
    title: {
      template: `%s | ${name}`, // 글로벌 설정에서 가져온 name을 title에 넣어준다.
      default: `${name}. ${slogan}`, // 글로벌 설정에서 가져온 name과 slogan을 default에 넣어준다.
    },
    description: description, // 글로벌 설정에서 가져온 description을 description에 넣어준다.
    metadataBase: new URL(newUrl), // 글로벌 설정에서 가져온 url을 metadataBase에 넣어준다.
  };
}

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  // getSetting()을 통해 설정을 가져온다.
  const setting = await getSetting();
  const urlParams = await params;
  const locale = urlParams.locale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  clog.info("[layout] locale", locale);
  clog.info("[layout] messages", messages?.Home);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders setting={{ ...setting }}>{children}</ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
