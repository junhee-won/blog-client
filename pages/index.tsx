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
  category: string;
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

  const convertDateFormat = (date: string): string => {
    return new Date(date).toISOString().split("T")[0];
  };

  if (media === "mobile") {
    return (
      <Container>
        <Head>
          <title>준희의 블로그</title>
          <meta name="description" content="준희의 개발 블로그" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header media={media} />
        <PageTopbar />
        <MPostsContainer>
          {posts?.map((post, index) => {
            return (
              <MPostBox key={index}>
                <MPostTitle>{post.title}</MPostTitle>
                <MPostBottom>
                  <MPostCategory>{post.category}</MPostCategory>
                  <MPostDate>{convertDateFormat(post.created_at)}</MPostDate>
                </MPostBottom>
              </MPostBox>
            );
          })}
        </MPostsContainer>
      </Container>
    );
  } else {
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
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Body = styled.div``;

const MPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MPostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 3px solid black;
  height: 100px;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
`;

const MPostTitle = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 500;
  overflow-x: hidden;
`;

const MPostBottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MPostCategory = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  overflow-x: hidden;
  color: gray;
`;

const MPostDate = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  overflow-x: hidden;
  color: gray;
`;
