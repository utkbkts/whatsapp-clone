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
  refreshToken: () => Promise<void>;
  getUser: () => Promise<void>;
}

export const useUserStore = create<UserStoreType>((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, picture, status }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/auth/register", {
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

  signIn: async ({ email, password }: SignupType) => {
    set({ loading: true });

    try {
      const promiseFunction = axios.post("/auth/login", {
        email,
        password,
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

  // Yeni eklenen logout fonksiyonu
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
      console.log(error.response.data.message);
    }
  },

  // Yeni eklenen refreshToken fonksiyonu
  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const response = await axios.post("/auth/refreshtoken");
      set({ checkingAuth: false });
      return response.data;
    } catch (error: any) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise: any = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
