import { useState } from "react";
import { Post } from "../types/interfaces";

interface Props {
  allPosts: Post[];
}

export function useTag({
  allPosts,
}: Props): [Post[], number, (arg: number) => void] {
  const [tag, setTag] = useState(0);
  const [posts, setPosts] = useState(allPosts);

  const selectTag = (id: number) => {
    setTag(id);
    if (id === 0) {
      setPosts(allPosts);
    } else {
      setPosts(allPosts.filter((post) => post.category_id === id));
    }
  };

  return [posts, tag, selectTag];
}
