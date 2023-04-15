import styled from "styled-components";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Admin({ children }: Props) {
  return <Container>{children}</Container>;
}

function AdminMenu({ children }: Props) {
  return <Menu>{children}</Menu>;
}

function AdminDashBoard({ children }: Props) {
  return <Dashboard>{children}</Dashboard>;
}

Admin.menu = AdminMenu;
Admin.dashboard = AdminDashBoard;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const Menu = styled.div`
  width: 200px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid gray;
`;

const Dashboard = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: scroll;
`;
