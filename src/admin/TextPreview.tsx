import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  text: string;
}

export default function TextPreview({ text }: Props) {
  const html: string = marked.parse(text);
  const purifiedHTML: string = DOMPurify.sanitize(html);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: purifiedHTML }} />
    </div>
  );
}
