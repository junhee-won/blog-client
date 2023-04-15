import styled from "styled-components";

interface Props {
  text: string;
  onClick: (arg: void) => void;
}

export default function Button({ text, onClick }: Props) {
  return <StyledButton onClick={() => onClick()}>{text}</StyledButton>;
}

const StyledButton = styled.button`
  cursor: pointer;
  padding: 10px;
`;
