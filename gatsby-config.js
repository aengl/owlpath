module.exports = {
  siteMetadata: {
    description: `The stories and adventures of two migrating owls.`,
    siteName: `The Owl Path`,
    siteUrl: `http://owl.cephea.de/`,
    title: `The Owl Path`,
  },
  plugins: [
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-ical`,
      options: {
        name: `events`,
        url: `https://p56-calendars.icloud.com/published/2/b5rWyG3PnwqB68JzYWutInzCp7qkzqZwg2Hjk2OzWeO_2VzVd-OAt5ptv5oInmm96ZJvFQj1QledKu0uwVCN-gsZLwBBhs3a5fo4TqPNDsg`,
      },
    },
  ],
};
