import styled from "styled-components";
import PostTitle from "../../organisms/PostTitle";
import PostBody from "../../organisms/PostBody";
import { Post } from "../../../types/interfaces";

interface Props {
  post: Post;
  closePreview: () => void;
}

export default function Preview({ post, closePreview }: Props) {
  return (
    <Wrapper>
      <CloseButton onClick={closePreview}>X</CloseButton>
      <PostTitle post={post} />
      <PostBody post={post} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const CloseButton = styled.div`
  z-index: 20;
  position: fixed;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
`;
