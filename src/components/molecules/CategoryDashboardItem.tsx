import styled from "styled-components";
import { ReactNode, MouseEvent } from "react";

interface Props {
  children: ReactNode;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface InputProps {
  children: ReactNode;
  name: string;
  width: number;
}

interface ButtonProps {
  onClick: (arg: MouseEvent<HTMLDivElement>) => void;
  disable: boolean;
}

export default function CategoryDashboardItem({
  children,
  id,
  createdAt,
  updatedAt,
}: Props) {
  return (
    <Wrapper>
      <TextWrapper>
        <div>id: {id}</div>
        <div>createdAt: {createdAt}</div>
        <div>updatedAt: {updatedAt}</div>
      </TextWrapper>
      {children}
    </Wrapper>
  );
}

function CategoryDashboardItemInput({ children, name, width }: InputProps) {
  return (
    <InputWrapper width={width}>
      {name}:<div style={{ width: width - 80 }}>{children}</div>
    </InputWrapper>
  );
}

function CategoryDashboardItemButton({ onClick, disable }: ButtonProps) {
  return (
    <ButtonWrapper onClick={onClick}>{disable ? "수정" : "완료"}</ButtonWrapper>
  );
}

CategoryDashboardItem.input = CategoryDashboardItemInput;
CategoryDashboardItem.button = CategoryDashboardItemButton;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 900px;
  padding: 20px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const TextWrapper = styled.div`
  width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => `${props.width}px`};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: skyblue;
  width: 60px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
`;
