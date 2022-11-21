import { useState } from "react";
import TextEditor from "../src/admin/TextEditor";
import TextPreview from "../src/admin/TextPreview";

export default function AdminPage() {
  const [text, setText] = useState("");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TextEditor text={text} setText={setText} />
      <TextPreview text={text} />
    </div>
  );
}
