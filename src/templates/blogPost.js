import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const description = post.frontmatter.description || post.excerpt;
  const title = post.frontmatter.title;
  const html = post.html;
  const date = post.frontmatter.date;
  const authorsList = post.frontmatter.authors;
  const authors = authorsList.join(" ");

  return (
    <Layout>
      <Seo title={title} description={description} />
      <article>
        <header>
          <h1>{title}</h1>
          {date} {` | ${authors}`}
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
