import styled from "styled-components";
import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return <Container>hello</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
