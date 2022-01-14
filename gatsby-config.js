// Build environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  siteMetadata: {
    title: "Portfolio",
    author: {
      name: "writinginlee",
    },
    description: "Welcome to my personal website!",
    siteUrl: "https://writinginlee.com",
    feedUrl: "https://writinginlee.com/rss.xml",
    social: {
      twitter: "writinginlee",
    },
  },
  plugins: [
    // Metadata
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Portfolio",
        short_name: "Portfolio",
        description: "Welcome to my personal website!",
        start_url: "/",
        background_color: "white",
        theme_color: "#0e55b3",
        display: "minimal-ui",
        icon: "src/icons/favicon.png",
        cache_busting_mode: "none",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/icon-*"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                });
              });
            },
            query: `
                {
                  allMarkdownRemark(
                    limit: 30
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: { frontmatter: { template: { eq: "post" } } }
                  ) {
                    nodes {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              `,
            output: "/rss.xml",
            title: "Portfolio | RSS Feed",
          },
        ],
      },
    },
    "gatsby-plugin-robots-txt",
    // Images
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    // Data Sourcing
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog`,
      },
    },
    // Markdown
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-autolink-headers",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: {
              wrapperStyle: "margin-bottom: 1.0725rem",
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              showLineNumbers: true,
              prompt: {
                global: true,
              },
            },
          },
        ],
      },
    },
  ],
};
