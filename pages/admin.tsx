import styled from "styled-components";
import dynamic from "next/dynamic";
import { ReactComponentElement, useState } from "react";
import apiHelper from "../src/modules/apiHelper";
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
  const [text, setText] = useState("");
  const [onWritePost, setOnWritePost] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickTest = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_TEST,
      method: "GET",
      jwt: token,
    });
    console.log(res);
  };

  const offWritePost = () => setOnWritePost(false);

  if (!token) {
    if (!onWritePost) {
      return (
        <Container>
          <Sidebar
            setOnWritePost={setOnWritePost}
            setActiveIndex={setActiveIndex}
          />
          {Components.map((Component, index) => {
            if (index === activeIndex) {
              return <Component key={index} />;
            }
          })}
        </Container>
      );
    } else {
      return <DynamicWritePost offWritePost={offWritePost} />;
    }
  } else {
    return (
      <Container>
        <Login setToken={setToken} />
      </Container>
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
