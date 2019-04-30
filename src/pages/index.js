import { graphql } from 'gatsby';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';
import Lightbox from 'react-images';

export default ({ data }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <Layout>
      <Schedule>
        {getScheduleEvents(data).map(({ summary }) => (
          <li key={summary}>{summary}</li>
        ))}
      </Schedule>

      <Gallery>
        {getGalleryThumbs(data).map(({ name, src }) => (
          <li key={src}>
            <img
              src={src}
              alt={name}
              onClick={() => {
                setLightboxOpen(true);
              }}
            />
          </li>
        ))}
      </Gallery>
      <Lightbox
        images={getGalleryImages(data)}
        isOpen={lightboxOpen}
        currentImage={imageIndex}
        onClickPrev={() => {
          setImageIndex(imageIndex - 1);
        }}
        onClickNext={() => {
          setImageIndex(imageIndex + 1);
        }}
        onClose={() => {
          setLightboxOpen(false);
        }}
        backdropClosesModal={true}
        showThumbnails={true}
      />

      <Posts>
        {getPosts(data).map(({ html, slug, title }) => (
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
};

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
      filter: { extension: { in: ["jpg"] } }
    ) {
      edges {
        node {
          extension
          modifiedTime
          childImageSharp {
            thumb: resize(width: 440, height: 440) {
              src
              originalName
            }
            full: resize(width: 1440) {
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
          html
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
    src: node.childImageSharp.thumb.src,
  }));
}

function getGalleryImages(data) {
  return data.gallery.edges.map(({ node }) => ({
    name: node.childImageSharp.full.originalName,
    src: node.childImageSharp.full.src,
  }));
}

function getPosts(data) {
  return data.posts.edges.map(({ node }) => ({
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

const Gallery = styled.ul`
  display: flex;
  max-width: 900px;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 5em auto 5em;
  padding: 0;
  li {
    height: 220px;
    margin: 1px;
    cursor: pointer;
  }
  img {
    height: inherit;
  }
  @media only screen and (max-width: 800px) {
    li {
      width: 100%;
      height: auto;
    }
    img {
      width: inherit;
      height: auto;
    }
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
