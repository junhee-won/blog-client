import styled from "styled-components";
import Image from "next/image";

interface Props {
  media: string;
  createdAt: string;
  title: string;
  category: string;
  thumbnail: string;
}

export default function Title({
  media,
  title,
  thumbnail,
  createdAt,
  category,
}: Props) {
  return (
    <Container media={media}>
      {/* <TextWrapper>{title}</TextWrapper> */}
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
          placeholder="blur"
          blurDataURL={thumbnail}
        />
      </Cover>
    </Container>
  );
}

const Container = styled.div<{ media: string }>`
  position: relative;
  width: 100%;
  height: 400px;
`;

const TextWrapper = styled.div`
  position: relative;
  z-index: 3;
  font-size: 100px;
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
