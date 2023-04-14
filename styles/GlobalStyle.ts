import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${theme.colors.secondary};
  }
`;

export { GlobalStyle };
