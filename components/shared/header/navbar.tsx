// components/shared/header/navbar.tsx

"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { DropdownButton } from "./theme-toggle-button";
import { SideSheet } from "./side-sheet";

const Navbar = () => {
  return (
    <>
      <div className="font-bold text-lg md:text-xl text-nowrap">CCB Alliance</div>
      <ul className="hidden md:flex w-full justify-end space-x-4 items-center">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li className="buttons space-x-2 px-4">
          <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
            Login
          </Link>
          <Link href={"/register"} className={buttonVariants({ variant: "outline" })}>
            Sign Up
          </Link>
        </li>
      </ul>
      <div className="w-fit flex gap-4 items-center">
        <DropdownButton />
        <SideSheet />
      </div>
    </>
  );
};

export default Navbar;
