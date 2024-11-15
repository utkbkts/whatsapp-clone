export const getConversationId = (user: any, users: any) => {
  const otherUser = users.find((u: any) => u._id !== user.user._id);

  return otherUser ? otherUser._id : null;
};

export const getConversationName = (user: any, users: any) => {
  return users[0]._id === user.user._id ? users[1].name : users[0].name;
};

export const getConversationPicture = (user: any, users: any) => {
  return users[0]._id === user.user._id
    ? users[1].picture.url
    : users[0].picture.url;
};
