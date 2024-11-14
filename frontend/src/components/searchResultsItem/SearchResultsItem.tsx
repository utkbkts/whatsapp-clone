import useConversationSearch from "@/hooks/useConversationSearch";
import Contact from "../contact/Contact";

const SearchResultsItem = () => {
  const { searchResults } = useConversationSearch();

  return (
    <div className="w-full convos scrollbar">
      <div>
        {/* heading */}
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>
        <ul>
          {searchResults?.results > 0 ? (
            searchResults.users.map((user) => (
              <Contact contact={user} key={user._id} />
            ))
          ) : (
            <p className="text-center py-4">No contacts found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchResultsItem;
