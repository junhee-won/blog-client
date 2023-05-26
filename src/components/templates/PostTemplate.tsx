import styled from "styled-components";
import { Post } from "../../types/interfaces";
import Header from "../molecules/Header";
import PostTitle from "../organisms/PostTitle";
import PostBody from "../organisms/PostBody";

interface Props {
  post: Post;
}

export default function PostTemplate({ post }: Props) {
  return (
    <Container>
      <Header />
      <PostTitle post={post} />
      <PostBody post={post} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;
