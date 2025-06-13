import Footer from "@/components/ui/Footer";
import CommanNav from "@/components/ui/Navbar/CommanNav";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <CommanNav/>
       <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
