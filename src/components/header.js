import React, { useMemo } from "react";
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

  return (
    <header>
      <nav>
        <Link to={"/"} key={"/"} className={styles.link}>
          Home
        </Link>
        <Link to={"/about"} key={"/about"} className={styles.link}>
          About
        </Link>
        <Link to={"/blog"} key={"/blog"} className={styles.link}>
          Blog
        </Link>
        <Link to={"/projects"} key={"/projects"} className={styles.link}>
          Projects
        </Link>
      </nav>
    </header>
  );
};
