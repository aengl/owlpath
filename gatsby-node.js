const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const component = path.resolve(`./src/templates/BlogPost.js`);

exports.onCreateNode = async ({ node, actions, getNode }) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      name: 'slug',
      node,
      value: createFilePath({
        basePath: 'posts',
        getNode,
        node,
      }),
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const blogPosts = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  blogPosts.data.allMarkdownRemark.edges
    .filter(({ node }) => node.fields && node.fields.slug)
    .map(({ node }) => node.fields)
    .forEach(({ slug }) => {
      actions.createPage({
        path: slug,
        component,
        context: { slug },
      });
    });
};
