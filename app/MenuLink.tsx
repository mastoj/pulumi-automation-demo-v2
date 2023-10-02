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
  return pathName === href;
};

const MenuLink = ({ href, title, icon }: Props) => {
  const pathName = usePathname();
  return (
    <Link
      className={cn(
        "flex flex-row text-2xl items-center gap-1 px-4 py-2 hover:bg-secondary-foreground hover:text-secondary",
        isActive(href, pathName) && "bg-primary text-white"
      )}
      href={href}
    >
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  );
};

export default MenuLink;
