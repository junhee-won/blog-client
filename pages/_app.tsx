import "../styles/globals.css";
import "../styles/stackoverflow-dark.min.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

const theme = {
  colors: {
    primary: "#D3563C",
    secondary: "#E8E1D7",
    danger: "#dc3545",
  },
};

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
