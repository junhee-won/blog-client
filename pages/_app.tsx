import "../styles/globals.css";
import "../styles/stackoverflow-dark.min.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { theme } from "../styles/theme";

const GlobalStyle = createGlobalStyle<{ backgroundColor: string }>`
  body {
    background-color: ${(props) => props.backgroundColor};
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle backgroundColor={theme.colors.secondary} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
