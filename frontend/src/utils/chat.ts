export const getConversationId = (user: any, users: any) => {
  const otherUser = users.find((u: any) => u._id !== user.user._id);

  return otherUser ? otherUser._id : null;
};
