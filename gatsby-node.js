/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions: { createPage } }, options) => {
  const result = await graphql(`
    query {
      allMarkdownRemark{
        nodes {
          html
          id
          frontmatter {
            date
            path
            tags
            title
            priority
            position
          }
        }
      }
    }
  `)

  createPage({
    path: `${options.baseUrl}`,
    component: require.resolve(`./src/pages/index.js`),
    context: {
      pages: result.data,
      id: "abcd"
    }
  });
}