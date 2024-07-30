import api from "./api";

const register = async function (user) {
    return await api
        .post("/user/register", user, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const login = async function (user) {
    return await api
        .post("/user/login", JSON.stringify(user), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const getUserProfile = async function () {
    return await api
        .get("/user/profile", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const getUserDetail = async function (id) {
    return await api
        .get(`/user/detail/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data.user;
        })
        .catch((error) => {
            console.error(
                "Erro ao obter detalhes do usuário:",
                error.response || error
            );
            return error.response
                ? error.response.data
                : { error: "Erro desconhecido" };
        });
};

const updateUser = async function (id, user) {
    return await api
        .put("/user/update/" + id, user, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const deleteUser = async function (user_id) {
    return await api
        .delete("/user/delete/" + user_id, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const getTasks = async function () {
    return await api
        .get("/task/list", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const createTask = async function (task) {
    return await api
        .post("/task/register", JSON.stringify(task), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const updateTask = async function (id, task) {
    return await api
        .put("/task/update/" + id, JSON.stringify(task), {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const deleteTask = async function (task_id) {
    return await api
        .delete("/task/delete/" + task_id, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

const listTaskById = async function (id) {
    return await api
        .get("/task/list/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data;
        });
};

export const userService = {
    register,
    login,
    getUserProfile,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    listTaskById,
    updateUser,
    deleteUser,
    getUserDetail,
};
