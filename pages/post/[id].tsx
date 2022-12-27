import styled from "styled-components";
import { NextPageContext } from "next";
import { useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import PageTopbar from "../../src/components/common/PageTopbar";
import apiHelper from "../../src/modules/apiHelper";

interface Props {
  created_at: string;
  title: string;
  content: string;
  category: string;
  id: number;
}

function PostPage({ created_at, title, content, category, id }: Props) {
  const purifiedHTML: string = DOMPurify.sanitize(content);

  const checkView = async () => {
    const _id = id.toString();
    const match = document.cookie.match(
      new RegExp("(^| )" + "view" + "=([^;]+)")
    );
    const _ids = match?.[2]?.split(",");
    if (_ids?.find((ele) => ele === _id)) return;

    // 서버 API 통신
    await apiHelper({
      url: process.env.NEXT_PUBLIC_API_VIEW_POST,
      method: "POST",
      body: {
        post_id: id,
        localeDateString: new Date().toLocaleDateString(),
      },
    });

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

  return (
    <Container>
      <PageTopbar />
      <Title>
        <h1>{title}</h1>
      </Title>
      <Content className="content">
        <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
      </Content>
    </Container>
  );
}

PostPage.getInitialProps = async ({ query }: NextPageContext) => {
  const res = await apiHelper({
    url: `${process.env.NEXT_PUBLIC_API_GET_POST}${query?.id}`,
    method: "GET",
  });
  return { ...res, id: query?.id };
};

export default PostPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.div`
  width: 95vw;
  min-width: 200px;
  height: 100px;
  min-height: 100px;
  border: 3px solid black;
  font-size: 20px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  margin-top: 10px;
`;

const Content = styled.div`
  width: 95vw;
  padding-top: 30px;
  padding-bottom: 100px;
  align-items: center;
`;
