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
  
  body {
    font-family: var(--fontFamily);
    color: var(--color-black);
    background-color: var(--color-white);
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
    --color-gray: #111A3D;
    --color-midgray: #9EA0B8;
    --color-lightgray: #E6E7EF;
    --color-red: #F97384;
    --color-lightblue--02: #A4ABFF33;
    --color-gray--04: #111A3D66;
    --color-midgray--04: #111A3D66;
    --color-midgray--08: #111A3DCC;
  }

`;

export default GlobalStyle;
