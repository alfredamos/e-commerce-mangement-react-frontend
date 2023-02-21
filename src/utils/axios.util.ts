import axios from "axios";

const baseURL = "http://localhost:3100/api/";
const Axios = axios.create({
  baseURL,
});


Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") as string;

    console.log({token});
       
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    console.log({errorMessage: error.message});
    
    return Promise.reject(error);
  }
);

export default Axios;
