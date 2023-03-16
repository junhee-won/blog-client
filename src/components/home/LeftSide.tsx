import styled from "styled-components";
import Image from "next/image";
import GithubLogo from "../../../public/github-mark.svg";
import TistoryLogo from "../../../public/tistory-logo.svg";

export default function LeftSide() {
  return (
    <Container>
      <TitleWrapper>
        <BlindTitle>개발이 개발새발</BlindTitle>
        <Title dir="start">개발이</Title>
        <Title dir="end">개발새발</Title>
      </TitleWrapper>
      <LogoContainer>
        <a
          href="https://github.com/junhee-won"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoBox>
            <Image src={GithubLogo} alt="github" width={50} height={50} />
          </LogoBox>
        </a>
        <a
          href="https://junhee-hee.tistory.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoBox>
            <Image src={TistoryLogo} alt="tistory" width={50} height={50} />
          </LogoBox>
        </a>
      </LogoContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  height: 100vh;
  overflow: hidden;
  background-color: #4e5684;
  color: white;
`;

const TitleWrapper = styled.div`
  position: relative;
  width: 270px;
  height: 200px;
  transform: rotate(-5deg);
`;

const Title = styled.div`
  width: 100%;
  text-align: ${(props) => props.dir};
  line-height: 100px;
  font-size: 60px;
  font-weight: 500;
`;

const BlindTitle = styled.h1`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
  bottom: 20px;
  width: 100%;
  height: 50px;
  padding: 0 20px 0;
`;

const LogoBox = styled.div`
  height: 50px;
  width: 50px;
`;
