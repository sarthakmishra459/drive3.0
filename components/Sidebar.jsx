import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { CiImageOn } from "react-icons/ci";
import React, { useState, useMemo } from "react";
import { CiVault } from "react-icons/ci";
import { useAccount } from "../pages/AccountContext";

import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
  ImagesIcon,
} from "./icons";

const menuItems = [
  { id: 1, label: "Home", icon: HomeIcon, link: "/" },
  { id: 2, label: "Media", icon: VideosIcon, link: "/posts" },
  { id: 3, label: "Documents", icon: ArticleIcon, link: "/documents" },
  { id: 4, label: "Images", icon: UsersIcon, link: "/images" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const { account, setAccount } = useAccount();
  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const handleClick = () => {

    console.log("clicked Logout");

    setAccount(!account);

  };
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4 justify-start">
            <CiVault className="w-8 h-8 text-blue font-extrabold  " />
            <span
              className={classNames("mt-2 text-lg pb-2 font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Drive 3.0
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={index} className={classes}>
                <Link href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>

      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div onClick={handleClick} className="w-9">
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <button onClick={handleClick} className={classNames("text-md font-medium text-text-light")}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
