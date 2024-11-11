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
}

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, picture, status }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/register", {
        name,
        email,
        password,
        picture,
        status,
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
}));
