"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  title: string;
  icon: React.ReactNode;
};

const isActive = (href: string, pathName: string) => {
  console.log("pathName", pathName, href);
  return pathName.indexOf(href) >= 0;
};

const MenuLink = ({ href, title, icon }: Props) => {
  const pathName = usePathname();
  return (
    <Link
      className={cn(
        "flex flex-row text-2xl items-center gap-1 px-4 py-2 hover:bg-foreground/10 transition-colors duration-200",
        isActive(href, pathName) &&
          "bg-primary text-white hover:text-foreground"
      )}
      href={href}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  );
};

export default MenuLink;
