<template>
    <div class="container mx-auto">
        <!-- Loading Indicator -->
        <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
            <svg class="animate-spin h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.4-4.4L19.4 7.6A8 8 0 104 12z"></path>
            </svg>
        </div>

        <!-- Content -->
        <img src="./../assets/todo.png" alt="todo" class="h-40 w-60 mb-4" />
        <p class="text-lg font-semibold">
            Seja bem-vindo ao seu dashboard {{ userProfile.username }}!
        </p>
        <p class="text-md mb-4">O que deseja fazer hoje?</p>

        <!-- Search Input -->
        <div class="mb-4">
            <input type="search" v-model="search" placeholder="Pesquisar por título e descrição"
                class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        </div>

        <!-- Success Message -->
        <div v-if="message" v-show="show"
            class="relative px-4 py-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
            <span class="block sm:inline">{{ message }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="w-6 h-6 text-red-500 fill-current cursor-pointer" role="button"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="show = false">
                    <title>Fechar</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" v-show="show"
            class="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            <span class="block sm:inline">{{ errorMessage }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="w-6 h-6 text-red-500 fill-current cursor-pointer" role="button"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="show = false">
                    <title>Fechar</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>

        <!-- Button to Open Modal -->
        <div class="mb-6 flex justify-center">
            <button @click="isOpen = true"
                class="px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Cadastrar tarefa
            </button>
        </div>

        <!-- Task Modal -->
        <div v-show="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
            <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
                <div class="flex items-center justify-between">
                    <h3 class="text-2xl">Cadastrar tarefa</h3>
                    <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <form @submit.prevent="addTask" class="px-8 pt-3 pb-1 mb-4">
                    <div class="mb-6">
                        <label for="title" class="block mb-2 text-sm font-bold text-gray-700">Título</label>
                        <input id="title" required v-model="task.title" type="text" placeholder="Título"
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div class="mb-6">
                        <label for="description" class="block mb-2 text-sm font-bold text-gray-700">Descrição</label>
                        <textarea id="description" rows="5" v-model="task.description" required
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                    </div>
                    <div class="mb-6">
                        <label for="status" class="block mb-2 text-sm font-bold text-gray-700">Estado</label>
                        <select id="status" v-model="task.status" required
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Selecione um estado</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="duedate" class="block mb-2 text-sm font-bold text-gray-700">Data de
                            vencimento</label>
                        <input id="duedate" required v-model="task.duedate" type="datetime-local"
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <button type="submit"
                        class="px-6 py-2 font-bold text-white bg-blue-800 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Salvar
                    </button>
                    <button type="button" @click="isOpen = false"
                        class="px-6 py-2 text-red-800 border border-red-600 rounded ml-2">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>

        <!-- Task Cards -->
        <div class="flex items-center justify-center py-5">
            <div class="w-full max-w-fit">
                <div v-for="(task, task_view_idx) in filterTasks" :key="task.id"
                    class="max-w-lg overflow-hidden rounded shadow-lg mb-4">
                    <div class="px-8 py-4 bg-white">
                        <h1 class="mb-2 text-xl font-bold">{{ task.title }}</h1>
                        <p class="text-base mb-3">
                            Estado:
                            <span :class="{
                                'bg-red-200 text-red-800':
                                    task.status === 'Pendente',
                                'bg-yellow-200 text-yellow-800':
                                    task.status === 'Em andamento',
                                'bg-green-200 text-green-800':
                                    task.status === 'Concluído',
                            }" class="px-2 py-1 rounded-xl">{{ task.status }}</span>
                        </p>
                        <div class="space-x-2">
                            <button @click="showDeleteModal(task.id, task_view_idx)"
                                class="mb-2 px-6 py-2 text-white bg-red-600 rounded shadow hover:bg-red-700">
                                Excluir
                            </button>
                            <button @click="openEditModal(task, task_view_idx)"
                                class="mb-2 px-6 py-2 text-white bg-yellow-600 rounded shadow hover:bg-yellow-700">
                                Editar
                            </button>
                            <router-link :to="`/task/${task.id}`"
                                class="mb-2 px-6 py-2 text-white bg-blue-600 rounded shadow hover:bg-blue-700 no-underline">
                                Detalhes
                            </router-link>
                        </div>
                    </div>
                </div>
                <div v-if="filterTasks.length === 0">
                    <h3 class="text-lg font-bold">
                        Não há tarefas cadastradas, você está livre como um
                        pássaro!
                    </h3>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteConfirmModal"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-xl font-bold mb-4">Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir esta tarefa?</p>
                <div class="flex justify-end mt-4">
                    <button @click="confirmDeleteTask"
                        class="px-4 py-2 mr-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Sim
                    </button>
                    <button @click="showDeleteConfirmModal = false"
                        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Não
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Task Modal -->
        <div v-show="isEditOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
            <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
                <div class="flex items-center justify-between">
                    <h3 class="text-2xl">Editar tarefa</h3>
                    <svg @click="isEditOpen = false" xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <form @submit.prevent="updateTask" class="px-8 pt-3 pb-1 mb-4">
                    <div class="mb-6">
                        <label for="editTitle" class="block mb-2 text-sm font-bold text-gray-700">Título</label>
                        <input id="editTitle" required v-model="editTask.title" type="text" placeholder="Título"
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div class="mb-6">
                        <label for="editDescription"
                            class="block mb-2 text-sm font-bold text-gray-700">Descrição</label>
                        <textarea id="editDescription" rows="5" v-model="editTask.description" required
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                    </div>
                    <div class="mb-6">
                        <label for="editStatus" class="block mb-2 text-sm font-bold text-gray-700">Estado</label>
                        <select id="editStatus" v-model="editTask.status" required
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option value="">Selecione um estado</option>
                            <option value="Pendente">Pendente</option>
                            <option value="Em andamento">Em andamento</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </div>
                    <div class="mb-6">
                        <label for="editDueDate" class="block mb-2 text-sm font-bold text-gray-700">Data de
                            vencimento</label>
                        <input id="editDueDate" required v-model="editTask.duedate" type="datetime-local"
                            class="block w-full px-4 py-3 mb-3 text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <button type="submit"
                        class="px-6 py-2 font-bold text-white bg-blue-800 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Salvar
                    </button>
                    <button @click="isEditOpen = false" type="button"
                        class="px-6 py-2 text-red-800 border border-red-600 rounded ml-2">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { format } from "date-fns";

