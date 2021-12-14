import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

import * as styles from "./about.module.css";

const AboutTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const description = post.frontmatter.description || post.excerpt;
  const { title, date, updated_date } = post.frontmatter;
  const html = post.html;
  const authorsList = post.frontmatter.authors;
  const authors = authorsList.join(" ");

  return (
    <Layout>
      <Seo title={title} description={description} />
      <article>
        <header className={styles.header}>
          <h1>{title}</h1>
          <span className={styles.postDetails}>
            {date} {` | ${authors}`} <br />
            {updated_date ? `Updated on: ${updated_date}` : ""}
          </span>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </article>
    </Layout>
  );
};

export default AboutTemplate;

export const pageQuery = graphql`
  query About($id: String!) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        updated_date(formatString: "MMMM DD, YYYY")
        description
        authors
      }
    }
  }
`;
