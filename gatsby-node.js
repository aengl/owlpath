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
  const result = await graphql(`
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
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fields && node.fields.slug) {
      const { slug } = node.fields;
      actions.createPage({
        component,
        context: { slug },
        path: slug,
      });
    }
  });
};
