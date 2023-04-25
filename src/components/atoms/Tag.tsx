import styled from "styled-components";

interface Props {}

export default function Tag({}: Props) {
  return <Wrapper />;
}

const Wrapper = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
`;
