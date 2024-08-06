<template>
    <div class="max-w-max rounded overflow-hidden shadow-lg bg-white m-4 mx-auto">
        <div v-if="loading" class="flex items-center justify-center h-64">
            <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 4.411 2.875 8.147 6.791 9.473l-.791-4.182z">
                </path>
            </svg>
        </div>
        <div v-else class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Perfil do Usuário</div>
            <p class="text-gray-700 text-base">ID: {{ userProfile.id }}</p>
            <p class="text-gray-700 text-base">Username: {{ userProfile.username }}</p>
            <p class="text-gray-700 text-base">Criado em: {{ formatDate(userProfile.createdAt) }}</p>
            <p class="text-gray-700 text-base">Atualizado em: {{ formatDate(userProfile.updatedAt) }}</p>
        </div>
        <!-- Privacy Information -->
        <div class="mt-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-center">
            <i class="fas animate-pulse fa-key mr-2"></i>
            <strong>Aviso de privacidade</strong>
            <p>Todos os registros só podem ser acessados por você.</p>
            <p>Isso inclui seus dados e suas tarefas.</p>
        </div>
        <div class="flex items-center justify-center h-full">
            <div class="px-8 pt-6 pb-2 mx-auto max-w-md">
                <button @click="showEditModal = true"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Editar perfil
                </button>
                <button @click="showDeleteModal = true"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                    Excluir conta
                </button>
            </div>
        </div>
        <div v-if="showEditModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" @click="closeModal">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Editar Perfil</h3>
                                <div class="mt-2">
                                    <label for="username" class="block text-sm font-medium text-gray-700">Nome de
                                        usuário</label>
                                    <input v-model="editUserProfile.username" type="text" name="username" id="username"
                                        required
                                        class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    <span v-if="errors.username" class="text-red-500 text-sm">{{ errors.username
                                        }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="validateAndSubmit"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                            Salvar
                        </button>
                        <button @click="closeModal"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal de Confirmação de Exclusão -->
        <div v-if="showDeleteModal" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity" @click="closeDeleteModal">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Confirmar Exclusão</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Tem certeza de que deseja excluir sua conta? Esta ação não pode ser
                                        desfeita.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="confirmDeleteUserProfile"
                            class="w-full inline-flex justify-center rounded border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                            Sim, excluir
                        </button>
                        <button @click="closeDeleteModal"
                            class="mt-3 w-full inline-flex justify-center rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { toast } from "vue3-toastify";
import { mapGetters, mapActions } from "vuex";
import * as Yup from 'yup';

export const userProfileSchema = Yup.object().shape({
    username: Yup.string()
        .required("Nome de usuário é obrigatório")
        .min(6, "Nome de usuário deve ter pelo menos 6 caracteres"),
});

export default {
    name: "ProfileComponent",
    data() {
        return {
            loading: false,
            showEditModal: false,
            editUserProfile: {
                username: "",
            },
            showDeleteModal: false,
            errors: {}
        };
    },
    computed: {
        ...mapGetters("user", ["userProfile"]),
    },
    methods: {
        ...mapActions("user", [
            "getUserProfile",
            "updateUserProfile",
            "deleteUser",
        ]),
        formatDate(dateString) {
            if (!dateString) {
                return "Data inválida";
            }
            try {
                const date = new Date(dateString);
                if (isNaN(date)) {
                    throw new Error("Data inválida");
                }
                return new Intl.DateTimeFormat("pt-br", {
                    dateStyle: "full",
                    timeStyle: "long",
                    timeZone: "America/Sao_Paulo",
                }).format(date);
            } catch (error) {
                console.error("Erro ao formatar a data: " + error.message);
                return "Data inválida";
            }
        },
        async loadUserProfile() {
            this.loading = true;
            try {
                const userId = JSON.parse(localStorage.getItem("userProfile")).id;
                if (userId) {
                    await this.getUserProfile(userId);
                    this.editUserProfile = { ...this.userProfile };
                } else {
                    console.error("ID do usuário não disponível.");
                    toast.error("ID do usuário não disponível.");
                }
            } catch (error) {
                console.error(
                    "Ocorreu um erro ao obter o perfil do usuário: " +
                    (error.message || error)
                );
                toast.error(
                    "Erro ao obter o perfil do usuário. Por favor, tente novamente mais tarde."
                );
            } finally {
                this.loading = false;
            }
        },
        async updateUser() {
            this.loading = true;
            try {
                if (this.userProfile.id) {
                    await this.updateUserProfile(this.editUserProfile);
                    toast.success("Perfil atualizado com sucesso.");
                    this.showEditModal = false;
                    this.loadUserProfile();
                } else {
                    toast.error("Id não foi encontrado.");
                }
            } catch (error) {
                console.error(
                    "Erro ao atualizar o perfil do usuário: " + (error.message || error)
                );
                toast.error(
                    "Ops, ocorreu um erro ao atualizar o seu perfil. Erro: " + error.message
                );
                this.showEditModal = true;
            } finally {
                this.loading = false;
            }
        },
        async validateAndSubmit() {
            this.errors = {};
            try {
                await userProfileSchema.validate(this.editUserProfile, { abortEarly: false });
                this.updateUser();
            } catch (error) {
                if (error.inner) {
                    error.inner.forEach(e => {
                        this.errors[e.path] = e.message;
                    });
                } else {
                    toast.error("Erro de validação: " + error.message);
                }
            }
        },
        async confirmDeleteUserProfile() {
            this.loading = true;
            try {
                const delete_result = await this.deleteUser();
                if (delete_result.success) {
                    toast.success("Conta excluída com sucesso. Clique aqui pra redicionar para a página login!", {
                        autoClose: false,
                        closeOnClick: true,
                        draggable: true,
                        position: "top-right",
                        pauseOnHover: true,
                        onClose: () => {
                            this.$router.push({
                                name: "LoginView"
                            });
                        },
                    }
                    );
                    this.showDeleteModal = false;
                } else {
                    toast.error("Id do usuário não encontrado para exclusão.");
                }
            } catch (error) {
                console.error(
                    "Erro ao excluir o perfil do usuário: " + (error.message || error)
                );
                toast.error(
                    "Erro ao excluir o perfil do usuário. Verifique se você possui tarefas cadastradas ou tente novamente mais tarde."
                );
            } finally {
                this.loading = false;
            }
        },
        closeModal() {
            this.showEditModal = false;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
    },
    created() {
        this.loadUserProfile();
    },
};
</script>
