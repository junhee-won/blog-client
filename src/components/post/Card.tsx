import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { PostCardInterface } from "../../types/interfaces";
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
              alt={`${title} - 대표 이미지`}
              src={thumbnail}
              priority
              width={288}
              height={162}
              style={{
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
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
  width: 288px;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.35);
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.03);
  }
`;

const ImageBox = styled.div`
  display: block;
  position: relative;
  overflow: hidden;
  width: 288px;
  height: 162px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  border-top: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  padding: 0px 20px;
`;

const Title = styled.h2`
  display: -webkit-box;
  margin: 0px;
  padding: 0px;
  width: 236px;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
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
  height: 100%;
  padding: 0 20px 0;
  color: gray;
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
