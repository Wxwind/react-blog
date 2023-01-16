import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import useThrottleFn from "@/utils/hooks/useThrottleFn";

const SHOW_MAX_TOP = 80;

const menuItems = [
  {
    name: "主页",
    url: "/home",
  },
  {
    name: "文章",
    url: "/posts",
  },
];

function Menu() {
  const [activeTab, setactiveTab] = useState("home");
  const [isShowOn, setisShowOn] = useState(true);

  const onScroll = useThrottleFn(() => {
    const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    setisShowOn(top < SHOW_MAX_TOP);
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div>
      <header className={isShowOn ? styles.menuShowOn : styles.menuShowOff}>
        <nav className={styles.nav}>
          {menuItems.map((menuItem) => (
            <Link
              to={menuItem.url}
              className={classNames(styles.menuItem, { [styles.activeTab]: activeTab === menuItem.name })}
              onClick={() => setactiveTab(menuItem.name)}
              key={menuItem.url}
            >
              {menuItem.name}
              <span className={classNames(styles.underline, { [styles.visiable]: activeTab === menuItem.name })}></span>
            </Link>
          ))}
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export default Menu;
