import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

import favicon from "../icons/favicon.png";

export const Seo = (props) => {
  const { site } = useStaticQuery(
    graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription =
    props.description || site.siteMetadata.description || "";
  const lang = props.lang || "en";
  const meta = props.meta || [];
  const title = props.title;
  const defaultTitle =
    title === site.siteMetadata.title ? undefined : site.siteMetadata.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defer={false}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: site.siteMetadata.social.twitter || "",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <link rel="shortcut icon" type="image/png" href={favicon} />
    </Helmet>
  );
};
