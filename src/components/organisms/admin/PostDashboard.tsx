import styled from "styled-components";
import { ReactNode } from "react";
import Button from "../../atoms/Button";
import { Post } from "../../../types/interfaces";

interface Props {
  children: ReactNode;
}

interface VisibilityButtonsProps {
  visibility: "draft" | "public" | "private";
  setVisibility: (arg: "draft" | "public" | "private") => void;
  addPost: (arg: void) => void;
}

interface PostsProps {
  posts: Post[];
  updatePost: (arg: Post) => void;
}

export default function PostDashboard({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

function Buttons({
  visibility,
  setVisibility,
  addPost,
}: VisibilityButtonsProps) {
  return (
    <ButtonsWrapper>
      <Button
        onClick={() => setVisibility("draft")}
        text="임시 저장"
        isFocused={visibility === "draft"}
      />
      <Button
        onClick={() => setVisibility("private")}
        text="비공개"
        isFocused={visibility === "private"}
      />
      <Button
        onClick={() => setVisibility("public")}
        text="공개"
        isFocused={visibility === "public"}
      />
      <Button onClick={() => addPost()} text="추가" backgroundColor="primary" />
    </ButtonsWrapper>
  );
}

function Posts({ posts, updatePost }: PostsProps) {
  const convertDateFormat = (date: string): string => {
    return new Date(date).toISOString().replace(/T/, " ").replace(/\..+/, "");
  };
  return (
    <>
      {posts.map((post, index) => {
        return (
          <Post key={index}>
            <Title>
              <a>{post.title}</a>
            </Title>
            <DateBox>created_at:{convertDateFormat(post.created_at)}</DateBox>
            <DateBox>updated_at:{convertDateFormat(post.updated_at)}</DateBox>
            <Button onClick={() => updatePost(post)} text="수정" />
          </Post>
        );
      })}
    </>
  );
}

PostDashboard.buttons = Buttons;
PostDashboard.posts = Posts;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 40px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-self: flex-end;
`;

const Post = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1100px;
  height: 60px;
  background-color: white;
  margin: 10px;
  border: 2px solid black;
  border-radius: 5px;
`;

const Title = styled.div`
  line-height: 60px;
  width: 60%;
  padding-left: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const DateBox = styled.div`
  line-height: 60px;
  width: 180px;
  font-size: 12px;
  font-weight: 500;
  color: gray;
`;
