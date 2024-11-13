export type SignupType = {
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
