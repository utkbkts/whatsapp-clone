import { useSocketContext } from "@/context/SocketContext";
import { useUserStore } from "@/store/user-store";
import { OnlineUserType } from "@/types/type";
import { useEffect, useState } from "react";

const useOnlineUsersListener = () => {
  const { socket } = useSocketContext();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUserType[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!socket) return;
    socket.emit("join", user?.user._id);

    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("get-online-users");
    };
  }, [socket, setOnlineUsers, user]);

  return { onlineUsers };
};

export default useOnlineUsersListener;
