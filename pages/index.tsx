import styled from "styled-components";
import Head from "next/head";
import { useMdeia } from "../src/hooks/useMedia";
import Header from "../src/components/common/Header";
import PageTopbar from "../src/components/common/PageTopbar";

export default function Home() {
  const media = useMdeia();
  console.log({ media });
  return (
    <Container>
      <Head>
        <title>준희의 블로그</title>
        <meta name="description" content="준희의 개발 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <PageTopbar />
      <Body></Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Body = styled.div``;
