import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export default function AdminMenu({ children }: Props) {
  return <Container>{children}</Container>;
}

function AdminMenuItem({ children, onClick }: Props) {
  return <Button onClick={onClick}>{children}</Button>;
}

AdminMenu.item = AdminMenuItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 200px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid gray;
  padding-top: 40px;
`;

const Button = styled.div`
  cursor: pointer;
  width: 80%;
  height: 50px;
  background-color: skyblue;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
`;
