import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { NextPageContext } from "next";
import { useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import PageTopbar from "../../src/components/common/PageTopbar";
import apiHelper from "../../src/modules/apiHelper";
import { useMedia } from "../../src/hooks/useMedia";
import ErrorPage from "../_error";

interface Props {
  created_at: string;
  title: string;
  content: string;
  category: string;
  id: number;
  success: boolean;
}

function PostPage({
  success,
  created_at,
  title,
  content,
  category,
  id,
}: Props) {
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
  }, []);

  if (!success) return <ErrorPage />;
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTopbar media={media} />
      {media === "mobile" ? (
        <>
          <MTitle>
            <h1>{title}</h1>
            <Link href="/">
              <HomeIcon>
                <Image
                  src="/home-fill-svgrepo-com.svg"
                  alt="home page"
                  width={50}
                  height={50}
                />
              </HomeIcon>
            </Link>
          </MTitle>
          <MContent className="content">
            <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
          </MContent>
        </>
      ) : (
        <>
          <Title>
            <h1>{title}</h1>
            <Link href="/">
              <HomeIcon>
                <Image
                  src="/home-fill-svgrepo-com.svg"
                  alt="home page"
                  width={50}
                  height={50}
                />
              </HomeIcon>
            </Link>
          </Title>
          <Content className="content">
            <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
          </Content>
        </>
      )}
    </Container>
  );
}

PostPage.getInitialProps = async ({ query }: NextPageContext) => {
  const res = await apiHelper({
    url: `${process.env.NEXT_PUBLIC_API_GET_POST}${query?.id}`,
    method: "GET",
  });
  const data = res.data;
  return { ...data, id: query?.id, success: res.success };
};

export default PostPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.div`
  position: relative;
  width: 1200px;
  height: 100px;
  min-height: 100px;
  margin-top: 10px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow-x: hidden;
`;

const MTitle = styled.div`
  position: relative;
  width: 95%;
  height: auto;
  margin-top: 10px;
  border: 3px solid black;
  padding: 0 40px 0;
  font-size: 20px;
  line-height: 60px;
`;

const Content = styled.div`
  width: 800px;
  padding: 50px 20px 100px;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
`;

const MContent = styled.div`
  width: 95%;
  padding: 50px 10px 100px;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
`;

const HomeIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
`;
