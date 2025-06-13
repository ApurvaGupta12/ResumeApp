import CommanNav from "@/components/ui/Navbar/CommanNav";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  return (
    <>
      <CommanNav />
      <main className="min-h-screen p-4">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
