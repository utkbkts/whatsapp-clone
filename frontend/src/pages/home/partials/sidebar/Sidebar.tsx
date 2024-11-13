import { useState } from "react";
import Notifications from "./Notifications";
import Search from "./Search";
import SidebarHeader from "./SidebarHeader";
import Conversation from "./Conversation";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[40%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search */}
      <Search searchLength={searchResults.length} />
      {/* conversation */}
      <Conversation />
    </div>
  );
};

export default Sidebar;
