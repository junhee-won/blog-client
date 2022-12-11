import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

// interface Props {
//   text: string;
//   setText: (arg: string) => void;
// }

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const completeWriting = () => {
    console.log(content);
    console.log({ title, content });
  };

  return (
    <Container>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
      />
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
      />
      <Button onClick={completeWriting}>완료</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 50px;
  width: 700px;
  margin: 10px;
  padding: 10px;
  margin: 30px;
`;

const Button = styled.div`
  height: 40px;
  width: 80px;
  margin: 10px;
  background-color: RGB(66, 132, 243);
  color: white;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: rgb(7, 47, 116);
  }
  margin: 30px;
`;
