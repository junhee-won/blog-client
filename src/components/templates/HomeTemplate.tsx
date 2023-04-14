import styled from "styled-components";
import { ReactNode } from "react";
import LogoBar from "../organisms/LogoBar";

interface Props {
  children: ReactNode;
}

export default function HomeTemplate({ children }: Props) {
  return (
    <Container>
      <LogoBar />
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${(props) => props.theme.media.desktop} {
    flex-direction: row;
  }
  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
  }
`;
