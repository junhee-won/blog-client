import { useRouter } from "next/router";
import AdminMenu from "./AdminMenu";

interface Props {
  setSelectedMenu: (arg: "home" | "post" | "category") => void;
}

export default function AdminMenuContainer({ setSelectedMenu }: Props) {
  const router = useRouter();
  return (
    <AdminMenu>
      <AdminMenu.item onClick={() => router.push("/")}>블로그</AdminMenu.item>
      <AdminMenu.item onClick={() => setSelectedMenu("home")}>
        어드민 홈
      </AdminMenu.item>
      <AdminMenu.item onClick={() => setSelectedMenu("category")}>
        카테고리 관리
      </AdminMenu.item>
      <AdminMenu.item onClick={() => setSelectedMenu("post")}>
        글 관리
      </AdminMenu.item>
    </AdminMenu>
  );
}
