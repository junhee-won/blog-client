import styled from "styled-components";

interface Props {
  text: string;
  setText: (arg: string) => void;
  rows?: number;
  disable?: boolean;
}

export default function Textarea({ text, setText, rows = 1, disable }: Props) {
  return (
    <StyledTextarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      rows={rows}
      disabled={disable}
    />
  );
}

const StyledTextarea = styled.textarea`
  width: 100%;
  height: auto;
  padding: 10px;
  resize: none;
`;
