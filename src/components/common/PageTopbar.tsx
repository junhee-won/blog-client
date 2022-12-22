import styled from "styled-components";

export default function PageTopbar() {
  return (
    <Container>
      <TextBox>1면</TextBox>
      <TextBox>2022/12/15</TextBox>
    </Container>
  );
}

const Container = styled.div`
  width: 95vw;
  min-width: 200px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid black;
`;

const TextBox = styled.div`
  line-height: 27px;
  font-size: 15px;
`;
