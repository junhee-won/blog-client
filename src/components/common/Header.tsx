import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <h1>준희의 개발 블로그</h1>
    </Container>
  );
}

const Container = styled.div`
  height: 50px;
  border-bottom: 3px solid black;
  text-align: center;
`;
