/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUserStore } from "@/store/user-store";
import { redirect } from "react-router-dom";

export const UserLoaders = async () => {
  const { getUser } = useUserStore.getState();
  try {
    const response = await getUser();
    return response;
  } catch (err: any) {
    return redirect("/");
  }
};
