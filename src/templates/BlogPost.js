import { graphql } from 'gatsby';
import React from 'react';
import { Layout } from '../components/Layout';
import styled from 'styled-components';

export default ({ data }) => {
  const { title } = data.post.frontmatter;
  const { html } = data.post;
  return (
    <Layout>
      <Wrapper>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Wrapper>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        date
        title
      }
      html
    }
  }
`;

const Wrapper = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 5%;
  h2 {
    margin: 2em 0 0 0;
  }
  p {
    text-align: justify;
  }
  img {
    width: 100%;
    display: block;
  }
  img + em,
  .gatsby-resp-image-wrapper + em {
    font-size: var(--font-size-small);
    display: block;
    text-align: center;
  }
`;
