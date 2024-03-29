import styled from "styled-components";
import Link from "next/link";

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <TextWrapper>
          <Text>개발이</Text>
          <Text>개발 새발</Text>
        </TextWrapper>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  ${(props) => props.theme.media.desktop} {
    padding-left: 60px;
  }
  ${(props) => props.theme.media.mobile} {
    padding-left: 10px;
  }
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: all 0.1s linear;
  &:hover {
    transform: scale(1.1);
  }
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 20px;
  transform: rotate(-3deg);
`;
