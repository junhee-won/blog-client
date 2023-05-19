import styled from "styled-components";
import Image from "next/image";
import { Post } from "../../types/interfaces";

interface Props {
  post: Post;
}

export default function PostTitle({ post }: Props) {
  const { thumbnail, title } = post;
  const createdAt = post.created_at;
  return (
    <Wrapper>
      <TextWrapper>
        <TitleText>{title}</TitleText>
        <SubText>{createdAt}</SubText>
      </TextWrapper>
      <GrayFilter />
      <Cover>
        <Image
          alt="thumbnail"
          src={thumbnail}
          priority
          fill
          sizes="110vw"
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          placeholder="empty"
        />
      </Cover>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  height: 30vw;
  min-height: 400px;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 794px;
  max-width: 95%;
  margin-bottom: 30px;
`;

const TitleText = styled.h1`
  max-width: 100%;
  padding-bottom: 50px;
  color: white;
  ${(props) => props.theme.media.desktop} {
    font-size: 50px;
  }
  ${(props) => props.theme.media.mobile} {
    font-size: 36px;
  }
`;

const SubText = styled.div`
  color: #e9ecef;
  font-size: 18px;
`;

const GrayFilter = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.25;
`;

const Cover = styled.div`
  display: block;
  position: absolute;
  z-index: 1;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  filter: blur(2px);
`;
