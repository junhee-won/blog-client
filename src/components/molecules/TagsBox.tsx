import styled from "styled-components";
import Tag from "../atoms/Tag";
import { Category } from "../../types/interfaces";

interface Props {
  tag: number;
  selectTag: (arg: number) => void;
  categories: Category[];
}

export default function TagsBox({ tag, selectTag, categories }: Props) {
  return (
    <Wrapper>
      <Tag
        key={0}
        handleClick={() => selectTag(0)}
        isSelected={tag === 0}
        text="all"
      />
      {categories.map((category) => {
        return (
          <Tag
            key={category.id}
            handleClick={() => selectTag(category.id || 0)}
            isSelected={category.id === tag}
            text={category.name}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;
