import classNames from "classnames";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useThrottleFn } from "ahooks";

const SHOW_MAX_TOP = 80;

const menuItems = [
  {
    name: "主页",
    url: "/home",
  },
  {
    name: "简历",
    url: "/about",
  },
];

export default function Menu() {
  const [activeTab, setactiveTab] = useState("home");
  const [isShowOn, setisShowOn] = useState(true);

  const { run: onScroll } = useThrottleFn(
    () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      setisShowOn(top < SHOW_MAX_TOP);
    },
    { wait: 200 }
  );

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

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
