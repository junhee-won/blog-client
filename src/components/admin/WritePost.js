import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import apiHelper from "../../modules/apiHelper";
import View from "../post/View";
import { MyUploadAdapter } from "../../modules/ckeditor/MyUploadAdapter";

export default function WritePost({ isOpen, onClose, post, routeAdminHome }) {
  const [editor, setEditor] = useState();
  const [title, setTitle] = useState("임시 제목");
  const [content, setContent] = useState("");
  const [isHTMLModalOpen, setIsHTMLModalOpen] = useState(false);
  const [editorSource, setEditorSource] = useState("");
  const [visibility, setVisibility] = useState(2);
  const [categories, setCategories] = useState([]);
  const [categroyId, setCategoryId] = useState(1);
  const [thumbnail, setThumbnail] = useState(
    "https://d1qlsar6961fb5.cloudfront.net/default.jpeg"
  );
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new MyUploadAdapter(loader);
    };
  }

  const onClickSaveButton = () => {
    (async function () {
      let res;
      if (post === null) {
        res = await apiHelper({
          url: process.env.NEXT_PUBLIC_API_ADMIN_CREATE_POST,
          method: "POST",
          jwt: true,
          body: {
            title: title,
            content: content,
            public: visibility,
            category_id: categroyId,
            thumbnail,
          },
        });
      } else {
        res = await apiHelper({
          url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_POST,
          method: "PUT",
          jwt: true,
          body: {
            id: post.id,
            title: title,
            content: content,
            public: visibility,
            category_id: categroyId,
            thumbnail,
          },
        });
      }
      if (!res.success) {
        alert("error");
      } else {
        onClose();
        routeAdminHome();
      }
    })();
  };

  const onClickExitButton = () => {
    if (confirm("!!주의!! 나가기 전에 저장하자")) onClose();
  };

  const onClickHtml = () => {
    if (!isHTMLModalOpen) {
      setEditorSource(editor.data.get());
      setIsHTMLModalOpen(true);
    } else {
      setIsHTMLModalOpen(false);
      editor.data.set(editorSource);
    }
  };

  useEffect(() => {
    setTitle(post?.title || "임시 제목");
    setVisibility(post?.public || 2);
    setCategoryId(post?.category_id || 1);
    setThumbnail(
      post?.thumbnail || "https://d1qlsar6961fb5.cloudfront.net/default.jpeg"
    );
  }, [post]);

  useEffect(() => {
    if (editor && post) {
      setContent(post.content);
    }
  }, [editor]);

  useEffect(() => {
    (async function () {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_CATEGROIES,
        jwt: true,
        method: "GET",
      });
      if (res.success) {
        setCategories(res.data);
      }
    })();
    if (post?.thumbnail) {
      setThumbnail(post.thumbnail);
    }
    window.onbeforeunload = function () {
      return "Are you sure to leave this page?";
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  if (!isOpen) return null;
  if (isPreviewModalOpen)
    return (
      <PreviewWrapper>
        <View
          created_at="1998-02-21"
          title={title}
          content={content}
          category={"category"}
          thumbnail={thumbnail}
          category_id={0}
          Headings={[]}
          component={
            <PreviewExitButton
              onClick={() => {
                setIsPreviewModalOpen(false);
              }}
            >
              Exit
            </PreviewExitButton>
          }
          media={"pc"}
        />
      </PreviewWrapper>
    );

  return (
    <Container>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
      />
      <CKEditor
        editor={Editor}
        config={{
          extraPlugins: [uploadPlugin],
        }}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          setContent(data);
        }}
        onReady={(editor) => {
          setEditor(editor);
        }}
      />
      {isHTMLModalOpen && (
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
          onError={() =>
            setThumbnail("https://d1qlsar6961fb5.cloudfront.net/default.jpeg")
          }
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
          checked={visibility === 2}
          onChange={() => setVisibility(2)}
        />
        임시저장
        <Checkbox
          type="checkbox"
          checked={visibility === 1}
          onChange={() => setVisibility(1)}
        />
        공개
        <Checkbox
          type="checkbox"
          checked={visibility === 0}
          onChange={() => setVisibility(0)}
        />
        비공개
        <BottomButton
          onClick={() => setIsPreviewModalOpen(true)}
          color="black"
          hoverColor="gray"
        >
          미리보기
        </BottomButton>
        <BottomButton
          onClick={onClickExitButton}
          color="RGB(255, 0, 0)"
          hoverColor="RGB(130, 12, 13)"
        >
          나가기
        </BottomButton>
        <BottomButton
          onClick={onClickSaveButton}
          color="RGB(66, 132, 243)"
          hoverColor="RGB(7, 47, 116)"
        >
          저장
        </BottomButton>
      </BottomBar>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  gap: 20px;
`;

const Input = styled.input`
  height: 50px;
  width: 700px;
  padding: 10px;
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  background-color: RGB(245, 245, 245);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding-right: 10px;
  width: 100%;
  height: 80px;
`;

const BottomButton = styled.div`
  height: 40px;
  width: 80px;
  margin-left: 10px;
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
  width: 400px;
`;

const PreviewWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: 500;
  background-color: white;
  width: 100vw;
`;

const PreviewExitButton = styled.div`
  position: fixed;
  z-index: 10;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
`;
