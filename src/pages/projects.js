import React from "react";
import { Link } from "gatsby";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

import * as styles from "./projects.module.css";

const Projects = () => {
  return (
    <Layout>
      <Seo title="Projects" />
      <article>
        <header>
          <h1>Projects</h1>
        </header>
        <section className={styles.grid}>
          <div className={styles.item}>
            <h2>Portfolio</h2>
            <p className={styles.description}>
              Personal website built with Gatsby 4.
            </p>
            <div className={styles.linkContainer}>
              <Link to={"/"} key={"/"} className={styles.link}>
                Demo
              </Link>
              <a
                key="writinginlee.com"
                href="https://github.com/writinginlee/writinginlee.com"
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                Source
              </a>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Projects;
