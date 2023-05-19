import styled from "styled-components";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";
import { useLayoutEffect } from "react";

interface Props {
  content: string;
}

export default function PostContent({ content }: Props) {
  const purifiedHTML: string = DOMPurify.sanitize(content);

  useLayoutEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Wrapper className="content">
      <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 794px;
  max-width: 95%;
  padding: 50px 0 100px;
  align-items: center;
  line-height: 30px;
  font-size: 18px;
`;
