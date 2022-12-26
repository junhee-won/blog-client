import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMdeia } from "../src/hooks/useMedia";
import Header from "../src/components/common/Header";
import PageTopbar from "../src/components/common/PageTopbar";
import apiHelper from "../src/modules/apiHelper";

interface Props {
  newPosts: PostType[];
  allCategories: CategoryType[];
}
interface PostType {
  id: number;
  title: string;
  created_at: string;
  category: string;
  thumbnail: string;
}

interface CategoryType {
  id: number;
  name: string;
  children: {
    id: number;
    name: string;
  }[];
}

function Home({ newPosts, allCategories }: Props) {
  const media = useMdeia();
  const [posts, setPosts] = useState<PostType[]>(newPosts);
  const [categories, setCategories] = useState<CategoryType[]>(allCategories);

  if (media === "mobile") {
    return (
      <Container>
        <Head>
          <title>개발자로 살아남기</title>
          <meta name="description" content="개발자로 살아남기" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header media={media} />
        <PageTopbar />
        <MPostsContainer>
          {posts?.map((post, index) => {
            return (
              <Link href={`/post/${post.id}`} key={index}>
                <MPostBox>
                  <MPostTitle>{post.title}</MPostTitle>
                  <MPostBottom>
                    <MPostCategory>{post.category}</MPostCategory>
                    <MPostDate>{post.created_at}</MPostDate>
                  </MPostBottom>
                </MPostBox>
              </Link>
            );
          })}
        </MPostsContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <Head>
          <title>개발자로 살아남기</title>
          <meta name="description" content="개발자로 살아남기" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header media={media} />
        <PageTopbar />
        <Body>
          <PostsContainer>
            {posts?.map((post, index) => {
              return (
                <Link href={`/post/${post.id}`} key={index}>
                  <PostBox>
                    <PostTitle>{post.title}</PostTitle>
                    {post.thumbnail && (
                      <ImageBox>
                        <Image
                          alt="thumbnail"
                          src={post.thumbnail}
                          fill
                          style={{ objectFit: "contain" }}
                        />
                      </ImageBox>
                    )}
                    <PostBottom>
                      <PostCategory>{post.category}</PostCategory>
                      <PostDate>{post.created_at}</PostDate>
                    </PostBottom>
                  </PostBox>
                </Link>
              );
            })}
          </PostsContainer>
          <CategoryContainer>
            <CategoryTitle>카테고리</CategoryTitle>
            {categories.map((parentCategory, index) => {
              return (
                <CategoryBox key={index}>
                  <Link href={`/category/${parentCategory.id}`}>
                    <Category>{parentCategory.name}</Category>
                  </Link>
                  {parentCategory?.children?.map(
                    (childCategory, childIndex) => {
                      return (
                        <Link
                          href={`/category/${childCategory.id}`}
                          key={childIndex}
                        >
                          <ChildCategory>{childCategory.name}</ChildCategory>
                        </Link>
                      );
                    }
                  )}
                </CategoryBox>
              );
            })}
          </CategoryContainer>
        </Body>
      </Container>
    );
  }
}

Home.getInitialProps = async () => {
  const newPostsRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_NEW_POST,
    method: "GET",
  });
  const newPosts = newPostsRes === "error" ? [] : newPostsRes;

  const categoriesRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_ALL_CATEGORIES,
    method: "GET",
  });
  const allCategories = categoriesRes === "error" ? [] : categoriesRes;
  return { newPosts, allCategories };
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
`;

const MPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
`;

const MPostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 3px solid black;
  height: 100px;
  width: 95vw;
  min-width: 200px;
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

const PostsContainer = styled.div`
  flex: 7;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding-top: 10px;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 3px solid black;
  height: 300px;
  padding: 10px;
`;

const ImageBox = styled.div`
  position: relative;
  height: 180px;
  width: 80%;
  align-self: center;
`;

const PostTitle = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 500;
  overflow-x: hidden;
`;

const PostBottom = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const PostCategory = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  overflow-x: hidden;
  color: gray;
`;

const PostDate = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  font-weight: 500;
  overflow-x: hidden;
  color: gray;
`;

const Body = styled.div`
  display: flex;
  width: 95vw;
  gap: 10px;
`;

const CategoryContainer = styled.div`
  margin-top: 20px;
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const Category = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  font-size: 20px;
  border-bottom: 2px solid black;
`;

const ChildCategory = styled.div`
  margin-left: 20%;
  width: 80%;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  font-size: 20px;
  border-bottom: 2px solid black;
`;

const CategoryTitle = styled.div`
  width: 100%;
  border-bottom: 3px solid black;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  text-align: center;
`;

const CategoryBox = styled.div`
  width: 95%;
`;
