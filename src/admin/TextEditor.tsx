interface Props {
  text: string;
  setText: (arg: string) => void;
}

export default function TextEditor({ text, setText }: Props) {
  return (
    <div>
      <textarea
        rows={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
