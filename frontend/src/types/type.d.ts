export type SignupType = {
  _id?: any;
  user: {
    _id?: any;
    name?: string;
    password?: string;
    email?: string;
    picture?: any;
    status?: string | null;
  };
};

export type latestMessageType = {
  conversation: string;
  _id: any;
  sender: string;
  message: string;
  createdAt: string | undefined;
  files: [];
};

export type Conversation = {
  createdAt?: string | undefined;
  isGroup?: boolean;
  latestMessage?: latestMessageType;
  name?: string;
  picture?: {
    url?: string;
  };
  users?: SignupType;
};

export type searchResultsType = {
  results: number;
  success: boolean;
  users: SignupType[];
};
export type Files = {
  public_id: string;
  url: string;
  _id: string;
};
export type MessagesType = {
  conversation: {
    picture: {
      url: string;
    };
  };
  createdAt: string;
  message: string;
  sender: SignupType;
  _id: any;
  files: Files[];
};

export type OnlineUserType = {
  socketId: string;
  userId: string;
};
