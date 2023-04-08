import "../styles/globals.css";
import "../styles/stackoverflow-dark.min.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#D3563C",
    secondary: "#E8E1D7",
    danger: "#dc3545",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
