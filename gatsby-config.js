require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Site Title",
    menuLinks: [
      {
        name: "link",
        link: "/link",
      },
      {
        name: "link",
        link: "/link",
      },
      {
        name: "link",
        link: "/link",
      },
      {
        name: "link",
        link: "/link",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        custom: {
          families: ["Stencil", "Helvetica Neue LT Pro"],
          // urls: ["fonts.css"],
          urls: ["./fonts/fonts.css"],
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Website Name`,
    //     short_name: `Website Name`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#ffffff`,
    //     display: `standalone`,
    //     icon: `src/images/icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `Martinez-2`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: ({ node, key, value }) => post => `/${post.uid}`,
        schemas: {
          artist: require("./src/schemas/artist.json"),
          about_page: require("./src/schemas/about_page.json"),
        },
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/global/layout.js`),
      },
    },
  ],
};
