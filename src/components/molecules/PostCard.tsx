import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../types/interfaces";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { id, title, thumbnail, created_at } = post;
  const createdAt = created_at.slice(0, 10);
  return (
    <Link href={`/post/${id}`}>
      <Container>
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
        <Date>{createdAt}</Date>
      </Container>
    </Link>
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
  background-color: white;
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
  width: 248px;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Date = styled.div`
  width: 100%;
  height: 46px;
  padding: 0 20px;
  line-height: 46px;
  font-size: 15px;
  color: gray;
`;
