import Notifications from "./Notifications";
import Search from "./Search";
import SidebarHeader from "./SidebarHeader";
import Conversation from "./Conversation";
import useConversationSearch from "@/hooks/useConversationSearch";
import SearchResultsItem from "@/components/searchResultsItem/SearchResultsItem";
import { OnlineUserType } from "@/types/type";

const Sidebar = ({
  onlineUsers,
  typing,
}: {
  onlineUsers: OnlineUserType[];
  typing: any;
}) => {
  const { searchResults } = useConversationSearch();

  return (
    <div className="w-[40%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search */}
      <Search />
      {/* conversation */}
      {searchResults?.results > 0 ? (
        <SearchResultsItem />
      ) : (
        <Conversation onlineUsers={onlineUsers} typing={typing} />
      )}
    </div>
  );
};

export default Sidebar;
