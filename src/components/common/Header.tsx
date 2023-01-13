import styled from "styled-components";
import Image from "next/image";

interface Props {
  media: string;
}

export default function Header({ media }: Props) {
  if (media === "mobile") {
    return (
      <MContainer>
        <h1>개발이 개발새발</h1>
        <a
          href="https://github.com/junhee-won"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MLogoContainer>
            <Image
              src="/github-mark.svg"
              alt="github"
              width={30}
              height={30}
              priority
            />
          </MLogoContainer>
        </a>
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
            <Image
              src="/github-mark.svg"
              alt="github"
              width={50}
              height={50}
              priority
            />
          </LogoContainer>
        </a>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 150px;
  border: 3px solid black;
  margin-top: 30px;
  line-height: 150px;
  text-align: center;
  font-size: 20px;
`;

const MContainer = styled.div`
  position: relative;
  width: 95%;
  height: 120px;
  margin-top: 10px;
  border: 3px solid black;
  line-height: 120px;
  text-align: center;
  overflow: hidden;
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

const MLogoContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  bottom: 10px;
  right: 10px;
`;
