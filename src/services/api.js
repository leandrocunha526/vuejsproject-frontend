import axios from "axios";
import router from "../router";
import { toast } from "vue3-toastify";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Exibir o toast
            return new Promise((resolve) => {
                toast.error(
                    "Error 401 (acesso não autorizado, isso ocorre devido sessão expirou ou seu login é incorreto): Por favor, clique aqui para fechar e realizar o login novamente.",
                    {
                        autoClose: false,
                        closeOnClick: true,
                        draggable: true,
                        position: "top-right",
                        pauseOnHover: true,
                        onClose: () => {
                            localStorage.removeItem("isLoggedIn");
                            localStorage.removeItem("userProfile");
                            router.push("/login");
                            resolve();
                        },
                    }
                );
            });
        }
        return Promise.reject(error);
    }
);

/*
// Intercepts all requests before they are sent to the server (tests only)
api.interceptors.request.use(
    // eslint-disable-next-line no-unused-vars
    (config) => {
        // Simula um erro 401 antes de enviar a solicitação ao servidor
        return Promise.reject({ response: { status: 401 } });
    },
    (error) => {
        return Promise.reject(error);
    }
);
*/

export default api;
