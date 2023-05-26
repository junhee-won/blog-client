import styled from "styled-components";
import Image from "next/image";

interface Props {
  thumbnail: string;
  setThumbnail: (arg: string) => void;
  categoryId: string;
  setCategoryId: (arg: number) => void;
  visibility: number;
  setVisibility: (arg: number) => void;
  categories: any[];
  openPreview: () => void;
  handleSaveButton: (arg: string) => void;
}

export default function EditorButtomBar({
  thumbnail,
  setThumbnail,
  categoryId,
  setCategoryId,
  visibility,
  setVisibility,
  categories,
  openPreview,
  handleSaveButton,
}: Props) {
  return (
    <Wrapper>
      <input value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
      <Image
        alt="thumbnail"
        style={{ width: "100px" }}
        src={thumbnail}
        width={100}
        height={40}
        onError={() =>
          setThumbnail("https://d1qlsar6961fb5.cloudfront.net/default.jpeg")
        }
      />
      <Select
        onChange={(e) => setCategoryId(Number(e.target.value))}
        value={categoryId}
      >
        {categories.map((category, index) => {
          return (
            <option key={index} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </Select>
      <Button onClick={openPreview} color="black" hoverColor="gray">
        미리보기
      </Button>
      {visibility !== 2 && (
        <>
          <Checkbox
            type="checkbox"
            checked={visibility === 1}
            onChange={() => setVisibility(1)}
          />
          공개
          <Checkbox
            type="checkbox"
            checked={visibility === 0}
            onChange={() => setVisibility(0)}
          />
          비공개
        </>
      )}
      <Button
        onClick={() => handleSaveButton("save")}
        color="RGB(66, 132, 243)"
        hoverColor="RGB(7, 47, 116)"
      >
        저장
      </Button>
      {visibility === 2 && (
        <Button
          onClick={() => handleSaveButton("publish")}
          color="green"
          hoverColor="#14540d"
        >
          발행
        </Button>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: 100%;
  height: 80px;
  background-color: white;
`;

const Select = styled.select`
  padding: 10px;
  margin: 20px;
  width: 400px;
`;

const Button = styled.div<{ hoverColor: string }>`
  height: 40px;
  width: 80px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  color: white;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

const Checkbox = styled.input`
  margin: 10px;
`;

// const HtmlTextEditor = styled.textarea`
//   z-index: 10;
//   position: fixed;
//   top: 100px;
//   min-height: 600px;
//   max-height: 600px;
//   width: 700px;
//   overflow-y: scroll;
//   padding: 30px;
//   resize: none;
//   box-shadow: 0px 0px 2000px #000;
// `;
