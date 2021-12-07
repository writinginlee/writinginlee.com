import React, { useMemo } from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Posts } from "../components/posts";
import { Seo } from "../components/seo";

import { getSimplifiedPosts } from "../utils/blog-post-helpers";

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);

  return (
    <Layout>
      <Seo title="Blog" description="Writings with no direction." />
      <article>
        <header>
          <div>
            <h1>Blog</h1>
          </div>
        </header>
        <section>
          <div>
            <Posts data={simplifiedPosts} showYears />
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
