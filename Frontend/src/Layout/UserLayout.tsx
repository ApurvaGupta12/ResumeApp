import CommanNav from "@/components/ui/Navbar/CommanNav";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <CommanNav/>
       <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
