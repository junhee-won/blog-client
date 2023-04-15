import styled from "styled-components";
import { VisitorCount } from "../../types/interfaces";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface ItemProps {
  visitorCount: VisitorCount;
}

export default function VisitorCountsContainer({ children }: Props) {
  return <Container>{children}</Container>;
}

function VisitorCountsContainerItem({ visitorCount }: ItemProps) {
  const { localeDateString, count } = visitorCount;
  return (
    <Item>
      <div>{localeDateString}</div>
      <div>{count}</div>
    </Item>
  );
}

VisitorCountsContainer.item = VisitorCountsContainerItem;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  height: 150px;
  border: 1px solid black;
  border-radius: 5px;
`;
