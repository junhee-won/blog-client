import styled from "styled-components";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

interface Props {
  Headings: {
    type: string;
    id: string;
    text: string;
  }[];
}

interface ObservedElement extends Element {
  elements_index?: number;
}

export default function Contents({ Headings }: Props) {
  const [focusedIndex, setFocusedIndex] = useState(null);

  useLayoutEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.intersectionRatio > 0) {
            setFocusedIndex(entry.target.elements_index);
          }
        });
      },
      { rootMargin: "-30%" }
    );
    const headingElements = document.querySelectorAll("h2, h3");
    headingElements.forEach((element: ObservedElement, index) => {
      element.elements_index = index;
      io.observe(element);
    });
  }, []);

  return (
    <Container>
      {Headings.map((item, index) => {
        return (
          <Link href={`#${item.id}`} key={index}>
            <Text focused={focusedIndex === index} isH2={item.type === "h2"}>
              {item.text}
            </Text>
          </Link>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 50vh;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-left: 2px solid gray;
  padding: 10px 0px 10px 10px;
  max-height: 70vh;
  overflow-y: scroll;
  @media (max-width: 1300px) {
    display: none;
  }
`;

const Text = styled.div<{ focused: boolean; isH2: boolean }>`
  width: fit-content;
  max-width: 190px;
  padding-right: 10px;
  overflow: hiddlen;
  word-break: break-all;
  padding-left: ${(props) => (props.isH2 ? "0px" : "20px")};
  font-size: 14px;
  color: ${(props) => (props.focused ? "#4E5684" : "gray")};
  line-height: 16px;
  transition: all 0.1s linear;
  transform: ${(props) => (props.focused ? "scale(1.05)" : "")};
`;
