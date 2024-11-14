export const getConversationId = (user: any, users: any) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id;
};
