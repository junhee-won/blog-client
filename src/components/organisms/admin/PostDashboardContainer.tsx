import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import apiHelper from "../../../modules/apiHelper";
import PostDashboard from "./PostDashboard";
import { Post } from "../../../types/interfaces";
const DynamicEditor = dynamic(() => import("./Editor"), {
  ssr: false,
});

export default function PostDashboardContainer() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visibility, setVisibility] = useState<"draft" | "public" | "private">(
    "draft"
  );
  const [isEditorOpened, setIsEditorOpened] = useState(false);
  const [targetPost, setTargetPost] = useState<null | Post>(null);

  const getPosts = async () => {
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
    } else {
      alert("error");
    }
  };

  const addPost = () => {
    setTargetPost(null);
    setIsEditorOpened(true);
  };

  const updatePost = (post: Post) => {
    setTargetPost(post);
    setIsEditorOpened(true);
  };

  const closeEditor = () => {
    if (confirm("Are you sure to leave this page?")) {
      getPosts();
      setIsEditorOpened(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, [visibility]);

  if (isEditorOpened)
    return <DynamicEditor post={targetPost} closeEditor={closeEditor} />;

  return (
    <PostDashboard>
      <PostDashboard.buttons
        visibility={visibility}
        setVisibility={setVisibility}
        addPost={addPost}
      />
      <PostDashboard.posts posts={posts} updatePost={updatePost} />
    </PostDashboard>
  );
}
