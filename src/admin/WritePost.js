import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

// interface Props {
//   text: string;
//   setText: (arg: string) => void;
// }

export default function WritePost({ offWritePost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const completeWriting = () => {
    console.log(content);
    console.log({ title, content });
  };

  const stopWriting = () => {
    if (confirm("!!주의!! 나가기 전에 저장하자")) offWritePost();
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
      <BottomBar>
        <Button onClick={stopWriting}>나가기</Button>
        <Button2 onClick={completeWriting}>완료</Button2>
      </BottomBar>
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

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  background-color: RGB(245, 245, 245);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;

const Button = styled.div`
  height: 40px;
  width: 80px;
  margin: 10px;
  background-color: red;
  color: white;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: rgb(7, 47, 116);
  }
`;

const Button2 = styled.div`
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
`;
