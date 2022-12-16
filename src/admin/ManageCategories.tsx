import styled from "styled-components";

interface Props {
  token: string;
}

export default function ManageCategories({ token }: Props) {
  return <Container>카테고리 관리</Container>;
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: green;
`;
