import { create } from "zustand";

interface ChatState {
  status: string;
  error: string;
  conversations: Array<any>;
  activeConversation: Record<string, any>;
  notifications: Array<any>;
  messages: Array<any>;

  setActiveConversation: (activeConversation: Record<string, any>) => void;
  setConversation: (conversations: Array<any>) => void;
  setMessages: (messages: Array<any>) => void;
  addMessage: (message: any) => void;
  updateMessage: (message: any) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  notifications: [],
  messages: [],

  setActiveConversation: (activeConversation) => {
    set({ activeConversation });
  },
  setConversation: (conversations) => {
    set({ conversations });
  },
  setMessages: (messages) => {
    set({ messages });
  },
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
  updateMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },
}));
