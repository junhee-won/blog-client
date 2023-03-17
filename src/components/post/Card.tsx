import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { PostCardInterface } from "../../interfaces/PostCardInterface";
import { Row } from "../common/Row";

interface Props {
  postCard: PostCardInterface;
}

export default function Card({ postCard }: Props) {
  const { id, title, categoryTree, thumbnail, created_at } = postCard;
  return (
    <Container>
      <Link href={`/post/${id}`}>
        {thumbnail && (
          <ImageBox>
            <Image
              alt="thumbnail"
              src={thumbnail}
              priority
              sizes="276px"
              width="276"
              height="155"
              placeholder="empty"
            />
          </ImageBox>
        )}
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
      </Link>
      <Bottom>
        <Row>
          <Link href={`/category/${categoryTree[0].id}`}>
            <Category>{categoryTree[0].name + " "}</Category>
          </Link>
          {categoryTree[1] && (
            <>
              &nbsp;/&nbsp;
              <Category>
                <Link href={`/category/${categoryTree[1].id}`}>
                  {categoryTree[1].name}
                </Link>
              </Category>
            </>
          )}
        </Row>
        <Date>{created_at}</Date>
      </Bottom>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 276px;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.03);
  }
`;

const ImageBox = styled.div`
  position: relative;
  width: 276px;
  height: 155px;
  align-self: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 99px;
  padding: 20px;
`;

const Title = styled.h3`
  display: -webkit-box;
  width: 236px;
  line-height: 27px;
  margin: 0px;
  padding: 0px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 51px;
  padding: 0 20px 0;
  color: gray;
  border-top: 1px solid #dee2e6;
`;

const Category = styled.div`
  max-width: 90px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray;
  &:hover {
    color: black;
  }
`;

const Date = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray;
`;
