import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${normalize}

  /* HTML elements */

  *,
  :after,
  :before {
    margin: 0;
    box-sizing: border-box;
    line-height: var(---lineHeight-normal);
  }
  
  body {
    font-family: var(--fontFamily);
    color: var(--color-black);
    background-color: var(--color-white);
  }

  button {
    padding: 0;
    cursor: pointer;
    background-color: inherit;
    border: none;
    outline: 0;
    
    :active,
    :hover,
    :focus {
      outline: 0;
    }
  }

  input {
    padding: 0;
    border: none;
    outline: none;
    background-color: inherit;
  }

  textarea {
    border: none;
    background-color: inherit;
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline: none;
  }
  
  /* CSS Custom Properties Definitions */

  @font-face {
    font-family: Interop-Light;
    src: url('../fonts/Interop-Light.woff') format('woff'), url('../fonts/Interop-Light.woff2') format('woff2'), url('../fonts/Interop-Light.otf') format('opentype');
    font-weight: 300;
    font-style: light;
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-Regular;
    src: url('../fonts/Interop-Regular.woff') format('woff'), url('../fonts/Interop-Regular.woff2') format('woff2'), url('../fonts/Interop-Regular.otf') format('opentype');
    font-weight: 400;
    font-style: regular;
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-Medium;
    src: url('../fonts/Interop-Medium.woff') format('woff'), url('../fonts/Interop-Medium.woff2') format('woff2'), url('../fonts/Interop-Medium.otf') format('opentype');
    font-weight: 500;
    font-style: medium;
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-SemiBold;
    src: url('../fonts/Interop-SemiBold.woff') format('woff'), url('../fonts/Interop-SemiBold.woff2') format('woff2'), url('../fonts/Interop-SemiBold.otf') format('opentype');
    font-weight: 600;
    font-style: semibold;
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-Bold;
    src: url('../fonts/Interop-Bold.woff') format('woff'), url('../fonts/Interop-Bold.woff2') format('woff2'), url('../fonts/Interop-Bold.otf') format('opentype');
    font-weight: 700;
    font-style: bold;
    unicode-range: U+0000-U+FFFF;
  }

  @font-face {
    font-family: Interop-ExtraBold;
    src: url('../fonts/Interop-ExtraBold.woff') format('woff'), url('../fonts/Interop-ExtraBold.woff2') format('woff2'), url('../fonts/Interop-ExtraBold.otf') format('opentype');
    font-weight: 800;
    font-style: extrabold;
    unicode-range: U+0000-U+FFFF;
  }

  :root {
    --fontFamily: Interop-Medium, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --fontWeight-light: 300;
    --fontWeight-regular: 400;
    --fontWeight-medium: 500;
    --fontWeight-semibold: 600;
    --fontWeight-bold: 700;
    --fontWeight-extrabold: 800;
    --fontSize-root: 16px;
    --lineHeight-none: 1;
    --lineHeight-normal: 1.15;
    --lineHeight-relaxed: 1.5;
    --color-lightblue: #A4ABFF;
    --color-mainblue: #4D4DFF;
    --color-darkblue: #3239B2;
    --color-white: #F4F4F9;
    --color-black: #111A3D;
    --color-gray: #61637F;
    --color-midgray: #9EA0B8;
    --color-lightgray: #E6E7EF;
    --color-red: #F97384;
    --color-lightblue--02: #A4ABFF33;
    --color-lightblue--04: #A4ABFF66;
    --color-gray--04: #111A3D66;
    --color-midgray--04: #111A3D66;
    --color-midgray--08: #111A3DCC;
    --color-black--05: #111A3D80;
    --color-shadow: #111A3D33;
    --color-blurshadow: #111A3DCC;
    --color-blur: #F4F4F933;
  }

`;

export default GlobalStyle;
