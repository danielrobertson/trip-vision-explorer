
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen w-full flex">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
