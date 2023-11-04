import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (req) => {
    const key = "sarah";
    if (key) {
      req.headers.Authorization = key;
    }
    return req;
  },
  (error) => {
    console.log(error);
  }
);

axiosInstance.interceptors.response.use((res) => {
  return res;
});
