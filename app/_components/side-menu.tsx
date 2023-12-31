import Link from "next/link";
import React from "react";
import { AiFillAppstore, AiFillGithub } from "react-icons/ai";
import MenuLink from "./menu-link";
import { ThemeToggle } from "@/app/_components/theme-toggle";

type Props = {};

const menuItems = [
  {
    title: "Resource groups",
    href: "/resource-groups",
    icon: <AiFillAppstore size={28} />,
  },
  {
    title: "Repositories",
    href: "/repositories",
    icon: <AiFillGithub size={28} />,
  },
];

const SideMenu = (props: Props) => {
  return (
    <div className="h-screen border-r shadow-lg">
      <div className="w-full flex flex-row justify-between items-center p-4 gap-4">
        <h1 className="text-4xl">Automation demo</h1>
        <ThemeToggle />
      </div>
      <ul>
        {menuItems.map((item) => (
          <li key={item.href}>
            <MenuLink {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
