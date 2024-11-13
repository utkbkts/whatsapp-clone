import Sidebar from "./partials/sidebar/Sidebar";

const HomePage = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-start justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="container flex min-h-full">
        {/* Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
