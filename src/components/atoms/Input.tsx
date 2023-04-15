import styled from "styled-components";

interface Props {
  text: string;
  setText: (arg: string) => void;
  type?: string;
}

export default function Input({ text, setText, type }: Props) {
  return (
    <StyledInput
      value={text}
      onChange={(e) => setText(e.target.value)}
      type={type}
    />
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
`;
