import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';

export default ({ data }) => (
  <Layout>
    <Schedule>
      {getEvents(data).map(({ summary }) => (
        <li key={summary}>{summary}</li>
      ))}
    </Schedule>
    <Posts>
      {getPosts(data).map(({ html, title, slug }) => (
        <li key={slug}>
          <a href={slug}>
            <h1>{title}</h1>
          </a>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </li>
      ))}
    </Posts>
  </Layout>
);

export const query = graphql`
  {
    allIcal(sort: { fields: [start], order: ASC }) {
      edges {
        node {
          start
          end
          summary
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
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
    }
  }
`;

function getEvents(data) {
  return data.allIcal.edges
    .map(({ node }) => ({
      start: new Date(node.start).getTime(),
      end: new Date(node.end).getTime(),
      summary: node.summary,
    }))
    .filter(event => event.end > Date.now());
}

function getPosts(data) {
  return data.allMarkdownRemark.edges.map(({ node }) => ({
    html: node.html,
    slug: node.fields.slug,
    title: node.frontmatter.title,
  }));
}

const Schedule = styled.ul`
  font-family: 'Amita', sans-serif;
  text-align: center;
  list-style: none;
  margin: 50px auto;
  padding: 0;
  li:first-child:before,
  li:first-child:after {
    display: block;
    color: var(--primary-color-faded);
    font-size: 0.5em;
  }
  li:first-child:before {
    content: 'Currently:';
    margin-bottom: -0.5em;
  }
  li:first-child {
    font-size: 3em;
  }
  li:first-child:after {
    content: 'Soon:';
    margin-top: 1em;
  }
`;

const Posts = styled.ul`
  max-width: 800px;
  list-style: none;
  margin: auto;
  padding: 0;
  li {
    margin-top: 4em;
    font-size: 1em;
    text-align: justify;
    color: hsl(200, 20%, 30%);
  }
  img {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
  }
  time {
    font-size: 0.9em;
    color: var(--primary-color-faded);
  }
  @media only screen and (max-width: 800px) {
    margin: 1.2em;
  }
`;
