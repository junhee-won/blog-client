interface Props {
  content: string;
}

interface Heading {
  type: string;
  id: string;
  text: string;
}

export function parseContents({ content }: Props) {
  const Headings: Heading[] = [];
  const regex = /<(h2|h3)>(.*?)<\/\1>/g;
  const html = content.replace(regex, function (match, p1, p2) {
    const idValue = p2.trim().replace(/\s+/g, "-").toLowerCase();
    Headings.push({
      type: p1,
      id: idValue,
      text: p2,
    });
    return `<${p1} id="${idValue}">${p2}</${p1}>`;
  });

  return {
    Headings,
    content: html,
  };
}
