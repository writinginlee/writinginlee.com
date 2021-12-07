import React, { useMemo } from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Posts } from "../components/posts";
import { Seo } from "../components/seo";

import { getSimplifiedPosts } from "../utils/blog-post-helpers";

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);
  const message = totalCount === 1 ? " post found." : " posts found.";

  return (
    <Layout>
      <Seo title={`Category: ${category}`} />
      <article>
        <header>
          <div>
            <h1>
              <span>Category:</span> <span>{category}</span>
            </h1>
            <p>
              <span>{totalCount}</span>
              {message}
            </p>
          </div>
        </header>
        <section>
          <Posts data={simplifiedPosts} />
        </section>
      </article>
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryQuery($category: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          category
        }
      }
    }
  }
`;
