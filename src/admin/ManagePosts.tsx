import styled from "styled-components";
import { useState, useEffect } from "react";
import apiHelper from "../modules/apiHelper";

interface Props {
  token: string;
  setOnWritePost: (arg: boolean) => void;
  setWritingMode: (arg: string) => void;
  setTargetPost: (arg: PostType) => void;
}

interface PostType {
  id: number;
  category_id: number;
  title: string;
  content: string;
  public: number;
  created_at: string;
  updated_at: string;
  thumbnail: string;
}

export default function ManagePosts({
  token,
  setOnWritePost,
  setWritingMode,
  setTargetPost,
}: Props) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    (async function () {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_POSTS,
        method: "GET",
        jwt: token,
      });
      if (res !== "error") {
        setPosts(res);
      }
    })();
  }, []);

  const updatePost = (post: PostType) => {
    setTargetPost(post);
    setWritingMode("update");
    setOnWritePost(true);
  };

  const convertDateFormat = (date: string): string => {
    return new Date(date).toISOString().replace(/T/, " ").replace(/\..+/, "");
  };

  return (
    <Container>
      {posts.map((post, index) => {
        return (
          <Post key={index}>
            <Title>
              <a>{post.title}</a>
            </Title>
            <DateBox>{convertDateFormat(post.created_at)}</DateBox>
            <Button onClick={() => updatePost(post)}>수정</Button>
          </Post>
        );
      })}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 60px;
  background-color: white;
  margin: 20px;
  border: 3px solid black;
  border-radius: 10px;
`;

const Title = styled.div`
  line-height: 60px;
  width: 60%;
  padding-left: 50px;
  font-size: 20px;
  font-weight: 500;
`;

const DateBox = styled.div`
  line-height: 60px;
  width: 200px;
  font-size: 15px;
  font-weight: 500;
  color: gray;
`;

const Button = styled.div`
  height: 40px;
  width: 80px;
  margin: 10px;
  background-color: RGB(66, 132, 243);
  color: white;
  line-height: 40px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(7, 47, 116);
  }
  text-align: center;
`;
