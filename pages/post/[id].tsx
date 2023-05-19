import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ErrorPage from "../_error";
import apiHelper from "../../src/modules/apiHelper";
import { parseContents } from "../../src/modules/parseContents";
import PostTemplate from "../../src/components/templates/PostTemplate";
import { Post } from "../../src/types/interfaces";

interface Props {
  id: number;
  post: Post;
  success: boolean;
}

const PostPage: NextPage<Props> = ({ success, post, id }) => {
  const checkView = async () => {
    const idStr = id.toString();
    const viewCookie = Cookies.get("view") || "";
    const idStrArr = viewCookie.split(",");
    if (idStrArr?.find((ele) => ele === idStr)) return;
    try {
      await apiHelper({
        url: process.env.NEXT_PUBLIC_API_VIEW_POST,
        method: "POST",
        body: {
          post_id: id,
          localeDateString: new Date().toLocaleDateString(),
        },
      });
    } catch (error) {}

    const expire = new Date();
    expire.setHours(23, 59, 59);

    let newViewCookie: string;
    if (viewCookie === "") {
      newViewCookie = idStr;
    } else {
      newViewCookie = viewCookie + `,${idStr}`;
    }
    Cookies.set("view", newViewCookie, { expires: expire });
  };

  useEffect(() => {
    if (success) {
      checkView();
    }
  }, []);

  if (!success) return <ErrorPage />;

  const ogUrl = `https://junhee.kr/post/${id}`;
  const { title } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="개발이 개발새발" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:description" content="개발새발 개발 블로그" />
        <meta
          property="og:image"
          content="https://d1qlsar6961fb5.cloudfront.net/etc/og-image.png"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostTemplate post={post} />
    </>
  );
};

PostPage.getInitialProps = async ({ query }) => {
  const res = await apiHelper({
    url: `${process.env.NEXT_PUBLIC_API_GET_POST}${query?.id}`,
    method: "GET",
  });
  const post = res.data;
  if (res.success) {
    const { headings, content } = parseContents(post);
    post.headings = headings;
    post.content = content;
  }
  return { post, success: res.success, id: Number(query.id) };
};

export default PostPage;
