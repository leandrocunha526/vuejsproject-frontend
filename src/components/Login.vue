<template>
    <div class="flex items-center justify-center py-12">
        <div class="w-full max-w-screen-sm">
            <form @submit.prevent="onSubmit()" class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                <div class="flex items-center justify-center">
                    <h1>Entre com seu nome de usuário e senha</h1>
                </div>
                <div class="flex items-center justify-center">
                    <img src="./../assets/login.png" alt="Login" class="w-20 h-20" />
                </div>
                <div v-if="user.loginErrorMessages.length != 0"
                    class="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                    <ul v-for="(errorMessage, index) in user.loginErrorMessages" :key="index">
                        <li class="block sm:inline">{{ errorMessage }}</li>
                    </ul>
                </div>
                <div class="mb-4 username-input">
                    <label for="username" class="block mb-2 text-sm font-bold text-gray-700">
                        Nome de usuário</label>
                    <input id="username"
                        class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline"
                        type="text" placeholder="Nome de usuário" v-model="user.username" />
                    <p class="text-red-500" v-if="!!errors.username">
                        {{ errors.username }}
                    </p>
                </div>

                <div class="mb-6 password-input">
                    <label for="password" class="block mb-2 text-sm font-bold text-gray-700">Senha</label>

                    <input v-model="user.password"
                        class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline"
                        id="password" type="password" placeholder="Senha" />
                    <p class="text-red-500" v-if="!!errors.password">
                        {{ errors.password }}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-black focus:outline-none focus:shadow-outline"
                        type="submit">
                        Entrar
                    </button>
                    <router-link to="/signup" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Não possui uma conta? Clique aqui para criar a sua!
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required("Nome de usuário é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
});

export default {
    name: "LoginComponent",
    data() {
        return {
            user: {
                username: "",
                password: "",
                loginErrorMessages: [],
            },
            errors: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions("user", {
            login: "login",
        }),
        async onSubmit() {
            const data = {
                username: this.user.username,
                password: this.user.password,
            };
            const login_result = await this.login(data);
            schema
                .validate(this.user, { abortEarly: false })
                .then(() => {
                    console.log(login_result);
                    if (login_result.success) {
                        this.$router.push({ name: "DashboardView" });
                    } else {
                        this.user.loginErrorMessages.push(
                            "Usuário ou senha incorretos, verifique suas credenciais."
                        );
                    }
                })
                .catch((error) => {
                    error.inner.forEach((error) => {
                        this.errors = {
                            ...this.errors,
                            [error.path]: error.message,
                        };
                    });
                });
        },
        validate(field) {
            schema
                .validateAt(field, this.user)
                .then(() => (this.errors[field] = ""))
                .catch((error) => {
                    this.errors[error.path] = error.message;
                });
        },
    },
};
</script>
