import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useMedia } from "../src/hooks/useMedia";
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
  const media = useMedia();
  const [posts, setPosts] = useState<PostType[]>(newPosts);
  const [categories, setCategories] = useState<CategoryType[]>(allCategories);

  return (
    <Container>
      <Head>
        <title>개발자로 살아남기</title>
        <meta name="description" content="개발자로 살아남기" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header media={media} />
      <PageTopbar media={media} />
      {media === "mobile" ? (
        <MPostsContainer>
          {posts?.map((post, index) => {
            return (
              <Link href={`/post/${post.id}`} key={index}>
                <MPostBox>
                  {post.thumbnail && (
                    <MImageBox>
                      <Image
                        alt="thumbnail"
                        src={post.thumbnail}
                        width={167}
                        height={94}
                      />
                    </MImageBox>
                  )}
                  <Container>
                    <MPostTitle>{post.title}</MPostTitle>
                    <MPostBottom>
                      <MPostCategory>{post.category}</MPostCategory>
                      <MPostDate>{post.created_at}</MPostDate>
                    </MPostBottom>
                  </Container>
                </MPostBox>
              </Link>
            );
          })}
        </MPostsContainer>
      ) : (
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
                          width="330"
                          height="186"
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
          <RightContainr>
            <MainImage>
              <Image
                alt="메인 이미지"
                src="https://blog-image-bucket-123.s3.ap-northeast-2.amazonaws.com/etc/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-12-27+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+1.06.52.jpeg"
                width={250}
                height={250}
              />
            </MainImage>
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
          </RightContainr>
        </Body>
      )}
    </Container>
  );
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
  width: 100%;
  height: 100%;
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
  justify-content: flex-start;
  align-items: center;
  border: 3px solid black;
  height: 100px;
  width: 95vw;
  min-width: 200px;
`;

const MPostTitle = styled.div`
  width: 90%;
  height: 50px;
  margin-top: 10px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
`;

const MPostBottom = styled.div`
  display: flex;
  width: 90%;
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
  flex: 6;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 336px;
  height: 330px;
  border: 3px solid black;
`;

const MImageBox = styled.div`
  position: relative;
  height: 94px;
  width: 167px;
`;

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  align-self: center;
`;

const PostTitle = styled.div`
  width: 100%;
  height: 50px;
  margin: 10px 0 0;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 500;
  overflow-x: hidden;
`;

const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px 0;
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
  justify-content: center;
  align-items: flex-start;
  width: 1200px;
  gap: 10px;
  padding-top: 30px;
`;

const RightContainr = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MainImage = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  margin: 30px 0 0;
  border-radius: 50%;
  overflow: hidden;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 50px 0 0;
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
