import { OnlineUserType, SignupType } from "@/types/type";

export const getConversationId = (user: any, users: any) => {
  return users[0]._id === user.user._id ? users[1]._id : users[0]._id;
};

export const getConversationName = (user: any, users: any) => {
  return users[0]._id === user.user._id ? users[1].name : users[0].name;
};

export const getConversationPicture = (user: any, users: any) => {
  return users[0]._id === user.user._id
    ? users[1].picture.url
    : users[0].picture.url;
};

export const checkOnlineStatus = (
  onlineUsers: OnlineUserType[],
  user: any,
  users: any
) => {
  let convoId = getConversationId(user, users);
  let check = onlineUsers.find((u) => u.userId === convoId);
  return !!check;
};
