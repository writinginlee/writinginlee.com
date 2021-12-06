import React from "react";
import { graphql, Link } from "gatsby";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

import * as styles from "./blog-post.module.css";

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const description = post.frontmatter.description || post.excerpt;
  const { tags, title, date } = post.frontmatter;
  const html = post.html;
  const authorsList = post.frontmatter.authors;
  const authors = authorsList.join(" ");

  return (
    <Layout>
      <Seo title={title} description={description} />
      <article>
        <header className={styles.header}>
          <h1>{title}</h1>
          {tags && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Link key={tag} to={`/tags/${tag}`} className={styles.link}>
                  {tag}
                </Link>
              ))}
            </div>
          )}
          <span className={styles.postDetails}>
            {date} {` | ${authors}`}{" "}
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

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPost($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        authors
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
