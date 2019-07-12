import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

export const Layout = ({ children, header }) => {
  const site = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  ).site.siteMetadata;
  return (
    <>
      <GlobalStyle />
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        <p>You are reading</p>
        <a href="/">
          <h1>{site.title}</h1>
        </a>
        <p>{site.description}</p>
      </footer>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: hsl(200, 100%, 12%);
    --primary-color-faded: hsla(200, 100%, 12%, 0.4);
    --primary-color-superfaded: hsla(200, 100%, 12%, 0.2);
    --font-size-small: .8rem;
  }
  body {
    font-family: 'Laila', serif;
    font-weight: 300;
    font-size: 20px;
    color: var(--primary-color);
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
  h1 {
    font-family: 'Amita', sans-serif;
    font-size: 2em;
    margin: 0;
    padding: 0;
    line-height: 1.4;
  }
  h2, h3, h4 {
    font-family: 'Amita', sans-serif;
  }
  a {
    color: #cc7000;
    text-decoration: none;
  }
  a:hover {
    color: darkorange;
  }
  blockquote {
    border-left: 3px solid var(--primary-color-superfaded);
    margin: 0;
    padding: 0 0 0 0.5em;
  }
  img[data-gallery-source]:hover {
    cursor: pointer;
  }
  footer {
    max-width: 900px;
    margin: auto;
    padding: 2em;
    border-top: 1px solid #ccc;
    background-color: #fafafa;
    text-align: center;
    p {
      margin: 0;
    }
    h1 {
      margin: 0.2em 0;
    }
  }
  @media only screen and (max-width: 800px) {
    body {
      font-size: 16px;
    }
  }
  @media (max-height: 700px) and (orientation: landscape) {
    footer {
      display: none;
    }
    body {
      background-color: black;
    }
  }
`;
