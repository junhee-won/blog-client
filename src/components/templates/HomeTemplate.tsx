import styled from "styled-components";
import LogoBar from "../organisms/LogoBar";
import PostCardsGrid from "../organisms/PostCardsGrid";
import { Category, Post } from "../../types/interfaces";

interface Props {
  categories: Category[];
  posts: Post[];
}

export default function HomeTemplate({ categories, posts }: Props) {
  return (
    <Container>
      <LogoBar />
      <PostCardsGrid categories={categories} posts={posts} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${(props) => props.theme.media.desktop} {
    flex-direction: row;
  }
  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
  }
`;
