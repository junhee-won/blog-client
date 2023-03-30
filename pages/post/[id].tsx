import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import apiHelper from "../../src/modules/apiHelper";
import { useMedia } from "../../src/hooks/useMedia";
import ErrorPage from "../_error";
import Header from "../../src/components/common/Header";
import { parseContents } from "../../src/modules/parseContents";
import Cookies from "js-cookie";
import View from "../../src/components/post/View";

interface Props {
  created_at: string;
  title: string;
  content: string;
  category: string;
  id: number;
  success: boolean;
  thumbnail: string;
  category_id: number;
  Headings: {
    type: string;
    id: string;
    text: string;
  }[];
}

const PostPage: NextPage<Props> = ({
  success,
  created_at,
  title,
  content,
  category,
  id,
  thumbnail,
  category_id,
  Headings,
}) => {
  const media = useMedia();

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
    checkView();
  }, []);

  const ogUrl = `https://junhee.kr/post/${id}`;

  if (!success) return <ErrorPage />;
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
      <View
        created_at={created_at}
        title={title}
        content={content}
        category={category}
        thumbnail={thumbnail}
        category_id={category_id}
        Headings={Headings}
        component={<Header media={media} />}
        media={media}
      />
    </>
  );
};

PostPage.getInitialProps = async ({ query }) => {
  let _Headings, _content;
  const res = await apiHelper({
    url: `${process.env.NEXT_PUBLIC_API_GET_POST}${query?.id}`,
    method: "GET",
  });
  const data = res.data;
  if (res.success) {
    const { Headings, content } = parseContents(data);
    _Headings = Headings;
    _content = content;
  }
  return {
    ...data,
    id: query?.id,
    success: res.success,
    content: _content,
    Headings: _Headings,
  };
};

export default PostPage;
