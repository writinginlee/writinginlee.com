import React, { useMemo, useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

import * as styles from "./header.module.css";

import {
  getSimplifiedPosts,
  getCategoriesFromPosts,
} from "../utils/blog-post-helpers";

export const Header = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query Category {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              category
            }
          }
        }
      }
    `
  );

  const simplifiedPosts = useMemo(
    () => getSimplifiedPosts(allMarkdownRemark.nodes),
    [allMarkdownRemark.nodes]
  );

  const categories = useMemo(
    () => getCategoriesFromPosts(simplifiedPosts),
    [simplifiedPosts]
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onToggleHeader = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  };

  const onToggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
    setDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button
          onClick={onToggleMenu}
          className={menuOpen ? styles.menuOpen : styles.menu}
        >
          <span className={styles.hamburger}></span>
        </button>
        <nav className={menuOpen ? styles.navOpen : styles.nav}>
          <div className={styles.flex}>
            <Link to={"/"} key={"/"} className={styles.link}>
              Home
            </Link>
          </div>
          <div className={styles.flex}>
            <Link to={"/about"} key={"/about"} className={styles.link}>
              About
            </Link>
            <Link to={"/blog"} key={"/blog"} className={styles.link}>
              Blog
            </Link>
            <button
              className={styles.button}
              onClick={onToggleHeader}
              onBlur={onToggleHeader}
            >
              <span>Categories ▾</span>

              <ul
                className={dropdownOpen ? styles.submenuOpen : styles.submenu}
              >
                {categories.map((category) => (
                  <li key={category}>
                    {" "}
                    <Link
                      to={`/categories/${category.toLowerCase()}`}
                      key={category}
                      className={styles.subLink}
                    >
                      {category}
                    </Link>{" "}
                  </li>
                ))}
              </ul>
            </button>
            <Link to={"/projects"} key={"/projects"} className={styles.link}>
              Projects
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
