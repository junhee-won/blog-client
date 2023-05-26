import styled from "styled-components";

interface Props {
  text: string;
  onClick: (arg: void) => void;
  isFocused?: boolean;
  backgroundColor?: string;
}

export default function Button({
  text,
  onClick,
  isFocused,
  backgroundColor,
}: Props) {
  let _backgroundColor = backgroundColor
    ? backgroundColor
    : isFocused
    ? "gray"
    : "white";

  let color = _backgroundColor === "white" ? "black" : "white";

  return (
    <StyledButton
      isFocused={isFocused}
      onClick={() => onClick()}
      _backgroundColor={_backgroundColor}
      color={color}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.div<{
  isFocused?: boolean;
  _backgroundColor?: string;
  color?: string;
}>`
  cursor: pointer;
  padding: 10px;
  background-color: ${(props) =>
    props._backgroundColor === "primary"
      ? props.theme.colors.primary
      : props._backgroundColor};
  color: ${(props) => props.color};
  border: 1px solid black;
  border-radius: 5px;
`;
