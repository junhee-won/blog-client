import styled from "styled-components";
import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { ImageUploadAdapter } from "../../../modules/ckeditor/ImageUploadAdapter";
import Preview from "./Preview";
import EditorButtomBar from "../../molecules/EditorButtomBar";
import apiHelper from "../../../modules/apiHelper";

export default function Editor({ post, closeEditor }) {
  const [editor, setEditor] = useState();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState(post?.title || "임시 제목");
  const [content, setContent] = useState(post?.content || "");
  const [categoryId, setCategoryId] = useState(post?.category_id || 1);
  const [visibility, setVisibility] = useState(
    post?.public === undefined ? 2 : post.public
  );
  const [thumbnail, setThumbnail] = useState(
    post?.thumbnail || "https://d1qlsar6961fb5.cloudfront.net/default.jpeg"
  );
  const [isPreviewOpened, setIsPreviewOpened] = useState(false);
  const [previewPost, setPreviewPost] = useState();
  const [isHTMLModalOpen, setIsHTMLModalOpen] = useState(false);
  const [editorSource, setEditorSource] = useState("");

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new ImageUploadAdapter(loader);
    };
  }

  const handleSaveButton = (action) => {
    (async function () {
      const body = {
        title: title,
        content: content,
        public: visibility,
        category_id: categoryId,
        thumbnail,
        action: action,
      };
      if (post !== null) {
        body.id = post.id;
      }
      if (action === "publish") {
        body.public = 0;
      }
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_POST,
        method: "POST",
        jwt: true,
        body: body,
      });
      if (!res.success) {
        alert("error");
      } else {
        closeEditor();
      }
    })();
  };

  // const onClickHtml = () => {
  //   if (!isHTMLModalOpen) {
  //     setEditorSource(editor.data.get());
  //     setIsHTMLModalOpen(true);
  //   } else {
  //     setIsHTMLModalOpen(false);
  //     editor.data.set(editorSource);
  //   }
  // };

  const openPreview = () => {
    setPreviewPost({
      title,
      content,
      thumbnail,
      category_id: categoryId,
    });
    setIsPreviewOpened(true);
  };

  const closePreview = () => {
    setIsPreviewOpened(false);
  };

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

    window.onbeforeunload = function () {
      return "Are you sure to leave this page?";
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  if (isPreviewOpened)
    return <Preview post={previewPost} closePreview={closePreview} />;

  return (
    <Wrapper>
      <CloseButton onClick={closeEditor}>X</CloseButton>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="50"
      />
      <CKEditor
        editor={CustomEditor}
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
      <EditorButtomBar
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categories={categories}
        visibility={visibility}
        setVisibility={setVisibility}
        openPreview={openPreview}
        handleSaveButton={handleSaveButton}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  gap: 20px;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const CloseButton = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
`;

const Input = styled.input`
  height: 50px;
  width: 700px;
  padding: 10px;
`;
