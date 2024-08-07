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
        <div class="flex items-center space-x-4">
            <img src="./../assets/todo.png" alt="todo" class="h-40 w-60" />
            <div class="flex flex-col">
                <p class="text-lg font-semibold mb-2">
                    Seja bem-vindo ao seu dashboard {{ userProfile.username }}!
                </p>
                <div class="flex space-x-2 mb-2">
                    <p class="text-base">O que deseja fazer hoje?</p>
                    <p class="text-base" v-if="filterTasks.length === 1">
                        Você possui {{ filterTasks.length }} tarefa cadastrada!
                    </p>
                    <p class="text-base" v-else-if="filterTasks.length > 1">
                        Você possui {{ filterTasks.length }} tarefas
                        cadastradas!
                    </p>
                    <p class="text-base" v-else>
                        Você não possui tarefas cadastradas! Que tal começar
                        agora?
                    </p>
                </div>
            </div>
        </div>

        <!-- Filter by Status -->
        <div class="mb-4">
            <label for="status" class="block mb-2 text-sm font-bold text-gray-700">Filtrar por estado</label>
            <select v-model="filterStatus"
                class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option value="">Todos</option>
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
            </select>

            <!-- Search Input -->
            <label for="search" class="block mb-2 text-sm font-bold text-gray-700">Pesquisar por título e
                descrição</label>
            <div class="relative">
                <input type="search" v-model="search"
                    placeholder="Pesquisar por título e descrição ou selecione uma data abaixo"
                    class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none pl-10 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            </div>
            <label for="date" class="block mb-2 text-sm font-bold text-gray-700">Pesquisar por data</label>
            <div class="mb-4 justify-center flex">
                <input type="date" v-model="search" placeholder="Pesquisar por título e descrição"
                    class="block px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
        </div>

        <!--Filter by order of duedate-->
        <label for="sortOrder" class="block mb-2 text-sm font-bold text-gray-700">Ordenar por data de vencimento</label>
        <select v-model="sortOrder"
            class="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-300 rounded appearance-none focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option value="asc">
                Ascendente (mais antiga para a mais recente)
            </option>
            <option value="desc">
                Descendente (mais recente para a mais antiga) - ordem padrão
            </option>
        </select>

        <!-- Button to Open Modal -->
        <div class="mb-6 flex justify-center">
            <button @click="isOpen = true"
                class="px-6 py-2 text-white bg-blue-600 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-black">
                <i class="fa-solid fa-plus animate-bounce mr-2"></i>Cadastrar tarefa
            </button>
        </div>

        <!-- Task Modal -->
        <div v-show="isOpen" class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-40">
            <div class="max-w-2xl max-h-2xl p-6 bg-white rounded-md shadow-xl">
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
                    <button type="reset"
                        class="px-6 py-2 font-bold text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Limpar dados
                    </button>
                    <button type="button" @click="isOpen = false"
                        class="px-6 py-2 text-black border border-gray-400 hover:bg-gray-300 rounded ml-2">
                        Cancelar
                    </button>
                </form>
            </div>
        </div>

        <!-- Task Cards -->
        <div class="flex items-center justify-center py-1">
            <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
                <div v-for="(task, task_view_idx) in paginatedTasks" :key="task.id"
                    class="max-w-lg overflow-hidden rounded shadow-lg mb-4">
                    <div class="px-8 py-4 bg-white">
                        <h1 class="mb-2 text-xl font-bold">{{ task.title }}</h1>
                        <p class="text-base mb-3">
                            <span :class="{
                                'bg-red-200 text-red-800':
                                    task.status === 'Pendente',
                                'bg-yellow-200 text-yellow-800':
                                    task.status === 'Em andamento',
                                'bg-green-200 text-green-800':
                                    task.status === 'Concluído',
                            }" class="px-2 py-1 rounded-xl flex items-center">
                                <i :class="{
                                    'fas fa-hourglass-start animate-spin mr-2':
                                        task.status === 'Pendente',
                                    'fas fa-spinner fa-spin mr-2':
                                        task.status === 'Em andamento',
                                    'fas fa-check-circle animate-bounce mr-2':
                                        task.status === 'Concluído',
                                }" class="mr-2"></i>
                                {{ task.status }}
                            </span>
                        </p>

                        <p v-if="task.status !== 'Concluído'" class="mb-2">
                            <span
                                class="inline-flex items-center px-4 py-1 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white">
                                <svg class="-ml-1 mr-2 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h1zm0 4h10m-7 4h4" />
                                </svg>
                                <span :class="'text-sm font-semibold'">{{
                                    remainingDays(task.duedate)
                                }}</span>
                            </span>
                        </p>
                        <div class="grid space-x-0">
                            <button @click="showDeleteModal(task.id, task_view_idx)"
                                class="mb-2 px-6 py-2 text-white bg-red-600 rounded shadow hover:bg-red-700">
                                Excluir
                            </button>
                            <button @click="openEditModal(task, task_view_idx)"
                                class="mb-2 px-6 py-2 text-white bg-yellow-600 rounded shadow hover:bg-yellow-700">
                                Editar
                            </button>
                            <router-link :to="`/task/${task.id}`"
                                class="mb-2 px-6 py-2 text-white text-center bg-blue-600 rounded shadow hover:bg-blue-700 no-underline">
                                Detalhes
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="items-center justify-center" v-if="filterTasks.length === 0">
                <span class="text-lg font-bold flex items-center">
                    <i class="fa-solid fa-kiwi-bird animate-pulse mr-2"></i>
                    Não há tarefas cadastradas, você está livre como um pássaro!
                </span>
            </div>
        </div>
        <!-- Pagination Controls -->
        <div class="flex justify-center" v-if="filterTasks.length >= 11">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400">
                Anterior
            </button>
            <button v-for="page in totalPages" @click="goToPage(page)" :key="page" :class="{
                'bg-blue-600 text-white': currentPage === page,
                'bg-gray-300': currentPage !== page,
            }" class="px-4 py-2 mx-1 rounded hover:bg-gray-400">
                {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 mx-1 bg-gray-300 rounded hover:bg-gray-400">
                Próxima
            </button>
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
                    <button type="reset"
                        class="px-6 py-2 font-bold text-white bg-red-800 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Limpar dados
                    </button>
                    <button @click="isEditOpen = false" type="button"
                        class="px-6 py-2 text-black border border-gray-400 hover:bg-gray-300 rounded ml-2">
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
import { toast } from "vue3-toastify";

export default {
    name: "DashboardComponent",
    data() {
        return {
            userProfile: {},
            tasks: [],
            search: "",
            filterStatus: "",
            isOpen: false,
            isEditOpen: false,
            show: false,
            loading: false, // Add loading state
            sortOrder: "desc", // Novo campo para armazenar a ordem de classificação
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
            currentPage: 1,
            tasksPerPage: 10,
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
            let filteredTasks = this.tasks.filter((task) => {
                const matchesSearch =
                    task.title
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) ||
                    task.description
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) ||
                    task.createdAt
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) ||
                    task.duedate
                        .toLowerCase()
                        .includes(this.search.toLowerCase());

                const matchesStatus =
                    this.filterStatus === "" ||
                    task.status === this.filterStatus;

                return matchesSearch && matchesStatus;
            });

            // Ordenar as tarefas com base na data de vencimento
            filteredTasks.sort((a, b) => {
                if (this.sortOrder === "asc") {
                    return new Date(a.duedate) - new Date(b.duedate);
                } else {
                    return new Date(b.duedate) - new Date(a.duedate);
                }
            });

            return filteredTasks;
        },
        paginatedTasks() {
            const start = (this.currentPage - 1) * this.tasksPerPage;
            const end = start + this.tasksPerPage;
            return this.filterTasks.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filterTasks.length / this.tasksPerPage);
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
                    localStorage.getItem("userProfile"),
                );
            } catch (error) {
                toast.error("Ocorreu um erro ao obter tarefas: " + error);
            } finally {
                this.loading = false;
            }
        },
        remainingDays(duedate) {
            const dueDateObj = new Date(duedate);
            const today = new Date();
            const diffTime = dueDateObj - today;

            const diffDays = Math.floor(
                Math.abs(diffTime) / (1000 * 60 * 60 * 24),
            );
            const diffHours = Math.floor(
                (Math.abs(diffTime) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            const diffMinutes = Math.floor(
                (Math.abs(diffTime) % (1000 * 60 * 60)) / (1000 * 60),
            );

            const daysLabel = diffDays === 1 ? "dia" : "dias";
            const hoursLabel = diffHours === 1 ? "hora" : "horas";
            const minutesLabel = diffMinutes === 1 ? "minuto" : "minutos";

            if (diffTime < 0) {
                return `Atrasado por ${diffDays} ${daysLabel}, ${diffHours} ${hoursLabel} e ${diffMinutes} ${minutesLabel}.`;
            } else if (diffDays > 0) {
                return `Faltam ${diffDays} ${daysLabel}, ${diffHours} ${hoursLabel} e ${diffMinutes} ${minutesLabel} para a conclusão.`;
            } else if (diffHours > 0) {
                return `Faltam ${diffHours} ${hoursLabel} e ${diffMinutes} ${minutesLabel} para a conclusão.`;
            } else if (diffMinutes > 0) {
                return `Faltam ${diffMinutes} ${minutesLabel} para a conclusão.`;
            } else {
                return `Agora é o prazo de conclusão.`;
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
                toast.success("Tarefa salva com sucesso!");
                this.tasks = await this.getTasks();
            } catch (error) {
                toast.error("Ocorreu um erro ao salvar tarefa: " + error);
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
                duedate: new Date(this.editTask.duedate).toISOString(),
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
                toast.success("Tarefa atualizada com sucesso!");
                this.tasks = await this.getTasks();
                this.loading = true;
            } catch (error) {
                toast.error("Ocorreu um erro ao atualizar tarefa: " + error);
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
                toast.success("Tarefa excluída com sucesso!");
                this.tasks = await this.getTasks();
            } catch (error) {
                toast.error("Ocorreu um erro ao excluir tarefa: " + error);
            } finally {
                this.loading = false;
                this.showDeleteConfirmModal = false;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
        },
    },
};
</script>

<style scoped>
.container {
    padding: 20px;
}

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
