import { userService } from "../services/user.service";

const state = () => ({
    tasks: [], // Lista de tarefas
});

const getters = {
    tasks(state) {
        return state.tasks;
    },
};

const actions = {
    async getTasks({ commit }) {
        try {
            const res = await userService.getTasks();
            console.log("List all tasks response: ", res);
            if (res.success) {
                commit("getTasksSuccess", res.tasks);
                return res.tasks;
            } else {
                console.error("Failed to get tasks:", res.message);
                return null;
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return null;
        }
    },
};

const mutations = {
    getTasksSuccess(state, tasks) {
        state.tasks = tasks;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
