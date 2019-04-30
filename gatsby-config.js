const home = require('os').homedir();

module.exports = {
  siteMetadata: {
    description: `The stories and adventures of two migrating owls.`,
    siteName: `The Owl Path`,
    siteUrl: `http://owl.cephea.de/`,
    title: `The Owl Path`,
  },
  plugins: [
    `gatsby-plugin-feed`,
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-ical`,
      options: {
        name: `events`,
        url: `https://p56-calendars.icloud.com/published/2/b5rWyG3PnwqB68JzYWutInzCp7qkzqZwg2Hjk2OzWeO_2VzVd-OAt5ptv5oInmm96ZJvFQj1QledKu0uwVCN-gsZLwBBhs3a5fo4TqPNDsg`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${home}/Resilio Sync/Owl Path`,
        name: `gallery`,
        ignore: [`**/\.*`, `**/Icon*`],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
            },
          },
        ],
      },
    },
  ],
};
