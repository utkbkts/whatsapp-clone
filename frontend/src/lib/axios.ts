import _axios from "axios";

const axiosInstance = _axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1"
      : "/api/v1",
  withCredentials: true,
});

export { axiosInstance as axios };
