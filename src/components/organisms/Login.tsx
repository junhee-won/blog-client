import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Login({ children }: Props) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 400px;
  height: 400px;
  padding: 50px;
  border: 2px solid black;
  border-radius: 10px;
`;
