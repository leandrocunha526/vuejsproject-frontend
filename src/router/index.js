import { createRouter, createWebHistory } from "vue-router";
import store from "./../store";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
    {
        path: "/login",
        name: "LoginView",
        component: LoginView,
        meta: { requiredAuth: false },
    },
    {
        path: "/",
        name: "DashboardView",
        component: DashboardView,
        meta: { requiredAuth: true },
    },
    {
        path: "/signup",
        name: "SignUpView",
        component: SignUpView,
        meta: { requiredAuth: false },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiredAuth) {
        const isLoggedIn =
            store.getters["user/isLoggedIn"].success ||
            localStorage.getItem("isLoggedIn");

        const userIdExisted =
            store.getters["user/userProfile"].userId != -1 ||
            localStorage.getItem("userProfile")
                ? true
                : false;

        if (!isLoggedIn || !userIdExisted) {
            return next({ path: "/login" });
        }
        return next();
    }
    return next();
});

export default router;