export default {
    name: "DashboardComponent",
    data() {
        return {
            userProfile: {},
            tasks: [],
            search: "",
            isOpen: false,
            isEditOpen: false,
            show: false,
            loading: false, // Add loading state
            message: "",
            errorMessage: "",
            task: {
                title: "",
                description: "",
                status: "",
                duedate: "",
            },
            editTask: {
                id: "",
                title: "",
                description: "",
                status: "",
                duedate: "",
            },
            showDeleteConfirmModal: false,
            taskToDeleteId: null,
            taskToDeleteIndex: null,
        };
    },
    created() {
        this.loadTasks();
    },
    computed: {
        ...mapGetters("user", {
            getUserProfile: "userProfile",
            _tasks: "tasks",
        }),
        filterTasks() {
            return this.tasks.filter(
                (task) =>
                    task.title
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) ||
                    task.description
                        .toLowerCase()
                        .includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        ...mapActions("user", {
            getTasks: "getTasks",
            deleteTask: "deleteTask",
            createTask: "createTask",
            updateTaskAction: "updateTask",
        }),
        async loadTasks() {
            this.loading = true;
            try {
                this.tasks = await this.getTasks();
                this.userProfile = JSON.parse(
                    localStorage.getItem("userProfile")
                );
            } catch (error) {
                this.errorMessage = "Erro ao carregar tarefas: " + error;
                this.show = true;
            } finally {
                this.loading = false;
            }
        },
        async addTask(e) {
            e.preventDefault();
            this.loading = true;
            const new_task = {
                title: this.task.title,
                description: this.task.description,
                status: this.task.status,
                duedate: this.task.duedate,
            };
            try {
                await this.createTask(new_task);
                this.message = "Salvo com sucesso!";
                this.show = true;
                this.tasks = await this.getTasks();
            } catch (error) {
                this.errorMessage = "Erro ao salvar a tarefa: " + error;
                this.show = true;
            } finally {
                this.loading = false;
                this.isOpen = false;
            }
        },
        openEditModal(task, taskIndex) {
            this.editTask = {
                ...task,
                index: taskIndex,
                duedate: task.duedate
                    ? format(new Date(task.duedate), "yyyy-MM-dd'T'HH:mm")
                    : "",
            };
            this.isEditOpen = true;
        },
        async updateTask(e) {
            e.preventDefault();
            const updated_task = {
                id: this.editTask.id,
                title: this.editTask.title,
                description: this.editTask.description,
                status: this.editTask.status,
                duedate: this.editTask.duedate,
            };
            try {
                await this.updateTaskAction([
                    this.editTask.id,
                    this.editTask.index,
                    updated_task.title,
                    updated_task.description,
                    updated_task.status,
                    updated_task.duedate,
                ]);
                this.message = "Atualizado com sucesso!";
                this.show = true;
                this.tasks = await this.getTasks();
                this.loading = true;
            } catch (error) {
                this.errorMessage = "Erro ao atualizar a tarefa: " + error;
                this.show = true;
            } finally {
                this.loading = false;
                this.isEditOpen = false;
            }
        },
        showDeleteModal(taskId, taskIndex) {
            this.taskToDeleteId = taskId;
            this.taskToDeleteIndex = taskIndex;
            this.showDeleteConfirmModal = true;
        },
        async confirmDeleteTask() {
            this.loading = true;
            try {
                await this.deleteTask([
                    this.taskToDeleteId,
                    this.taskToDeleteIndex,
                ]);
                this.message = "Deletado com sucesso!";
                this.show = true;
                this.tasks = await this.getTasks();
            } catch (error) {
                this.errorMessage = "Erro ao excluir a tarefa: " + error;
                this.show = true;
            } finally {
                this.loading = false;
                this.showDeleteConfirmModal = false;
            }
        },
    },
};
</script>

<style scoped>
/* Add styles for the loading spinner */
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
