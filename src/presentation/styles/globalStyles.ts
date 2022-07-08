import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1280px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }

    background-color: ${({ theme }) => theme.colors.dark01};
    color: ${({ theme }) => theme.colors.light01};
  }
 
  button {
    border-style: solid;
    cursor: pointer;
    transition: 0.3s;
    &:hover:not(:disabled) {
      filter: brightness(0.8);
    }
  }

  a {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  #root {
    display: flex;
    min-height: 100vh;
    min-width: 100vw;
    height: 100%;
    width: 100%;
    > * {
      min-height: 100vh;
      min-width: 100vw;
      height: 100%;
      width: 100%;
    }
  }
`;
