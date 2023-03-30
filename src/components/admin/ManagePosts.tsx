import styled from "styled-components";
import { useState, useEffect } from "react";
import apiHelper from "../../modules/apiHelper";

interface Props {
  setIsWritingModalOpen: (arg: boolean) => void;
  setWritingMode: (arg: string) => void;
  setTargetPost: (arg: PostType) => void;
}

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

export default function ManagePosts({
  setIsWritingModalOpen,
  setWritingMode,
  setTargetPost,
}: Props) {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [visibility, setVisibility] = useState<"draft" | "public" | "private">(
    "public"
  );

  useEffect(() => {
    (async function () {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_POSTS,
        method: "GET",
        jwt: true,
        params: {
          visibility: visibility,
        },
      });
      if (res.success) {
        setPosts(res.data);
      }
    })();
  }, []);

  const updatePost = (post: PostType) => {
    setTargetPost(post);
    setWritingMode("update");
    setIsWritingModalOpen(true);
  };

  const convertDateFormat = (date: string): string => {
    return new Date(date).toISOString().replace(/T/, " ").replace(/\..+/, "");
  };

  const clickMenu = (menu: "draft" | "public" | "private") => {
    (async function () {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_POSTS,
        method: "GET",
        jwt: true,
        params: {
          visibility: menu,
        },
      });
      if (res.success) {
        setPosts(res.data);
        setVisibility(menu);
      }
    })();
  };

  return (
    <Container>
      <Menu>
        <Button
          onClick={() => clickMenu("draft")}
          selected={visibility === "draft"}
        >
          임시 저장
        </Button>
        <Button
          onClick={() => clickMenu("public")}
          selected={visibility === "public"}
        >
          공개
        </Button>
        <Button
          onClick={() => clickMenu("private")}
          selected={visibility === "private"}
        >
          비공개
        </Button>
      </Menu>
      {posts.map((post, index) => {
        return (
          <Post key={index}>
            <Title>
              <a>{post.title}</a>
            </Title>
            <DateBox>created_at:{convertDateFormat(post.created_at)}</DateBox>
            <DateBox>updated_at:{convertDateFormat(post.updated_at)}</DateBox>
            <Button onClick={() => updatePost(post)}>수정</Button>
          </Post>
        );
      })}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 80px;
  overflow: scroll;
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1100px;
  height: 60px;
  background-color: white;
  margin: 10px;
  border: 3px solid black;
  border-radius: 10px;
`;

const Title = styled.div`
  line-height: 60px;
  width: 60%;
  padding-left: 50px;
  font-size: 20px;
  font-weight: 500;
`;

const DateBox = styled.div`
  line-height: 60px;
  width: 200px;
  font-size: 12px;
  font-weight: 500;
  color: gray;
`;

const Button = styled.div<{ selected?: boolean }>`
  height: 40px;
  width: 80px;
  margin: 10px;
  background-color: ${(props) =>
    props?.selected ? "rgb(7, 47, 116)" : "rgb(66, 132, 243)"};
  color: white;
  line-height: 40px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(7, 47, 116);
  }
  text-align: center;
`;

const Menu = styled.div`
  position: fixed;
  top: 0;
  right: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1100px;
  height: 80px;
`;
