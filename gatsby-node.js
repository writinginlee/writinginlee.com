const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
      type SiteSiteMetadata {
        author: Author
        siteUrl: String
        social: Social
      }
  
      type Author {
        name: String
      }
  
      type Social {
        twitter: String
      }
  
      type MarkdownRemark implements Node {
        frontmatter: Frontmatter
        fields: Fields
      }
  
      type Frontmatter {
        title: String
        description: String
        date: Date @dateformat
        updated_date: Date @dateformat
        category: String
        tags: [String]
        authors: [String]
        template: String
      }
  
      type Fields {
        slug: String
      }
    `);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode, trailingSlash: false });

    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define templates
  const blogPost = path.resolve("./src/templates/blog-post.js");
  const about = path.resolve("./src/templates/about.js");

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            frontmatter {
              category
              tags
              template
            }
            fields {
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      "There was an error loading your blog posts",
      result.errors
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;
  const tagSet = new Set();
  const categorySet = new Set();

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      if (post.frontmatter.template === "about") {
        createPage({
          path: post.fields.slug,
          component: about,
          context: {
            id: post.id,
          },
        });
        console.log("return here")
        console.log(post)
        return;
      }

      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      if (post.frontmatter.tags) {
        post.frontmatter.tags.forEach((tag) => {
          tagSet.add(tag);
        });
      }

      if (post.frontmatter.category) {
        categorySet.add(post.frontmatter.category);
      }

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });
  }

  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${tag}`,
      component: path.resolve("./src/templates/tag.js"),
      context: {
        tag,
      },
    });
  });

  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${category.toLowerCase()}`,
      component: path.resolve("./src/templates/category.js"),
      context: {
        category,
      },
    });
  });
};
