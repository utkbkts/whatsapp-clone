import { useUserStore } from "@/store/user-store";

const menuComponent = [
  {
    id: 1,
    title: "New Group",
  },
  {
    id: 2,
    title: "New community",
  },
  {
    id: 3,
    title: "Starred messaged",
  },
  {
    id: 4,
    title: "Settings",
  },
  {
    id: 5,
    title: "Logout",
  },
];

const Menu = () => {
  const { logout } = useUserStore();
  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        {menuComponent.map((item) => {
          return item.title === "Logout" ? (
            <li
              onClick={logout}
              key={item.id}
              className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
            >
              <span>{item.title}</span>
            </li>
          ) : (
            <li
              key={item.id}
              className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
            >
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
