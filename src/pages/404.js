import React from 'react';
import { createGlobalStyle } from 'styled-components';

export default () => (
  <>
    <GlobalStyle />
    <h1>404</h1>
    <p>No owls here</p>
  </>
);

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
  }
  body {
    display: flex;
    align-self: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    font-family: 'Laila', serif;
    font-size: 20px;
  }
  h1 {
    font-family: 'Amita', sans-serif;
    font-size: 4em;
    margin: 0;
  }
`;
