import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useMedia } from "../src/hooks/useMedia";
import Header from "../src/components/common/Header";
import apiHelper from "../src/modules/apiHelper";

interface Props {
  posts: PostType[];
  categories: CategoryType[];
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

function Home({ posts, categories }: Props) {
  const media = useMedia();

  return (
    <Container>
      <Head>
        <title>개발이 개발새발</title>
        <meta name="description" content="개발이 개발새발" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="google-site-verification"
          content="NdpeE1O9cq2cINgWWi4KQsDytrXaSMknBnf7psY5oyE"
        />
      </Head>
      <Header media={media} />
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
                        priority
                        sizes="167px"
                        width={167}
                        height={94}
                        placeholder="empty"
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
          <LeftContainer>
            <Temp>
              <Image
                alt="메인 이미지"
                src="/under-construction.svg"
                width={200}
                height={200}
              />
            </Temp>
          </LeftContainer>
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
                          priority
                          sizes="276px"
                          width="276"
                          height="155"
                          placeholder="empty"
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
                src="/under-construction.svg"
                width={200}
                height={200}
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
  const postsRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_NEW_POST,
    method: "GET",
  });
  const posts = postsRes.success ? postsRes.data : [];

  const categoriesRes = await apiHelper({
    url: process.env.NEXT_PUBLIC_API_GET_ALL_CATEGORIES,
    method: "GET",
  });
  const categories = categoriesRes.success ? categoriesRes.data : [];
  return { posts, categories };
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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

const MPostTitle = styled.h3`
  width: 90%;
  height: 50px;
  margin-top: 10px;
  text-align: center;
  line-height: 50px;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 588px;
  padding-top: 24px;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 282px;
  height: 300px;
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
  height: 155px;
  align-self: center;
`;

const PostTitle = styled.h3`
  width: 282px;
  height: 60px;
  margin: 15px 0 15px;
  padding: 10px;
  text-align: center;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PostBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px 0;
`;

const PostCategory = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray;
`;

const PostDate = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 1200px;
  gap: 24px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 282px;
`;

const RightContainr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 282px;
`;

const MainImage = styled.div`
  margin-top: 50px;
  width: 200px;
  height: 200px;
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
  border: 3px solid black;
  padding-bottom: 20px;
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
  height: 50px;
  border-bottom: 3px solid black;
  line-height: 50px;
  font-size: 25px;
  text-align: center;
`;

const CategoryBox = styled.div`
  width: 95%;
`;

const Temp = styled.div`
  margin-top: 200px;
  width: 200px;
  height: 200px;
`;
