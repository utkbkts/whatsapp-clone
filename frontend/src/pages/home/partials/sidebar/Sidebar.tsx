import Notifications from "./Notifications";
import Search from "./Search";
import SidebarHeader from "./SidebarHeader";
import Conversation from "./Conversation";

const Sidebar = () => {
  return (
    <div className="w-[40%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search */}
      <Search />
      {/* conversation */}
      <Conversation />
    </div>
  );
};

export default Sidebar;
