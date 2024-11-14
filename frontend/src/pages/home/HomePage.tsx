import Sidebar from "./partials/sidebar/Sidebar";

const HomePage = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-start justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container flex h-screen">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
