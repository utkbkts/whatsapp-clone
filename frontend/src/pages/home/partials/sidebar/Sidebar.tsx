import Notifications from "./Notifications";
import Search from "./Search";
import SidebarHeader from "./SidebarHeader";
import Conversation from "./Conversation";
import useConversationSearch from "@/hooks/useConversationSearch";
import SearchResultsItem from "@/components/searchResultsItem/SearchResultsItem";

const Sidebar = () => {
  const { searchResults } = useConversationSearch();
  console.log("🚀 ~ Sidebar ~ searchResults:", searchResults);

  return (
    <div className="w-[40%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search */}
      <Search />
      {/* conversation */}
      {searchResults?.results > 0 ? <SearchResultsItem /> : <Conversation />}
    </div>
  );
};

export default Sidebar;
