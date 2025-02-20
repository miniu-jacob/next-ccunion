// components/shared/header/language-switcher.tsx

"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18n } from "@/i18n-config";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";

/**
 * 브라우저에서 NEXT_LOCALE 쿠키를 세팅하는 함수
 * - maxAge: 1년 (필요하면 조정)
 * - Secure: HTTPS 환경에서만 전송 (Vercel이라면 보통 자동 HTTPS)
 * - SameSite=Lax
 */
function setLocaleCookie(locale: string) {
  const maxAge = 60 * 60 * 24 * 365; // 1년
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${maxAge}; Secure; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const { locales } = i18n;
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="header-button h-16">
        <div className="flex items-center gap-1 text-base">
          <Image
            src={locales.find((l) => l.code === locale)?.icon || locales[0].icon}
            alt={"language"}
            width={28}
            height={28}
          />
          {locale.toUpperCase().slice(0, 2)}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="center">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={locale}>
          {locales.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.code}>
              {/* <div className="w-full flex items-center gap-2 text-sm">
               <Image src={c.icon} alt={c.name} width={28} height={28} />
               {c.name}
             </div> */}
              <Link
                href={pathname}
                locale={c.slug}
                className="w-full flex items-center gap-2 text-sm"
                onClick={() => {
                  // 사용자가 클릭 시, 쿠키를 먼저 세팅한 뒤에 이동
                  // prefix 없이 접속해도 쿠키로 locale 유지 가능
                  setLocaleCookie(c.slug);
                }}>
                <Image src={c.icon} alt={c.name} width={28} height={28} />
                {c.name}
              </Link>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
