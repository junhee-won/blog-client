import styled from "styled-components";
import { useState } from "react";
import apiHelper from "../modules/apiHelper";

interface Props {
  token: string;
}

interface CategoryType {}

export default function ManageCategories({ token }: Props) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  (async function () {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_CATEGROIES,
      method: "GET",
      jwt: token,
    });
    if (res !== "err") {
      setCategories(res);
    }
  })();
  return <Container>카테고리 관리</Container>;
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: green;
`;
