import React, { useMemo } from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Posts } from "../components/posts";
import { Seo } from "../components/seo";

import { getSimplifiedPosts } from "../utils/blog-post-helpers";

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.nodes;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);
  const message = totalCount === 1 ? " post found." : " posts found.";

  return (
    <Layout>
      <Seo title={`Posts tagged: ${tag}`} />
      <article>
        <header>
          <div>
            <h1>
              <span>Posts tagged:</span> <span>{tag}</span>
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

export default TagTemplate;

export const pageQuery = graphql`
  query TagQuery($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { template: { eq: "post" }, tags: { in: [$tag] } }
      }
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
