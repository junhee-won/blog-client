import styled from "styled-components";
import dynamic from "next/dynamic";
import { useState } from "react";
import Login from "../src/admin/Login";
import Sidebar from "../src/admin/Sidebar";
import Home from "../src/admin/Home";
import ManagePosts from "../src/admin/ManagePosts";
import ManageCategories from "../src/admin/ManageCategories";

const DynamicWritePost = dynamic(() => import("../src/admin/WritePost"), {
  ssr: false,
});

interface PostType {
  id: number;
  category_id: number;
  title: string;
  content: string;
  public: number;
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [onWritePost, setOnWritePost] = useState(false);
  const [writingMode, setWritingMode] = useState("create");
  const [targetPost, setTargetPost] = useState<PostType | null>(null);

  const offWritePost = () => {
    setOnWritePost(false);
    setWritingMode("create");
    setTargetPost(null);
  };

  if (token) {
    if (!onWritePost) {
      return (
        <Container>
          <Sidebar
            setOnWritePost={setOnWritePost}
            setActiveIndex={setActiveIndex}
          />
          {activeIndex === 0 && <Home token={token} />}
          {activeIndex === 1 && (
            <ManagePosts
              token={token}
              setOnWritePost={setOnWritePost}
              setWritingMode={setWritingMode}
              setTargetPost={setTargetPost}
            />
          )}
          {activeIndex === 2 && <ManageCategories token={token} />}
        </Container>
      );
    } else {
      return (
        <DynamicWritePost
          offWritePost={offWritePost}
          writingMode={writingMode}
          targetPost={targetPost}
        />
      );
    }
  } else {
    return (
      <Container2>
        <Login setToken={setToken} />
      </Container2>
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
  padding-left: 200px;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
