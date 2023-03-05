import styled from "styled-components";
import Image from "next/image";
import GithubLogo from "../../public/github-mark.svg";
import TistoryLogo from "../../public/tistory-logo.svg";

interface Props {
  media: string;
}

export default function MobileNavbar({ media }: Props) {
  if (media === "mobile") {
    return (
      <MContainer>
        <Title>개발이 개발새발</Title>
        <MLogoContainer>
          <a
            href="https://github.com/junhee-won"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={GithubLogo} alt="github" width={30} height={30} />
          </a>
          <a
            href="https://github.com/junhee-won"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo>
              <Image src={TistoryLogo} alt="github" width={30} height={30} />
            </Logo>
          </a>
        </MLogoContainer>
      </MContainer>
    );
  } else {
    return (
      <Container>
        <h1>개발이 개발새발</h1>
        <a
          href="https://github.com/junhee-won"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LogoContainer>
            <Image src={GithubLogo} alt="github" width={50} height={50} />
          </LogoContainer>
        </a>
      </Container>
    );
  }
}

const MContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  margin-top: 10px;
  background-color: #4e5684;
  color: white;
`;

const MLogoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  bottom: 5px;
  width: 100%;
  height: 30px;
  padding: 0 10px 0;
`;

const Logo = styled.div`
  width: 30px;
  height: 30px;
`;

const Title = styled.h1`
  line-height: 120px;
  text-align: center;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 150px;
  margin-top: 30px;
  line-height: 150px;
  text-align: center;
  font-size: 20px;
  background-color: #4e5684;
  color: white;
`;

const LogoContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  bottom: 10px;
  right: 10px;
`;
