import React from "react";
import { Link } from "gatsby";

import * as styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer>
      <nav>
        <span className={styles.span}>© Portfolio 2021</span>
        <Link to={"/rss.xml"} key={"/rss.xml"} className={styles.link}>
          RSS
        </Link>
        <a
          href={"https://github.com/writinginlee"}
          title={"GitHub"}
          target="_blank"
          rel="noopener noreferrer"
          key={"https://github.com/writinginlee"}
          className={styles.link}
        >
          Github
        </a>
      </nav>
    </footer>
  );
};
