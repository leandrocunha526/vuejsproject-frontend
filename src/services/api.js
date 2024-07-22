import axios from "axios";
import router from "../router";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            router.push("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
