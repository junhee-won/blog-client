import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HamburgerIcon from "../../../public/hamburger.svg";
import XIcon from "../../../public/x.svg";
import { CategoryInterface } from "../../types/interfaces";

interface Props {
  categories: CategoryInterface[];
}

export default function CategoryModal({ categories }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Button onClick={toggleModal}>
        <Image
          src={HamburgerIcon}
          alt="hamburger-menu"
          width={50}
          height={50}
        />
      </Button>
      <Container active={isModalOpen}>
        <ModalContainer
          onClick={(e) => e.stopPropagation()}
          active={isModalOpen}
        >
          <Button onClick={toggleModal}>
            <Image src={XIcon} alt="x" width={50} height={50} />
          </Button>
          {/* <AllPosts>전체보기</AllPosts> */}
          {categories.map((parentCategory, index) => {
            return (
              <ParentCategory key={index}>
                <Link href={`/category/${parentCategory.id}`}>
                  {parentCategory.name}
                </Link>
                {parentCategory?.children?.map((childCategory, childIndex) => {
                  return (
                    <ChildCategory key={childIndex}>
                      <Link
                        href={`/category/${childCategory.id}`}
                        key={childIndex}
                      >
                        - {childCategory.name}
                      </Link>
                    </ChildCategory>
                  );
                })}
              </ParentCategory>
            );
          })}
        </ModalContainer>
      </Container>
    </>
  );
}

const Container = styled.div<{ active: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${(props) => (props.active ? 1 : 0)};
  visibility: ${(props) => !props.active && "hidden"};
  transition: all 0.15s ease-in-out;
`;

const ModalContainer = styled.div<{ active: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 320px;
  height: 100vh;
  padding: 100px 50px 100px;
  background-color: #4e5684;
  color: white;
  right: ${(props) => (props.active ? "0px" : "-320px")};
  transition: all 0.15s ease-in-out;
`;

const ParentCategory = styled.div`
  width: 220px;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChildCategory = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 12px;
  padding-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Button = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  height: 50px;
  width: 50px;
`;
