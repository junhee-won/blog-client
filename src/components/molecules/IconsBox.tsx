import styled from "styled-components";
import MailIcon from "../atoms/icons/MailIcon";
import GithubIcon from "../atoms/icons/GithubIcon";
import TistoryIcon from "../atoms/icons/TistoryIcon";

export default function IconsBox() {
  return (
    <Container>
      <MailIcon />
      <GithubIcon />
      <TistoryIcon />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
  display: flex;
  gap: 10px;
`;
