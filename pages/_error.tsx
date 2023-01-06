import styled from "styled-components";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Container>
      <Text>페이지가 존재하지 않습니다</Text>
      <Link href="/">
        <Button>홈으로</Button>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Text = styled.div`
  font-size: 50px;
`;

const Button = styled.div`
  width: 200px;
  height: 80px;
  margin: 30px;
  border: 3px solid black;
  border-radius: 10px;
  padding: 20;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
`;
