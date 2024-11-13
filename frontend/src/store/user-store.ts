import Toast from "@/components/Toast";
import { axios } from "@/lib/axios";
import { SignupType } from "@/types/type";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UserStoreType {
  user: SignupType | null;
  loading: boolean;
  checkingAuth: boolean;
  signup: (data: SignupType) => Promise<void>;
  signIn: (data: SignupType) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ user }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/auth/register", {
        name: user?.name,
        email: user?.email,
        password: user?.password,
        picture: user?.picture,
        status: user?.status,
      });

      const res = await promiseFunction;

      Toast({
        promiseFunction: () => promiseFunction,
        title: "Registration Successful",
        errorMessage: res.data?.message,
      });
      set({ user: res.data, loading: false });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  },

  signIn: async ({ user }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/auth/login", {
        email: user?.email,
        password: user?.password,
      });

      const res = await promiseFunction;

      Toast({
        promiseFunction: () => promiseFunction,
        title: "Login Successful",
        errorMessage: res.data?.message,
      });
      set({ user: res.data, loading: false });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  },

  logout: async () => {
    set({ loading: true });

    try {
      await axios.post("/auth/logout");

      toast.success("Logout success !!");
      set({ user: null, loading: false });
    } catch (error: any) {
      set({ loading: false });

      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
    }
  },

  getUser: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/getUser");
      set({ user: response.data, checkingAuth: false });
    } catch (error: any) {
      set({ checkingAuth: false, user: null });
    }
  },
}));
