import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

export const SEO = ({ children, description, title }) => {
  const site = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            siteName
            siteUrl
            title
          }
        }
      }
    `
  ).site.siteMetadata;
  return (
    <Helmet>
      <html lang="en" />

      <title itemProp="name" lang="en">
        {title || sitee.title}
      </title>

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <meta name="description" content={description || site.description} />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="og:title" content={title || site.title} />
      <meta name="og:description" content={description || site.description} />
      <meta name="og:type" content="website" />
      <meta name="og:locale" content="en_GB" />
      <meta name="og:url" content={site.siteUrl} />
      <meta property="og:site_name" content={site.siteName} />

      {children}
    </Helmet>
  );
};
