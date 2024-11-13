import useConversationSearch from "@/hooks/useConversationSearch";
import FilterIcon from "@/svg/FilterIcon";
import ReturnIcon from "@/svg/Return";
import SearchIcon from "@/svg/Search";
import { useState } from "react";

const Search = () => {
  const [show, setShow] = useState<boolean>(false);
  const { searchTerm, setSearchTerm, searchResults } = useConversationSearch();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShow(false);
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchResults?.results > 0 ? (
              <span className="w-8 flex items-center justify-center rotateAnimation">
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              name="search"
              placeholder="Search or start a new chat"
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShow(true)}
              onBlur={() => searchResults?.results === 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:bg-dark_svg_2 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
