import styled from "styled-components";

export default function Logo() {
  return (
    <Container>
      <HiddenTitle>개발이 개발새발</HiddenTitle>
      <Text alignSelf="flex-start">개발이</Text>
      <Text alignSelf="flex-end">개발새발</Text>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  ${(props) => props.theme.media.desktop} {
    flex-direction: column;
    width: 270px;
  }
  ${(props) => props.theme.media.mobile} {
    flex-direction: row;
  }
`;

const Text = styled.div<{ alignSelf: string }>`
  align-self: ${(props) => props.alignSelf};
  transform: rotate(-3deg);
  color: white;
  ${(props) => props.theme.media.desktop} {
    line-height: 100px;
    font-size: 60px;
    font-weight: 500;
  }
  ${(props) => props.theme.media.mobile} {
    margin: 5px;
    line-height: 30px;
    font-size: 30px;
    font-weight: 500;
  }
`;

const HiddenTitle = styled.h1`
  position: absolute;
  width: 0px;
  height: 0px;
  overflow: hidden;
`;
