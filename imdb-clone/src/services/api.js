import axios from "axios";

const api = axios.create({
  baseURL: "/api/tmdb",
})

api.interceptors.response.use(
  (response)=> response.data,
  (error)=>{
    const message = error.response?.data?.error || "Something went wrong"
    console.log("API Error : ", message);
    return Promise.reject(new Error(message));
  }
)

export default api;
