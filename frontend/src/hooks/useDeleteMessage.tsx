import { axios } from "@/lib/axios";

const useDeleteMessage = () => {
  const message = async (id: any) => {
    try {
      const response = await axios.delete(`/messages/${id}`);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { message };
};

export default useDeleteMessage;
