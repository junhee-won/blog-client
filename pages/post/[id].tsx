import styled from "styled-components";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import apiHelper from "../../src/modules/apiHelper";
import { useMedia } from "../../src/hooks/useMedia";
import ErrorPage from "../_error";
import Header from "../../src/components/common/Header";
import Title from "../../src/components/post/Title";
import { parseContents } from "../../src/modules/parseContents";

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
  };
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
  const purifiedHTML: string = DOMPurify.sanitize(content);
  const checkView = async () => {
    const _id = id.toString();
    const match = document.cookie.match(
      new RegExp("(^| )" + "view" + "=([^;]+)")
    );
    const _ids = match?.[2]?.split(",");
    if (_ids?.find((ele) => ele === _id)) return;

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

    if (match === null) {
      document.cookie = `view=${_id}; Expires=${expire.toUTCString()};`;
    } else {
      document.cookie = `view=${
        match[2]
      },${_id}; Expires=${expire.toUTCString()};`;
    }
  };

  useEffect(() => {
    checkView();
    const script = document.createElement("script");
    script.text = "hljs.highlightAll()";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!success) return <ErrorPage />;
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header media={media} />
      <Title
        media={media}
        thumbnail={thumbnail}
        title={title}
        createdAt={created_at}
        category={category}
        categoryId={category_id}
      />
      <Content className="content">
        <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
      </Content>
    </Container>
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 60px;
`;

const Content = styled.div`
  width: 794px;
  max-width: 95%;
  padding: 50px 0 100px;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
`;
