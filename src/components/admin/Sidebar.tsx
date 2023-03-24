import styled from "styled-components";

interface Props {
  setIsWritingModalOpen: (arg: boolean) => void;
  setActiveIndex: (arg: number) => void;
}

export default function Sidebar({
  setIsWritingModalOpen,
  setActiveIndex,
}: Props) {
  return (
    <Container>
      <Button onClick={() => setActiveIndex(0)}>홈</Button>
      <Button onClick={() => setIsWritingModalOpen(true)}>글쓰기</Button>
      <Divider />
      <Button onClick={() => setActiveIndex(1)}>글 관리</Button>
      <Button onClick={() => setActiveIndex(2)}>카테고리 관리</Button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: skyblue;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  border-right: 3px solid gray;
`;

const Button = styled.div`
  height: 50px;
  width: 160px;
  margin: 10px;
  background-color: RGB(66, 132, 243);
  color: white;
  line-height: 50px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(7, 47, 116);
  }
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: gray;
  margin-top: 20px;
  margin-bottom: 20px;
`;
