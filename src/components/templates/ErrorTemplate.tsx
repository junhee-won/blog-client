import styled from "styled-components";
import Header from "../molecules/Header";
import HomeIcon from "../atoms/icons/HomeIcon";
import ConeIcon from "../atoms/icons/ConeIcon";

export default function ErrorTemplate() {
  return (
    <Wrapper>
      <Header />
      <WarningWrapper>
        <ConeIcon />
        <Text>페이지가 존재하지 않습니다</Text>
        <ConeIcon />
      </WarningWrapper>
      <HomeIcon />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 100vh;
  padding-top: 60px;
`;

const WarningWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 80vw;
`;

const Text = styled.div`
  ${(props) => props.theme.media.desktop} {
    font-size: 50px;
  }
  ${(props) => props.theme.media.mobile} {
    font-size: 30px;
  }
`;
