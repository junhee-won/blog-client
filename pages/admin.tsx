import styled from "styled-components";
import dynamic from "next/dynamic";
import { useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import apiHelper from "../src/modules/apiHelper";
import Login from "../src/components/admin/Login";
import Sidebar from "../src/components/admin/Sidebar";
import Home from "../src/components/admin/Home";
import ManagePosts from "../src/components/admin/ManagePosts";
import ManageCategories from "../src/components/admin/ManageCategories";

const DynamicWritePost = dynamic(
  () => import("../src/components/admin/WritePost"),
  {
    ssr: false,
  }
);

interface PostType {
  id: number;
  category_id: number;
  title: string;
  content: string;
  public: number;
  created_at: string;
  updated_at: string;
  thumbnail: string;
}

export default function AdminPage() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isWritingModalOpen, setIsWritingModalOpen] = useState(false);
  const [post, setPost] = useState<PostType | null>(null);

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeWritingModal = () => {
    setIsWritingModalOpen(false);
  };

  const openWritingModal = (post: PostType | null) => {
    setPost(post);
    setIsWritingModalOpen(true);
  };

  useLayoutEffect(() => {
    const jwt = Cookies.get("jwt");
    if (!jwt) return;
    apiHelper({
      url: process.env.NEXT_PUBLIC_API_SERVER + "/validate",
      method: "GET",
      jwt: true,
    }).then((res) => {
      if (res.success) {
        setIsLoginModalOpen(false);
      } else {
        setIsLoginModalOpen(true);
      }
    });
  }, []);

  return !isLoginModalOpen ? (
    <>
      <Container>
        <Sidebar
          setSelectedMenu={setSelectedMenu}
          openWritingModal={openWritingModal}
        />
        {selectedMenu === 0 && <Home />}
        {selectedMenu === 1 && (
          <ManagePosts openWritingModal={openWritingModal} />
        )}
        {selectedMenu === 2 && <ManageCategories />}
      </Container>
      <DynamicWritePost
        isOpen={isWritingModalOpen}
        onClose={closeWritingModal}
        post={post}
      />
    </>
  ) : (
    <Container2>
      <Login closeLoginModal={closeLoginModal} />
    </Container2>
  );
}

const Container = styled.div`
  position: relative;
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
