import styled from "styled-components";

interface Props {
  media?: string;
}

export default function PageTopbar({ media }: Props) {
  if (media === "mobile") {
    return (
      <MContainer>
        <TextBox>1면</TextBox>
        <TextBox>2022/12/15</TextBox>
      </MContainer>
    );
  } else {
    return (
      <Container>
        <TextBox>1면</TextBox>
        <TextBox>2022/12/15</TextBox>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 1200px;
  height: 50px;
  padding: 20px 50px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid black;
`;

const MContainer = styled.div`
  width: 95%;
  height: 30px;
  padding: 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid black;
`;

const TextBox = styled.div`
  line-height: 30px;
  font-size: 15px;
  font-weight: 700;
`;
