import { useState } from "react";
import CategoryDashboardItem from "./CategoryDashboardItem";
import Textarea from "../atoms/Textarea";
import apiHelper from "../../modules/apiHelper";
import { Category } from "../../types/interfaces";

interface Props {
  category: Category;
  getCategories: (arg: void) => Promise<void>;
}

export default function CategoryDashboardItemContainer({
  category,
  getCategories,
}: Props) {
  const { id, created_at, updated_at, name, description, thumbnail, priority } =
    category;

  const [_name, _setName] = useState(name || "");
  const [_description, _setDescription] = useState(description || "");
  const [_thumbnail, _setThumbnail] = useState(thumbnail || "");
  const [_priority, _setPriority] = useState(String(priority) || "0");
  const [_public, _setPublic] = useState(String(category.public) || "0");
  const [disable, setDisable] = useState(true);

  const handleButtonClick = async () => {
    if (!disable) {
      const publicNum = parseInt(_public);
      const priorityNum = parseInt(_priority);
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_ADMIN_UPDATE_CATEGORY,
        method: "PUT",
        jwt: true,
        body: {
          id: id,
          name: _name,
          description: _description,
          thumbnail: _thumbnail,
          public: publicNum,
          priority: priorityNum,
        },
      });
      if (!res.success) {
        alert("error");
      }
      getCategories();
    }
    setDisable(!disable);
  };

  return (
    <CategoryDashboardItem
      id={id}
      createdAt={created_at}
      updatedAt={updated_at}
    >
      <CategoryDashboardItem.input name="제목" width={500}>
        <Textarea text={_name} setText={_setName} disable={disable} />
      </CategoryDashboardItem.input>
      <CategoryDashboardItem.input name="공개" width={150}>
        <Textarea text={_public} setText={_setPublic} disable={disable} />
      </CategoryDashboardItem.input>
      <CategoryDashboardItem.input name="우선순위" width={150}>
        <Textarea text={_priority} setText={_setPriority} disable={disable} />
      </CategoryDashboardItem.input>
      <CategoryDashboardItem.input name="설명" width={800}>
        <Textarea
          text={_description}
          setText={_setDescription}
          rows={5}
          disable={disable}
        />
      </CategoryDashboardItem.input>
      <CategoryDashboardItem.input name="썸네일" width={700}>
        <Textarea text={_thumbnail} setText={_setThumbnail} disable={disable} />
      </CategoryDashboardItem.input>
      <CategoryDashboardItem.button
        onClick={handleButtonClick}
        disable={disable}
      />
    </CategoryDashboardItem>
  );
}
