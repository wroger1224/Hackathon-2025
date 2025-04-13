import { Outlet } from "react-router";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-blue w-full">
      <Header />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
