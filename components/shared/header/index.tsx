// components/shared/header/index.tsx

// import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggleButton } from "./theme-toggle-button";
import { SideSheet } from "./side-sheet";
import data from "@/lib/db/data/data";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./language-switcher";
import { Link } from "@/i18n/routing";

export default function Header() {
  const locale = useLocale();
  return (
    <header className="h-16 bg-background/40 sticky top-0 border-b px-8 backdrop-blur-sm flex items-center justify-between">
      {/* HEADER - 1: LOGO  */}
      <div className="flex items-center">
        <Link href={"/"}>
          <h1 className="font-bold text-lg md:text-xl text-nowrap">CCB Alliance</h1>
        </Link>
      </div>

      {/* HEADER -2: MENUS */}
      <div className="hidden md:flex w-full justify-end space-x-4 items-center">
        {data.headerMenus.map((menu) => (
          <Link key={menu.href} href={menu.href} className="text-base p-2">
            {menu.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex justify-end w-40 px-2">
        <LanguageSwitcher key={locale} />
      </div>
      {/* HEADER -3: LOGIN */}
      <div className="hidden md:flex items-center gap-2 px-2">
        <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
          Login
        </Link>
        <Link href={"/register"} className={buttonVariants({ variant: "outline" })}>
          Sign Up
        </Link>
      </div>
      <div className="w-fit flex gap-4 items-center">
        <div className="md:hidden flex justify-end w-40 ">
          <LanguageSwitcher key={locale} />
        </div>
        <ThemeToggleButton />
        <SideSheet />
      </div>
    </header>
  );
}
