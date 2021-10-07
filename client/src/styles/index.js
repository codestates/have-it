import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  /* HTML elements */

  *,
  :after,
  :before {
    box-sizing: border-box;
  }


`;

export default GlobalStyle;
