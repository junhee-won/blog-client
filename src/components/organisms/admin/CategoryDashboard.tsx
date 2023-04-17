import styled from "styled-components";
import { useState, useEffect } from "react";
import apiHelper from "../../../modules/apiHelper";
import CategoryDashboardItemContainer from "../../molecules/CategoryDashboardItemContainer";
import Button from "../../atoms/Button";
import { Category } from "../../../types/interfaces";

export default function CategoryDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_CATEGROIES,
      method: "GET",
      jwt: true,
    });
    if (res.success) {
      setCategories(res.data);
    } else {
      alert("error");
    }
  };

  const handleAddButton = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_CATEGORY,
      method: "POST",
      jwt: true,
    });
    if (!res.success) {
      alert("error");
    } else {
      getCategories();
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Wrapper>
      {categories.map((item, index) => {
        return (
          <CategoryDashboardItemContainer
            category={item}
            key={index}
            getCategories={getCategories}
          />
        );
      })}
      <ButtonWrapper>
        <Button text="추가" onClick={handleAddButton} />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding-top: 40px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  right: 70px;
  bottom: 10px;
`;
