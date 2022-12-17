import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from "react";

export default function WritePost({ offWritePost, writingMode, targetPost }) {
  const [editor, setEditor] = useState();
  const [title, setTitle] = useState(
    targetPost?.title === undefined ? "" : targetPost.title
  );
  const [content, setContent] = useState("");
  const [activeHtml, setActiveHtml] = useState(false);
  const [editorSource, setEditorSource] = useState("");

  const completeWriting = () => {
    console.log({ title, content });
  };

  const stopWriting = () => {
    if (confirm("!!주의!! 나가기 전에 저장하자")) offWritePost();
  };

  const updateSource = (data) => {
    setContent(data);
    editor.data.set(data);
  };

  const onClickHtml = () => {
    if (!activeHtml) {
      setEditorSource(editor.data.get());
      setActiveHtml(true);
    } else {
      console.log(editorSource);
      setActiveHtml(false);
      editor.data.set(editorSource);
    }
  };

  useEffect(() => {
    if (editor && targetPost) {
      setContent(targetPost.content);
    }
  }, [editor]);

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <Container>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
      />
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onReady={(editor) => {
          setEditor(editor);
        }}
      />
      {activeHtml && (
        <HtmlTextEditor
          value={editorSource}
          onChange={(e) => setEditorSource(e.target.value)}
        />
      )}
      <BottomBar>
        <Button
          onClick={onClickHtml}
          color="RGB(34, 139, 33)"
          hoverColor="RGB(1, 92, 41)"
        >
          HTML
        </Button>
        <Button
          onClick={stopWriting}
          color="RGB(255, 0, 0)"
          hoverColor="RGB(130, 12, 13)"
        >
          나가기
        </Button>
        <Button
          onClick={completeWriting}
          color="RGB(66, 132, 243)"
          hoverColor="RGB(7, 47, 116)"
        >
          완료
        </Button>
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
  background-color: ${(props) => props.color};
  color: white;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const HtmlTextEditor = styled.textarea`
  z-index: 10;
  position: fixed;
  top: 100px;
  min-height: 600px;
  max-height: 600px;
  width: 700px;
  overflow-y: scroll;
  padding: 30px;
  resize: none;
  box-shadow: 0px 0px 2000px #000;
`;
