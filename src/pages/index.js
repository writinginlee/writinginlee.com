import React, { useMemo } from "react";
import { graphql, Link } from "gatsby";

import { Layout } from "../components/layout";
import { Posts } from "../components/posts";
import { Seo } from "../components/seo";

import { getSimplifiedPosts } from "../utils/blog-post-helpers";

import * as styles from "./index.module.css";

const Index = ({ data }) => {
  const title = data.site.siteMetadata.title;
  const latest = data.latest.nodes;
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest]);

  return (
    <Layout>
      <Seo title={title} />
      <article>
        <header>
          <h1 className={styles.h1}>@writinginlee</h1>
          <p className={styles.p}>Under construction!</p>
          <p className={styles.p}>For a special someone...</p>
        </header>
        <section>
          <h2 className={styles.h2}>
            <span>Latest Articles</span> <Link to="/blog">View All</Link>
          </h2>
          <div>
            <Posts data={simplifiedLatest} />
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        title
      }
    }
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`;
