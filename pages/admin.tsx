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

const Components = [Home, ManagePosts, ManageCategories];

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [onWritePost, setOnWritePost] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const offWritePost = () => setOnWritePost(false);

  if (token) {
    if (!onWritePost) {
      return (
        <Container>
          <Sidebar
            setOnWritePost={setOnWritePost}
            setActiveIndex={setActiveIndex}
          />
          {Components.map((Component, index) => {
            if (index === activeIndex) {
              return <Component key={index} token={token} />;
            }
          })}
        </Container>
      );
    } else {
      return <DynamicWritePost offWritePost={offWritePost} />;
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
