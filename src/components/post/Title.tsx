import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

interface Props {
  media: string;
  createdAt: string;
  title: string;
  category: string;
  thumbnail: string;
  categoryId: number;
}

export default function Title({
  media,
  title,
  thumbnail,
  createdAt,
  category,
  categoryId,
}: Props) {
  return (
    <Container media={media}>
      <TextWrapper>
        <TitleText media={media}>{title}</TitleText>
        <Link href={`/category/${categoryId}`}>
          <SubText>{category}</SubText>
        </Link>
        <SubText>{createdAt}</SubText>
      </TextWrapper>
      <GrayFilter />
      <Cover>
        <Image
          src={thumbnail}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
          }}
          alt="thumbnail"
          placeholder="empty"
          priority
        />
      </Cover>
    </Container>
  );
}

const Container = styled.div<{ media: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 400px;
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

const TitleText = styled.h1<{ media: string }>`
  padding-bottom: 50px;
  color: white;
  font-size: ${(props) => (props.media === "mobile" ? "36px" : "50px")};
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
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px);
`;
