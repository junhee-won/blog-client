import styled from "styled-components";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useMdeia } from "../src/hooks/useMedia";
import Header from "../src/components/common/Header";
import PageTopbar from "../src/components/common/PageTopbar";
import apiHelper from "../src/modules/apiHelper";

interface PostType {
  id: number;
  category_id: number;
  title: string;
  content: string;
  public: number;
  created_at: string;
  updated_at: string;
  uat: string;
}

export default function Home() {
  const media = useMdeia();
  const [posts, setPosts] = useState<PostType[]>();

  useEffect(() => {
    (async function () {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_GET_NEW_POST,
        method: "GET",
      });
      console.log(res);
      if (res !== "error") {
        setPosts(res);
      }
    })();
  }, []);

  return (
    <Container>
      <Head>
        <title>준희의 블로그</title>
        <meta name="description" content="준희의 개발 블로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header media={media} />
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
