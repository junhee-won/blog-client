import styled from "styled-components";
import IconsBox from "../molecules/IconsBox";
import Logo from "../atoms/icons/Logo";

export default function LogoBar() {
  return (
    <Container>
      <Logo />
      <IconsBox />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary};
  ${(props) => props.theme.media.desktop} {
    width: 320px;
    height: 100vh;
  }
  ${(props) => props.theme.media.mobile} {
    width: 100vw;
    height: 150px;
  }
`;
