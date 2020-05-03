/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions }, options) => {
   
  actions.createPage({
    path: `${options.baseUrl}`,
    component: require.resolve(`./src/pages/index.tsx`),
  });
  actions.createPage({
    path: `${options.baseUrl}/projects`,
    component: require.resolve(`./src/pages/projects/index.tsx`)
  });
}