import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Pretendard font imports
import PretendardRegular from '../assets/fonts/Pretendard-Regular.woff2';
import PretendardBold from '../assets/fonts/Pretendard-Bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardRegular}) format('woff2'),
         url(${PretendardBold}) format('woff2');
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
    @media (max-width: 1200px) {
      font-size: 60%;
    }
    @media (max-width: 992px) {
      font-size: 58%;
    }
    @media (max-width: 768px) {
      font-size: 56%;
    }
    @media (max-width: 576px) {
      font-size: 54%;
    }
  }

  body {
    font-family: 'Pretendard', sans-serif;
    font-size: 1.6rem; /* 16px */
    line-height: 1.6;
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Prevent horizontal scroll */
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    outline: none;
  }

  /* Centered container with max width */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Responsive Typography */
  h1 {
    font-size: 2.4rem;
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h2 {
    font-size: 2rem;
    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  p, li {
    font-size: 1.6rem;
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

export default GlobalStyles;
