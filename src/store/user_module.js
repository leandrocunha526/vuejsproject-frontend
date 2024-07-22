import { userService } from "../services/user.service";

const state = () => ({
    registered: {
        message: "",
        success: false,
    },
    loggedIn: {
        message: "",
        success: false,
    },
    userProfile: {
        id: "",
        username: "",
    },
    tasks: [],
    taskDetail: {}, // Adicionando uma nova propriedade para armazenar uma tarefa específica
});
const getters = {
    isRegistered(state) {
        return state.registered;
    },
    isLoggedIn(state) {
        return state.loggedIn.success;
    },
    userProfile(state) {
        return state.userProfile;
    },
    tasks(state) {
        return state.tasks;
    },
    taskDetail(state) {
        return state.taskDetail; // Getter para obter a tarefa específica
    },
};
const actions = {
    registerReset({ commit }) {
        commit("registerReset");
    },
    async register({ commit }, user) {
        const res = await userService.register(user);
        if (res.success) {
            commit("registerSuccess");
            return res;
        } else {
            commit("registerFailure");
            return res;
        }
    },
    async getTasks({ commit }) {
        const res = await userService.getTasks();
        console.log("List all tasks response: ", res);
        if (res.success) {
            commit("getTaskSuccess", res.tasks);
            return res.tasks;
        } else {
            commit("getTaskFailure");
            console.log("Get task failed");
            return null;
        }
    },
    async login({ commit }, user) {
        const res = await userService.login(user);
        if (res.success) {
            const userProfile = await userService.getUserProfile();
            if (userProfile.id) {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem(
                    "userProfile",
                    JSON.stringify(userProfile)
                );
                commit("loginSuccess", userProfile);
                return res;
            } else {
                commit("loginFailure");
                return false;
            }
        } else {
            commit("loginFailure");
            return res;
        }
    },
    async createTask({ commit }, task) {
        const res = await userService.createTask(task);
        if (res.success) {
            commit("createTaskSuccess", res.task);
            return res;
        } else {
            commit("createTaskFailure");
            return res;
        }
    },
    async deleteTask({ commit }, tasks_ids) {
        const res = await userService.deleteTask(tasks_ids[0]);
        if (res.success) {
            commit("deleteTaskSuccess", tasks_ids[1]);
            return res;
        } else {
            return false;
        }
    },
    async updateTask({ commit }, update_task_info) {
        const task_id = update_task_info[0];
        const task_view_idx = update_task_info[1];
        let update_task = {
            id: task_id,
        };
        if (update_task_info[2] !== "") {
            update_task["title"] = update_task_info[2];
        }
        if (update_task_info[3] !== "") {
            update_task["description"] = update_task_info[3];
        }
        if (update_task_info[4] !== "") {
            update_task["status"] = update_task_info[4];
        }
        if (update_task_info[5] !== "") {
            update_task["duedate"] = update_task_info[5];
        }
        const res = await userService.updateTask(task_id, update_task);
        if (res.success) {
            commit("updateTaskSuccess", [task_view_idx, update_task]);
            return true;
        } else {
            return false;
        }
    },
    async getTaskById({ commit }, task_id) {
        const res = await userService.listTaskById(task_id);
        console.log("Detail task response: ", res.task);
        if (res.success) {
            commit("getTaskByIdSuccess", res.task);
            return res;
        } else {
            commit("getTaskByIdFailure");
            console.log("Get task failed");
            return null;
        }
    },
};
const mutations = {
    registerSuccess(state) {
        state.registered.message = "Registered successfully";
        state.registered.success = true;
    },
    registerFailure(state) {
        state.registered.message = "Registration failed";
        state.registered.success = false;
    },
    registerReset(state) {
        state.registered.message = "";
        state.registered.success = false;
    },
    loginSuccess(state, userProfile) {
        state.loggedIn.message = "Register successfully";
        state.loggedIn.success = true;
        state.userProfile.id = userProfile.id;
        state.userProfile.username = userProfile.username;
    },
    loginFailure(state) {
        state.loggedIn.message = "Register unsuccessfully";
        state.loggedIn.success = false;
    },
    loginReset(state) {
        state.loggedIn.message = "";
        state.loggedIn.success = false;
    },
    getTaskSuccess(state, tasks) {
        state.tasks = tasks;
    },
    createTaskSuccess(state, task) {
        state.tasks.push(task);
    },
    deleteTaskSuccess(state, task_view_idx) {
        state.tasks.splice(task_view_idx, 1);
    },
    updateTaskSuccess(state, update_task_info) {
        const task_view_idx = update_task_info[0];
        const update_task = update_task_info[1];
        state.tasks[task_view_idx] = update_task;
    },
    getTaskByIdSuccess(state, taskDetail) {
        state.taskDetail = taskDetail; // Atualiza o estado com a tarefa específica
    },
    getTaskByIdFailure(state) {
        state.taskDetail = {}; // Reseta a tarefa específica em caso de falha
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
