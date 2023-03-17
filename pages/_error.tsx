import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import Header from "../src/components/common/Header";
import { useMedia } from "../src/hooks/useMedia";

export default function ErrorPage() {
  const media = useMedia();
  return (
    <Container>
      <Head>
        <title>!잘못된 접근!</title>
        <meta name="description" content="개발이 개발새발" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="띠요잉! 존재하지 않는 페이지 입니다"
        />
        <meta property="og:site_name" content="개발이 개발새발" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="개발새발 개발 블로그" />
        <meta
          property="og:image"
          content="https://d1qlsar6961fb5.cloudfront.net/etc/og-image.png"
        />
      </Head>
      <Header media={media} />
      <WarningWrapper>
        <ConeWrapper isMobile={media === "mobile"}>
          <Image src="/cone.svg" alt="cone icon" fill sizes="100%" priority />
        </ConeWrapper>
        <Text isMobile={media === "mobile"}>페이지가 존재하지 않습니다</Text>
        <ConeWrapper isMobile={media === "mobile"}>
          <Image src="/cone.svg" alt="cone icon" fill sizes="100%" priority />
        </ConeWrapper>
      </WarningWrapper>
      <Link href="/">
        <HomeWrapper isMobile={media === "mobile"}>
          <Image src="/home.svg" fill sizes="100%" priority alt="home icon" />
        </HomeWrapper>
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
  padding-top: 60px;
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const HomeWrapper = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: ${(props) => (props.isMobile ? "50px" : "150px")};
  height: ${(props) => (props.isMobile ? "50px" : "150px")};
  object-fit: contain;
`;

const ConeWrapper = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: ${(props) => (props.isMobile ? "30px" : "70px")};
  height: ${(props) => (props.isMobile ? "30px" : "70px")};
  object-fit: contain;
`;

const Text = styled.div<{ isMobile: boolean }>`
  font-size: ${(props) => (props.isMobile ? "20px" : "70px")};
`;
