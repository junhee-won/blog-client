import { useEffect, useState } from "react";

interface Props {
  text: string;
}

interface TagType {
  type: string;
  text: string;
}

export default function TextPreview({ text }: Props) {
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    const parseText = (text: string): void => {
      const _tags: Array<TagType> = [];
      const lines: string[] = text.split("\n");
      lines.forEach((line) => {
        if (line[0] === "#") {
          const typeEndIndex: number = line.slice(1).indexOf("#") + 1;
          console.log(typeEndIndex);
          if (typeEndIndex == -1) return;
          _tags.push({
            type: line.slice(1, typeEndIndex),
            text: line.slice(typeEndIndex + 2),
          });
        } else {
          if (line === "") return;
          _tags.push({
            type: "p",
            text: line,
          });
        }
      });
      setTags(_tags);
      console.log(_tags);
    };
    parseText(text);
  }, [text]);

  return (
    <div>
      {tags.map((item, index) => {
        const { type, text } = item;
        if (type === "p") {
          return <p key={index}>{text}</p>;
        } else if (type === "br") return <br />;
      })}
      <ol>
        <li>123</li>
        <li>456</li>
        <li>789</li>
      </ol>
    </div>
  );
}
