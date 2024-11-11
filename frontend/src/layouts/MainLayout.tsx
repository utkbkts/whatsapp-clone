import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="min-h-screen flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
