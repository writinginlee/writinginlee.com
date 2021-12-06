import React from "react";
import { Link } from "gatsby";

import github from "../icons/github.png";

import * as styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.flex}>
        <nav className={styles.nav}>
          <span className={styles.span}>© Portfolio 2021</span>
          <Link to={"/rss.xml"} key={"/rss.xml"} className={styles.link}>
            RSS
          </Link>
        </nav>
        <nav className={styles.nav}>
          <a
            href={"https://github.com/writinginlee"}
            title={"GitHub"}
            target="_blank"
            rel="noopener noreferrer"
            key={"https://github.com/writinginlee"}
            className={styles.link}
          >
            <span className={styles.span}>GitHub</span>
            <img src={github} alt="GitHub" width="20" height="20" />
          </a>
        </nav>
      </div>
    </footer>
  );
};
