import styled from "styled-components";

interface Props {
  media?: string;
}

export default function Topbar({ media }: Props) {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 40px;
  margin-top: 10px;
  border-bottom: 3px solid black;
  padding: 0px 50px 0px;
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
  line-height: 40px;
  font-size: 16px;
  font-weight: 700;
`;
