import styled from "styled-components";
import Head from "next/head";
import { NextPageContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { useMedia } from "../../src/hooks/useMedia";
import apiHelper from "../../src/modules/apiHelper";
import ErrorPage from "../_error";

interface Props {
  id: number;
  success: boolean;
  category: string;
  posts: PostType[];
}

interface PostType {
  id: number;
  created_at: string;
  title: string;
}

function CategoryPage({ success, category, posts, id }: Props) {
  const media = useMedia();

  const ogUrl = `https://junhee.kr/category/${id}`;

  if (!success) return <ErrorPage />;
  return (
    <Container>
      <Head>
        <title>{category}</title>
        <meta name="description" content={category} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={category} />
        <meta property="og:site_name" content="개발이 개발새발" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:description" content="개발새발 개발 블로그" />
        <meta
          property="og:image"
          content="https://d1qlsar6961fb5.cloudfront.net/etc/og-image.png"
        />
      </Head>
      {media === "mobile" ? (
        <>
          <MTitle>
            <TitleText>{category}</TitleText>
            <Link href="/">
              <HomeIcon>
                <Image src="/home.svg" alt="home page" width={50} height={50} />
              </HomeIcon>
            </Link>
          </MTitle>
          <PostContainer>
            {posts?.map((post, index) => {
              return (
                <Link href={`/post/${post.id}`} key={index}>
                  <MPost>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{post.created_at}</PostDate>
                  </MPost>
                </Link>
              );
            })}
          </PostContainer>
        </>
      ) : (
        <>
          <Title>
            <TitleText>{category}</TitleText>
            <Link href="/">
              <HomeIcon>
                <Image src="/home.svg" alt="home page" width={50} height={50} />
              </HomeIcon>
            </Link>
          </Title>
          <PostContainer>
            {posts?.map((post, index) => {
              return (
                <Link href={`/post/${post.id}`} key={index}>
                  <Post>
                    <PostTitle>{post.title}</PostTitle>
                    <PostDate>{post.created_at}</PostDate>
                  </Post>
                </Link>
              );
            })}
          </PostContainer>
        </>
      )}
    </Container>
  );
}

CategoryPage.getInitialProps = async ({ query }: NextPageContext) => {
  const res = await apiHelper({
    url: `${process.env.NEXT_PUBLIC_API_GET_POSTS_BY_CATEGORY}${query?.id}`,
    method: "GET",
  });
  const data = res.data;
  return { ...data, success: res.success, id: query?.id };
};

export default CategoryPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: #4e5684;
`;

const TitleText = styled.h1`
  text-align: center;
  line-height: 50px;
  font-size: 40px;
  color: white;
  overflow-x: hidden;
`;

const MTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 150px;
  height: auto;
  background-color: #4e5684;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding-top: 20px;
`;

const Post = styled.div`
  width: 1200px;
  border: 3px solid black;
  height: 80px;
`;

const MPost = styled.div`
  width: 95vw;
  border: 3px solid black;
  height: 80px;
`;

const PostTitle = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  padding-left: 20px;
  overflow: hidden;
`;

const PostDate = styled.div`
  height: 20px;
  line-height: 20px;
  font-size: 15px;
  padding-left: 20px;
  color: gray;
`;

const HomeIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
`;
