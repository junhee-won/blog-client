import styled from "styled-components";
import Head from "next/head";
import { NextPageContext } from "next";
import Link from "next/link";
import Image from "next/image";
import { useMedia } from "../../src/hooks/useMedia";
import apiHelper from "../../src/modules/apiHelper";
import Topbar from "../../src/components/common/Topbar";
import ErrorPage from "../_error";

interface Props {
  success: boolean;
  category: string;
  posts: PostType[];
}

interface PostType {
  id: number;
  created_at: string;
  title: string;
}

function CategoryPage({ success, category, posts }: Props) {
  const media = useMedia();

  if (!success) return <ErrorPage />;
  return (
    <Container>
      <Head>
        <title>{category}</title>
        <meta name="description" content={category} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar media={media} />
      {media === "mobile" ? (
        <>
          <MTitle>
            <h1>{category}</h1>
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
            <h1>{category}</h1>
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
  return { ...data, success: res.success };
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
  width: 1200px;
  height: 100px;
  margin-top: 10px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
`;

const MTitle = styled.div`
  position: relative;
  width: 95%;
  height: 100px;
  margin-top: 10px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
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
