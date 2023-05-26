import { useState } from "react";
import LoginContainer from "../src/components/organisms/admin/LoginContainer";
import Admin from "../src/components/organisms/admin/Admin";
import AdminMenuContainer from "../src/components/organisms/admin/AdminMenuContainer";
import HomeDashboard from "../src/components/organisms/admin/HomeDashboard";
import CategoryDashboard from "../src/components/organisms/admin/CategoryDashboard";
import PostDashboardContainer from "../src/components/organisms/admin/PostDashboardContainer";

export default function AdminPage() {
  const [selectedMenu, setSelectedMenu] = useState<
    "home" | "post" | "category"
  >("home");
  const [isLogin, setIsLogin] = useState(false);

  if (!isLogin) return <LoginContainer setIsLogin={setIsLogin} />;
  return (
    <Admin>
      <AdminMenuContainer setSelectedMenu={setSelectedMenu} />
      <Admin.dashboard>
        {selectedMenu === "home" && <HomeDashboard />}
        {selectedMenu === "category" && <CategoryDashboard />}
        {selectedMenu === "post" && <PostDashboardContainer />}
      </Admin.dashboard>
    </Admin>
  );
}
