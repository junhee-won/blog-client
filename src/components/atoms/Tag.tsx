import styled from "styled-components";
import { MouseEvent } from "react";

interface Props {
  handleClick: (arg: MouseEvent<HTMLDivElement>) => void;
  isSelected: boolean;
  text?: string;
}

export default function Tag({ handleClick, isSelected, text }: Props) {
  return (
    <Wrapper isSelected={isSelected} onClick={handleClick}>
      {text}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ isSelected: boolean }>`
  max-width: 200px;
  height: 40px;
  border: ${(props) => `${props.theme.colors.primary} solid 1px`};
  border-radius: 20px;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.isSelected && props.theme.colors.primary};
  color: ${(props) => (props.isSelected ? "white" : "black")};
  text-align: center;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
