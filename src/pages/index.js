import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { Layout } from '../components/Layout';

export default ({ data }) => {
  const events = data.allIcal.edges
    .map(({ node }) => ({
      start: new Date(node.start).getTime(),
      end: new Date(node.end).getTime(),
      summary: node.summary,
    }))
    .filter(event => event.end > Date.now());
  const sortedEvents = events.sort((a, b) => a.start - b.start);
  return (
    <Layout>
      <Schedule>
        {sortedEvents.map(({ summary }) => (
          <li key={summary}>{summary}</li>
        ))}
      </Schedule>
    </Layout>
  );
};

export const query = graphql`
  {
    allIcal {
      edges {
        node {
          start
          end
          summary
        }
      }
    }
  }
`;

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
