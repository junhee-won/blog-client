import styled from "styled-components";
import dynamic from "next/dynamic";
import { useState } from "react";
import TextPreview from "../src/admin/TextPreview";
import Login from "../src/admin/Login";
import apiHelper from "../src/modules/apiHelper";

const DynamicWritePost = dynamic(() => import("../src/admin/WritePost"), {
  ssr: false,
});

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [text, setText] = useState("");
  const [onWritePost, setOnWritePost] = useState(false);

  const onClickTest = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_TEST,
      method: "GET",
      jwt: token,
    });
    console.log(res);
  };

  const offWritePost = () => setOnWritePost(false);

  if (token) {
    if (!onWritePost) {
      return (
        <Container>
          <TextPreview text={text} />
          <button onClick={onClickTest}>api 테스트</button>
          <button onClick={() => setOnWritePost(true)}>글쓰기</button>
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
`;
