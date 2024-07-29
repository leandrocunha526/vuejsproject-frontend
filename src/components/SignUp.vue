<template>
    <div class="flex items-center justify-center py-12">
        <div class="w-full max-w-screen-sm">
            <form @submit.prevent="onSubmit()" class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                <div class="flex items-center justify-center">
                    <h1>Que tal criar uma conta? Preencha com seu nome de usuário e senha!</h1>
                </div>
                <div class="flex items-center justify-center">
                    <img src="./../assets/login.png" alt="Login" class="w-20 h-20" />
                </div>
                <div v-if="user.registerErrorMessages.length != 0"
                    class="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">
                    <ul v-for="(errorMessage, index) in user.registerErrorMessages" :key="index">
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

                <div class="mb-6 confirme_password-input">
                    <label for="confirme_password" class="block mb-2 text-sm font-bold text-gray-700">Confirme sua
                        senha</label>

                    <input v-model="user.confirme_password"
                        class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline"
                        id="confirme_password" type="password"
                        placeholder="Digite sua senha novamente para confirmar" />
                    <p class="text-red-500" v-if="!!errors.confirme_password">
                        {{ errors.confirme_password }}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-black focus:outline-none focus:shadow-outline"
                        type="submit">
                        Enviar
                    </button>
                    <router-link to="/"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Retornar para a página de login
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
    confirme_password: yup.string().required("Confirmação de senha é obrigatória"),
});

export default {
    name: "SignUpComponent",
    data() {
        return {
            user: {
                username: "",
                password: "",
                confirme_password: "",
                registerErrorMessages: [],
            },
            errors: {
                username: "",
                password: "",
                confirme_password: "",
            },
        };
    },
    beforeMount() {
        this.initRegister();
    },
    methods: {
        ...mapActions("user", {
            register: "register",
            initRegister: "registerReset",
        }),
        onSubmit() {
            this.user.registerErrorMessages = [];
            this.errors = { username: "", password: "", confirme_password: "" }; // Clear errors

            const data = {
                username: this.user.username,
                password: this.user.password,
            };

            schema
                .validate(this.user, { abortEarly: false })
                .then(async () => {
                    if (this.user.username.length <= 5 || this.user.password.length <= 5 || this.user.confirme_password.length <= 5) {
                        this.user.registerErrorMessages.push("Usuário ou senha deve ser maior que 6 caracteres");
                    } else if (this.user.password !== this.user.confirme_password) {
                        this.user.registerErrorMessages.push("As senhas são diferentes");
                    } else {
                        const registerResult = await this.register(data);
                        if (registerResult.success) {
                            this.resetForm();  // Clear the form on success
                            this.$router.push("/"); // Navigate to the login page
                        } else {
                            this.resetForm();  // Clear the form on error
                            this.user.registerErrorMessages.push("Ocorreu um erro ao cadastrar o usuário. Error: " + registerResult.message);
                        }
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
        resetForm() {
            this.user.username = "";
            this.user.password = "";
            this.user.confirme_password = "";
            this.errors = { username: "", password: "", confirme_password: "" };
            this.user.registerErrorMessages = []; // Clear any existing error messages
        },
    },
};
</script>
