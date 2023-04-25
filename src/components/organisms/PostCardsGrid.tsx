import styled from "styled-components";
import { useTag } from "../../hooks/useTag";
import TagsBox from "../molecules/TagsBox";
import PostCard from "../molecules/PostCard";
import { Category, Post } from "../../types/interfaces";

interface Props {
  categories: Category[];
  posts: Post[];
}

export default function PostCardsGrid({ categories, posts }: Props) {
  const [selectedPosts, tag, selectTag] = useTag({
    allPosts: posts,
  });
  return (
    <Container>
      <TagsBox tag={tag} selectTag={selectTag} categories={categories} />
      <Grid>
        {selectedPosts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </Grid>
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  padding: 20px 40px 40px;
  ${(props) => props.theme.media.desktop} {
    height: 100vh;
    max-height: 100vh;
    overflow: scroll;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 288px));
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 30px;
  width: 100%;
`;
