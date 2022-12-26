import styled from "styled-components";

interface Props {
  media: string;
}

export default function Header({ media }: Props) {
  return (
    <Container>
      <h1>개발자로 살아남기</h1>
    </Container>
  );
}

const Container = styled.div`
  width: 95vw;
  min-width: 200px;
  height: 100px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
`;
