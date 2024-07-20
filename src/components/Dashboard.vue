<template>
    <div class="container mx-auto">
        <img src="./../assets/todo.png" alt="todo" class="h-40 w-60" />
        <p>Seja bem vindo ao seu dashboard {{ userProfile.username }}!</p>
        <p>O que deseja fazer hoje?</p>
        <div>
            <input type="search" v-model="search" placeholder="Pesquisar por título e descrição"
                class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline" />
        </div>
        <div class="relative px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded" role="alert"
            v-if="message" v-show="show">
            <span class="block sm:inline">{{ message }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="w-6 h-6 text-red-500 fill-current" role="button" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" @click="show = false">
                    <title>Fechar</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>
        <div class="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert"
            v-if="errorMessage" v-show="show">
            <span class="block sm:inline">{{ errorMessage }}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg class="w-6 h-6 text-red-500 fill-current" role="button" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" @click="show = false">
                    <title>Fechar</title>
                    <path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
            </span>
        </div>
        <div class="flex justify-center">
            <button @click="isOpen = true" class="px-6 py-2 text-white bg-blue-600 rounded shadow" type="button">
                Cadastrar tarefa
            </button>
            <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
                    <div class="flex items-center justify-between">
                        <h3 class="text-2xl">Cadastrar tarefas</h3>
                        <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg"
                            class="w-8 h-8 text-red-900 cursor-pointer" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="mt-4">
                        <form class="px-8 pt-6 pb-8 mb-4" @submit.prevent>
                            <div class="flex items-center justify-center"></div>
                            <div class="mb-4 title-input">
                                <label for="username" class="block mb-2 text-sm font-bold text-gray-700">
                                    Título</label>
                                <input id="title" required
                                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline"
                                    type="text" placeholder="Título" name="title" v-model="task.title" />
                            </div>

                            <div class="mb-6 description-input">
                                <label for="password"
                                    class="block mb-2 text-sm font-bold text-gray-700">Descrição</label>

                                <textarea required
                                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline"
                                    id="description" rows="5" cols="33" name="description" v-model="task.description">
                                </textarea>
                            </div>
                            <div class="mb-6 status-input">
                                <label for="status" class="block mb-2 text-sm font-bold text-gray-700">Estado</label>
                                <select id="status" name="status" required v-model="task.status"
                                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:bg-white focus:shadow-outline">
                                    <option value="">
                                        Selecione um estado
                                    </option>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em andamento">
                                        Em andamento
                                    </option>
                                    <option value="Concluído">Concluído</option>
                                </select>
                            </div>
                            <button
                                class="px-6 py-2 font-bold text-white bg-blue-800 rounded hover:bg-black focus:outline-none focus:shadow-outline"
                                type="submit" @click="addTask">
                                Salvar
                            </button>
                            <button @click="isOpen = false"
                                class="px-6 py-2 text-red-800 border border-red-600 rounded">
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex items-center justify-center py-5">
        <div class="w-full max-w-fit">
            <div class="max-w-lg overflow-hidden rounded shadow-lg" v-for="(task, task_view_idx) in filterTasks"
                :key="task.id">
                <div class="px-8 py-4">
                    <div class="mb-2 text-xl font-bold">
                        {{ task.title }}
                    </div>
                    <p class="text-base">
                        Estado: <span :class="{
                            'bg-red-200 text-red-800': task.status === 'Pendente',
                            'bg-yellow-200 text-yellow-800': task.status === 'Em andamento',
                            'bg-green-200 text-green-800': task.status === 'Concluído',
                        }" class="px-2 py-1 rounded-xl">{{ task.status }}</span>
                    </p>
                    <p class="text-base text-gray-700">
                        {{ task.description }}
                    </p>
                    <p class="text-base text-gray-700">
                        Criado em {{ formatDate(task.createdAt) }}
                    </p>
                    <button @click="showDeleteModal(task.id, task_view_idx)"
                        class="px-6 py-2 text-white bg-red-600 rounded shadow">
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir esta tarefa?</p>
            <div class="flex justify-end mt-4">
                <button @click="confirmDeleteTask" class="px-4 py-2 mr-2 bg-red-600 text-white rounded">Sim</button>
                <button @click="showDeleteConfirmModal = false" class="px-4 py-2 bg-gray-300 rounded">Não</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "DashboardComponent",
    data() {
        return {
            userProfile: {},
            tasks: [],
            search: "",
            isOpen: false,
            show: true,
            message: "",
            errorMessage: "",
            task: {
                title: "",
                description: "",
                status: "",
            },
            showDeleteConfirmModal: false,
            taskToDeleteId: null,
            taskToDeleteIndex: null,
        };
    },
    created() {
        this.getTasks();
    },
    computed: {
        ...mapGetters("user", {
            getUserProfile: "userProfile",
            _tasks: "tasks",
        }),
        filterTasks() {
            let tasks = [];
            tasks = this.tasks.filter((task) => {
                return (
                    task.title.toLowerCase().match(this.search.toLowerCase()) ||
                    task.description.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                );
            });
            return tasks;
        },
    },
    methods: {
        ...mapActions("user", {
            getTasks: "getTasks",
            deleteTask: "deleteTask",
            createTask: "createTask",
        }),
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat("pt-br", {
                dateStyle: "full",
                timeStyle: "long",
                timeZone: "America/Sao_Paulo",
            }).format(date);
        },
        async addTask(e) {
            e.preventDefault();
            const new_task = {
                title: this.task.title,
                description: this.task.description,
                status: this.task.status,
            };
            try {
                await this.createTask(new_task);
                this.message = "Salvo com sucesso!";
                this.show = true;
                this.tasks = this._tasks;
                this.isOpen = false;
            } catch (error) {
                this.errorMessage =
                    "Ocorreu um erro ao salvar a tarefa. Descrição: " + error;
                this.show = true;
                this.isOpen = false;
                console.log(error);
            }
        },
        showDeleteModal(taskId, taskIndex) {
            this.taskToDeleteId = taskId;
            this.taskToDeleteIndex = taskIndex;
            this.showDeleteConfirmModal = true;
        },
        async confirmDeleteTask() {
            try {
                await this.deleteTask([this.taskToDeleteId, this.taskToDeleteIndex]);
                this.message = "Deletado com sucesso!";
                this.show = true;
                this.tasks = await this.getTasks();
                this.showDeleteConfirmModal = false;
            } catch (error) {
                this.errorMessage = "Houve um erro ao excluir. Veja: " + error;
                this.show = true;
                console.log(error);
            }
        },
    },
    async mounted() {
        this.userProfile = JSON.parse(localStorage.getItem("userProfile"));
        this.tasks = await this.getTasks();
    },
};
</script>
