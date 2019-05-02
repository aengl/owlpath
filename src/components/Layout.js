import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
      <Main>{children}</Main>
      <Footer>
        <FooterContent>
          <p>You are reading</p>
          <h1>{site.title}</h1>
          <p>{site.description}</p>
        </FooterContent>
      </Footer>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: hsl(200, 100%, 12%);
    --primary-color-faded: hsla(200, 100%, 12%, 0.4);
    --primary-color-superfaded: hsla(200, 100%, 12%, 0.2);
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
  a {
    color: black;
    text-decoration: none;
  }
  p a {
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
  @media only screen and (max-width: 800px) {
    body {
      font-size: 16px;
    }
  }
`;

const Main = styled.main`
  padding: 5%;
`;

const Footer = styled.footer`
  border-top: 1px solid #ccc;
  padding: 2em;
  background-color: #fafafa;
`;

const FooterContent = styled.div`
  max-width: 900px;
  margin: auto;
  text-align: center;
  p {
    margin: 0;
  }
  h1 {
    margin: 0.2em 0;
  }
`;
