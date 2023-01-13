import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <Container>
      <Head>
        <title>!잘못된 접근!</title>
        <meta name="description" content="개발자로 살아남기" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text>페이지가 존재하지 않습니다</Text>
      <Link href="/">
        <Image src="/home.svg" alt="home page" width={200} height={200} />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  height: 100vh;
`;

const Text = styled.div`
  font-size: 100px;
`;
