import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import apiHelper from "../modules/apiHelper";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

export default function WritePost({
  offWritePost,
  writingMode,
  targetPost,
  token,
}) {
  const [editor, setEditor] = useState();
  const [title, setTitle] = useState(
    targetPost?.title === undefined ? "" : targetPost.title
  );
  const [content, setContent] = useState("");
  const [activeHtml, setActiveHtml] = useState(false);
  const [editorSource, setEditorSource] = useState("");
  const [isPublic, setIsPublic] = useState(targetPost?.public || 0);
  const [categories, setCategories] = useState([]);
  const [categroyId, setCategoryId] = useState(targetPost?.category_id || 1);
  const [thumbnail, setThumbnail] = useState("/public/vercel.svg");

  const completeWriting = () => {
    (async function () {
      if (writingMode === "update") {
        const res = await apiHelper({
          url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_POST,
          method: "PUT",
          jwt: token,
          body: {
            id: targetPost.id,
            title: title,
            content: content,
            public: isPublic,
            category_id: categroyId,
            thumbnail,
          },
        });
        if (!res.success) {
          alert("error");
        } else {
          offWritePost();
        }
      } else if (writingMode === "create") {
        const res = await apiHelper({
          url: process.env.NEXT_PUBLIC_API_ADMIN_CREATE_POST,
          method: "POST",
          jwt: token,
          body: {
            title: title,
            content: content,
            public: isPublic,
            category_id: categroyId,
            thumbnail,
          },
        });
        if (!res.success) {
          alert("error");
        } else {
          offWritePost();
        }
      }
    })();
  };

  const stopWriting = () => {
    if (confirm("!!??????!! ????????? ?????? ????????????")) offWritePost();
  };

  const onClickHtml = () => {
    if (!activeHtml) {
      setEditorSource(editor.data.get());
      setActiveHtml(true);
    } else {
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
    (async function () {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_CATEGROIES,
        jwt: token,
        method: "GET",
      });
      if (res.success) {
        setCategories(res.data);
      }
    })();
    if (targetPost?.thumbnail) {
      setThumbnail(targetPost.thumbnail);
    }
  }, []);

  return (
    <Container>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
      />
      <CKEditor
        editor={Editor}
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
        <input
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <Image
          alt="thumbnail"
          style={{ width: "100px" }}
          src={thumbnail}
          width={100}
          height={40}
          onError={() => setThumbnail("/vercel.svg")}
        />
        <Select
          onChange={(e) => setCategoryId(e.target.value)}
          value={categroyId}
        >
          {categories.map((category, index) => {
            return (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </Select>
        <Checkbox
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(1 - isPublic)}
        />
        ??????
        <Checkbox
          type="checkbox"
          checked={!isPublic}
          onChange={(e) => setIsPublic(1 - isPublic)}
        />
        ?????????
        <FixedButton
          onClick={stopWriting}
          color="RGB(255, 0, 0)"
          hoverColor="RGB(130, 12, 13)"
        >
          ?????????
        </FixedButton>
        <FixedButton
          onClick={completeWriting}
          color="RGB(66, 132, 243)"
          hoverColor="RGB(7, 47, 116)"
        >
          ??????
        </FixedButton>
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
  justify-content: flex-start;
  align-items: center;
  padding-right: 10px;
`;

const FixedButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: ${(props) => (props.color === "RGB(255, 0, 0)" ? "120px" : "20px")};
  height: 40px;
  width: 80px;
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

const Button = styled.div`
  height: 40px;
  width: 80px;
  margin: 30px;
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

const Checkbox = styled.input`
  margin: 10px;
`;

const Select = styled.select`
  padding: 10px;
  margin: 10px;
`;
