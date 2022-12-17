import styled from "styled-components";

interface Props {
  token: string;
}

export default function Home({ token }: Props) {
  return <Container>홈</Container>;
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: green;
`;
