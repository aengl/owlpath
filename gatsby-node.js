const path = require(`path`);
const schedule = require('./src/schedule');

exports.onCreateNode = async ({ node, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      name: 'layout',
      node,
      value: 'blog',
    });
    actions.createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
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
              layout
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
        path: slug,
        component: path.resolve(`./src/templates/${node.fields.layout}.js`),
        context: { slug },
      });
    }
  });
};
