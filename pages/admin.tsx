import styled from "styled-components";
import { useState } from "react";
import TextEditor from "../src/admin/TextEditor";
import TextPreview from "../src/admin/TextPreview";
import SginIn from "../src/admin/SignIn";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [text, setText] = useState("");

  if (token) {
    return (
      <Container>
        <TextEditor text={text} setText={setText} />
        <TextPreview text={text} />
      </Container>
    );
  } else {
    return (
      <Container>
        <SginIn setToken={setToken} />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
