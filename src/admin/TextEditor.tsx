interface Props {
  text: string;
  setText: (arg: string) => void;
}

export default function TextEditor({ text, setText }: Props) {
  return (
    <div>
      <div contentEditable={true}>s</div>
    </div>
  );
}
