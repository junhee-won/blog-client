import styled from "styled-components";
import Card from "../post/Card";
import { PostCardInterface } from "../../interfaces/PostCardInterface";

interface Props {
  postCards: PostCardInterface[];
  media: string;
}

export default function Main({ postCards, media }: Props) {
  return (
    <Container isMobile={media === "mobile"}>
      <PostCardContainer>
        {postCards?.map((postCard, index) => {
          return <Card postCard={postCard} key={index} />;
        })}
      </PostCardContainer>
    </Container>
  );
}

const Container = styled.div<{ isMobile: boolean }>`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: ${(props) => !props.isMobile && "100vh"};
  overflow-y: scroll;
  padding: ${(props) => (props.isMobile ? "20px" : "80px 30px 80px")};
`;

const PostCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(276px, 276px));
  justify-content: center;
  justify-items: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;
