import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting";
import { useState, useEffect } from "react";

const CKEditorConfig = {
  plugins: [SourceEditing],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "blockQuote",
    "link",
    "numberedList",
    "bulletedList",
    "imageUpload",
    "insertTable",
    "tableColumn",
    "tableRow",
    "mergeTableCells",
    "mediaEmbed",
    "|",
    "undo",
    "redo",
    "sourceEditing",
  ],
};

export default function WritePost({ offWritePost, writingMode, targetPost }) {
  const [editor, setEditor] = useState();
  const [title, setTitle] = useState(
    targetPost?.title === undefined ? "" : targetPost.title
  );
  const [content, setContent] = useState("");
  const [activeHtml, setActiveHtml] = useState(false);

  const completeWriting = () => {
    console.log(content);
    console.log({ title, content });
  };

  const stopWriting = () => {
    if (confirm("!!주의!! 나가기 전에 저장하자")) offWritePost();
  };

  useEffect(() => {
    if (editor && targetPost) {
      setContent(targetPost.content);
    }
  }, [editor]);

  return (
    <Container>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
      />
      {!activeHtml && (
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
            setContent(data);
          }}
          onReady={(editor) => {
            setEditor(editor);
          }}
        />
      )}
      {activeHtml && <div>hello</div>}
      <BottomBar>
        <Button
          onClick={() => setActiveHtml(!activeHtml)}
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
