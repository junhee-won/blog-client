import styled from "styled-components";
import { Post } from "../../types/interfaces";
import PostContent from "../atoms/PostContent";
import PostContents from "../molecules/PostContents";

interface Props {
  post: Post;
}

export default function PostBody({ post }: Props) {
  const { content, headings } = post;
  return (
    <Wrapper>
      <SideWrapper />
      <PostContent content={content} />
      <SideWrapper>
        <PostContents headings={headings} />
      </SideWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const SideWrapper = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 200px;
`;
