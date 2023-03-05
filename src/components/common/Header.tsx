import styled from "styled-components";
import Link from "next/link";

interface Props {
  media: string;
}

export default function Header({ media }: Props) {
  console.log(media);
  return (
    <Container media={media}>
      <Link href="/">
        <TextWrapper>
          <Text>개발이</Text>
          <Text>개발 새발</Text>
        </TextWrapper>
      </Link>
    </Container>
  );
}

const Container = styled.div<{ media: string }>`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: ${(props) => (props.media === "mobile" ? "5px" : "60px")};
  background-color: #4e5684;
  color: white;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 20px;
  transform: rotate(-3deg);
`;
