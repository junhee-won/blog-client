import styled from "styled-components";
import { NextPageContext } from "next";
import Link from "next/link";
import apiHelper from "../../src/modules/apiHelper";
import PageTopbar from "../../src/components/common/PageTopbar";

interface Props {
  category: string;
  posts: PostType[];
}

interface PostType {
  id: number;
  created_at: string;
  title: string;
}

function CategoryPage({ category, posts }: Props) {
  return (
    <Container>
      <PageTopbar />
      <Title>
        <h1>{category}</h1>
      </Title>
      <PostContainer>
        {posts.map((post, index) => {
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
    </Container>
  );
}

CategoryPage.getInitialProps = async ({ query }: NextPageContext) => {
  const res = await apiHelper({
    url: `${process.env.NEXT_PUBLIC_API_GET_POSTS_BY_CATEGORY}${query?.id}`,
    method: "GET",
  });
  return res;
};

export default CategoryPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.div`
  width: 95vw;
  min-width: 200px;
  height: 100px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  margin-top: 10px;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 20px;
`;

const Post = styled.div`
  width: 95vw;
  border: 2px solid black;
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
