import styled from "styled-components";
import { useState, useEffect } from "react";
import apiHelper from "../modules/apiHelper";

interface Props {
  token: string;
}

interface PostType {
  id: number;
  category_id: number;
  title: string;
  content: string;
  public: number;
  created_at: string;
  updated_at: string;
}

export default function ManagePosts({ token }: Props) {
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPost = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_POSTS,
      method: "GET",
      jwt: token,
    });
    if (res !== "err") {
      setPosts(res);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return <Container>글 관리</Container>;
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: green;
`;
