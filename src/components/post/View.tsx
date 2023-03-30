import styled from "styled-components";
import { useEffect, ReactElement } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useMedia } from "../../hooks/useMedia";
import Title from "./Title";
import Contents from "./Contents";
import hljs from "highlight.js";

interface Props {
  created_at: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  category_id: number;
  Headings: {
    type: string;
    id: string;
    text: string;
  }[];
  component: ReactElement;
  media: string;
}

export default function View({
  created_at,
  title,
  content,
  category,
  thumbnail,
  category_id,
  Headings,
  component,
  media,
}: Props) {
  const purifiedHTML: string = DOMPurify.sanitize(content);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Container>
      {component}
      <Title
        media={media}
        thumbnail={thumbnail}
        title={title}
        createdAt={created_at}
        category={category}
        categoryId={category_id}
      />
      <Body>
        <SideWrapper />
        <Content className="content">
          <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
        </Content>
        <SideWrapper>
          <Contents Headings={Headings} />
        </SideWrapper>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 60px;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const SideWrapper = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 200px;
`;

const Content = styled.div`
  width: 794px;
  max-width: 95%;
  padding: 50px 0 100px;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
`;
