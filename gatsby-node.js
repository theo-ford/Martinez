const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await graphql(`
    {
      allPrismicArtist {
        edges {
          node {
            id
            uid
          }
        }
      }
    }
  `);

  pages.data.allPrismicArtist.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.uid}`,
      component: path.resolve("src/templates/artist.js"),
      context: {
        uid: edge.node.uid,
      },
    });
  });
};
