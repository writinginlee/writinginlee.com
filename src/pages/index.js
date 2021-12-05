import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Seo } from "../components/seo";

const Index = ({ data }) => {
  const title = data.site.siteMetadata.title;

  return (
    <Layout>
      <Seo title={title} />
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
    ) {
      nodes {
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
