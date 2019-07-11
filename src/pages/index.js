import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';

export default ({ data }) => (
  <Layout>
    <Schedule>
      {getScheduleEvents(data).map(({ summary }) => (
        <li key={summary}>{summary}</li>
      ))}
    </Schedule>
    <Gallery>
      {getGalleryThumbs(data).map(({ name, source }, i) => (
        <li key={source}>
          <img src={source} alt={name} />
        </li>
      ))}
    </Gallery>
    <Posts>
      {getPosts(data).map(({ excerpt, slug, title }) => (
        <li key={slug}>
          <a href={slug}>
            <h1>{title}</h1>
          </a>
          <p>{excerpt}</p>
        </li>
      ))}
    </Posts>
  </Layout>
);

export const query = graphql`
  {
    # Schedule
    schedule: allIcal(sort: { fields: [start], order: ASC }) {
      edges {
        node {
          start
          end
          summary
        }
      }
    }

    # Gallery
    gallery: allFile(
      sort: { fields: [modifiedTime], order: DESC }
      filter: {
        extension: { in: ["jpg", "jpeg"] }
        sourceInstanceName: { eq: "gallery" }
      }
    ) {
      edges {
        node {
          extension
          sourceInstanceName
          modifiedTime
          childImageSharp {
            thumb: resize(height: 800, quality: 70) {
              src
              originalName
            }
          }
        }
      }
    }

    # Posts
    posts: allMarkdownRemark(
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
          excerpt(pruneLength: 500)
        }
      }
    }
  }
`;

function getScheduleEvents(data) {
  return data.schedule.edges
    .map(({ node }) => ({
      start: new Date(node.start).getTime(),
      end: new Date(node.end).getTime(),
      summary: node.summary,
    }))
    .filter(event => event.end > Date.now());
}

function getGalleryThumbs(data) {
  return data.gallery.edges.map(({ node }) => ({
    name: node.childImageSharp.thumb.originalName,
    source: node.childImageSharp.thumb.src,
  }));
}

function getPosts(data) {
  return data.posts.edges.map(({ node }) => ({
    excerpt: node.excerpt,
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
  @media (orientation: landscape) {
    display: none;
  }
`;

const Gallery = styled.ul`
  display: flex;
  height: 440px;
  max-height: 70vw;
  list-style: none;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin: 0;
  padding: 0;
  border: 1px solid black;
  border-width: 1px 0 1px 0;
  li {
    display: inline-block;
    height: 100%;
    border-right: 5px solid black;
  }
  img {
    height: 100%;
  }
  @media (orientation: landscape) {
    height: 100vh;
    max-height: 100vh;
  }
`;

const Posts = styled.ul`
  max-width: 800px;
  list-style: none;
  margin: auto;
  padding: 5%;
  li {
    margin-top: 2em;
    font-size: 1em;
    text-align: justify;
    color: hsl(200, 20%, 30%);
  }
  a {
    display: inline-block;
  }
  time {
    font-size: 0.9em;
    color: var(--primary-color-faded);
  }
  @media (orientation: landscape) {
    display: none;
  }
`;
