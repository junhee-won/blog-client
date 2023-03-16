import styled from "styled-components";
import { useState, useEffect } from "react";
import apiHelper from "../../modules/apiHelper";

interface Props {
  token: string;
}

interface CategoryType {
  id: number;
  name: string;
  parent_category_id: number;
  priority: number;
  public: number;
  created_at: string;
  updated_at: string;
}

export default function ManageCategories({ token }: Props) {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getPosts = async () => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_GET_ALL_CATEGROIES,
      method: "GET",
      jwt: token,
    });
    if (res.success) {
      setCategories(res.data);
    } else {
      alert("error");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onChangeInput = (
    index: number,
    key: string,
    value: string | number
  ) => {
    const _categories = JSON.parse(JSON.stringify(categories));
    if (key === "public") {
      _categories[index].public = 1 - _categories[index].public;
    } else {
      _categories[index][key] = value;
    }
    setCategories(_categories);
  };

  const update = async (category: CategoryType) => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_CATEGORY,
      method: "PUT",
      jwt: token,
      body: {
        id: category.id,
        name: category.name,
        parent_category_id: category.parent_category_id,
        priority: category.priority,
        public: category.public,
      },
    });
    if (!res.success) {
      alert("error");
    } else {
      alert("완료");
      getPosts();
    }
  };

  const onClickAdd = () => {
    const _categories = JSON.parse(JSON.stringify(categories));
    const newPost = {
      name: "제목",
      parent_category_id: 0,
      priority: 0,
      public: 0,
    };
    _categories.push(newPost);
    setCategories(_categories);
  };

  const create = async (category: CategoryType) => {
    const res = await apiHelper({
      url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_CATEGORY,
      method: "POST",
      jwt: token,
      body: {
        name: category.name,
        parent_category_id: category.parent_category_id,
        priority: category.priority,
        public: category.public,
      },
    });
    if (!res.success) {
      alert("error");
    } else {
      alert("완료");
      getPosts();
    }
  };

  return (
    <Container>
      <CategoryContainer>
        {categories.map((category, index) => {
          return (
            <Category key={index}>
              <Text>id: {category.id}</Text>
              <Text>이름: </Text>
              <Name
                value={category.name}
                onChange={(e) => onChangeInput(index, "name", e.target.value)}
              />
              <Text>상위 카테고리 id: </Text>
              <Input
                value={category.parent_category_id}
                onChange={(e) =>
                  onChangeInput(index, "parent_category_id", e.target.value)
                }
              />
              <Text>우선순위: </Text>
              <Input
                value={category.priority}
                onChange={(e) =>
                  onChangeInput(index, "priority", e.target.value)
                }
              />
              <Text>공개 </Text>
              <Checkbox
                type="checkbox"
                checked={category.public === 1 ? true : false}
                onChange={(e) => onChangeInput(index, "public", e.target.value)}
              />
              <Button
                onClick={
                  category.id === undefined
                    ? () => create(category)
                    : () => update(category)
                }
              >
                완료
              </Button>
            </Category>
          );
        })}
      </CategoryContainer>
      <Button onClick={onClickAdd}>추가</Button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CategoryContainer = styled.div`
  background-color: RGB(231, 237, 242);
  margin-bottom: 30px;
`;

const Category = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 900px;
  height: 80px;
  background-color: white;
  margin: 10px;
`;

const Text = styled.div`
  height: 80px;
  line-height: 80px;
  margin-left: 30px;
  margin-right: 10px;
`;

const Name = styled.input`
  width: 200px;
  height: 40px;
  line-height: 40px;
`;

const Input = styled.input`
  width: 40px;
  height: 40px;
  line-height: 40px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  line-height: 20px;
`;

const Button = styled.div`
  height: 40px;
  width: 80px;
  margin-left: 50px;
  background-color: RGB(66, 132, 243);
  color: white;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: RGB(66, 132, 243);
  }
`;
