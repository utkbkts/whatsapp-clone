import { useUserStore } from "@/store/user-store";
import ChatIcon from "@/svg/Chat";
import CommunityIcon from "@/svg/Community";
import DotsIcon from "@/svg/Dots";
import StoryIcon from "@/svg/Story";
import { useState } from "react";
import Menu from "./Menu";
const SidebarHeader = () => {
  const { user } = useUserStore();
  const [showMenu, setShowMenu] = useState(true);
  if (!user) {
    return null;
  }
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 items-center flex px-[16px]">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* User image */}
        <button className="btn">
          <img
            src={user?.user?.picture?.url}
            alt="image"
            className="w-full h-full border border-blue-500 rounded-full object-cover "
            title="user | picture | image"
          />
        </button>
        {/* user icons */}
        <ul className="flex items-center gap-x-2">
          <li>
            <button className="btn">
              <CommunityIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <StoryIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <ChatIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li className="relative" onClick={() => setShowMenu((prev) => !prev)}>
            <button className={`btn ${showMenu ? "" : ""}`}>
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
            {showMenu ? <Menu /> : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
