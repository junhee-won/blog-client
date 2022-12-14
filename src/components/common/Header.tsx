import styled from "styled-components";

interface Props {
  media: string;
}

export default function Header({ media }: Props) {
  return (
    <Container>
      <h1>준희의 개발 블로그</h1>
    </Container>
  );
}

const Container = styled.div`
  height: 100px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
`;
