import styled from "styled-components";
import Link from "next/link";

interface Props {
  Headings: {
    type: string;
    id: string;
    text: string;
  }[];
}

export default function Contents({ Headings }: Props) {
  return (
    <Container>
      {Headings.map((item, index) => {
        return <Link href={`#${item.id}`}>{item.text}</Link>;
      })}
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 65px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 200px;
  background-color: red;
`;
