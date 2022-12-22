import styled from "styled-components";
import { NextPageContext } from "next";
import DOMPurify from "isomorphic-dompurify";
import PageTopbar from "../../src/components/common/PageTopbar";
import apiHelper from "../../src/modules/apiHelper";

interface Props {
  created_at: string;
  title: string;
  content: string;
  category: string;
}

function PostPage({ created_at, title, content, category }: Props) {
  const purifiedHTML: string = DOMPurify.sanitize(content);

  return (
    <Container>
      <PageTopbar />
      <Title>
        <h1>{title}</h1>
      </Title>
      <Content>
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
  return res;
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
`;
