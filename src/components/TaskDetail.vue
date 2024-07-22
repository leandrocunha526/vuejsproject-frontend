<template>
    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-center">
            <svg class="animate-spin h-8 w-8 text-blue-600 mx-auto" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0114.4-4.4L19.4 7.6A8 8 0 104 12z"></path>
            </svg>
            <p class="text-lg text-gray-600 mt-4">Carregando...</p>
        </div>
        <div v-else class="bg-white shadow rounded-lg p-6">
            <h1 class="text-2xl font-extrabold mb-4 text-gray-900">Detalhes da Tarefa de código {{ taskDetail.id }}</h1>
            <h2 class="text-3xl font-semibold mb-4 text-gray-800">{{ taskDetail.title }}</h2>
            <p class="text-lg text-gray-700 mb-4">{{ taskDetail.description }}</p>
            <p class="text-sm text-gray-500 mb-2">Estado:
                <span :class="{
                    'bg-red-200 text-red-800': taskDetail.status === 'Pendente',
                    'bg-yellow-200 text-yellow-800': taskDetail.status === 'Em andamento',
                    'bg-green-200 text-green-800': taskDetail.status === 'Concluído',
                }" class="px-2 py-1 rounded-xl">{{ taskDetail.status }}</span>
            </p>
            <p class="text-sm text-gray-500 mb-2">Prazo até: <span class="font-medium text-gray-700">{{
                formatDate(taskDetail.duedate) }}</span></p>
            <p class="text-sm text-gray-500 mb-2">Criado em: <span class="font-medium text-gray-700">{{
                formatDate(taskDetail.createdAt) }}</span></p>
            <p class="text-sm text-gray-500 mb-4">Atualizado em: <span class="font-medium text-gray-700">{{
                formatDate(taskDetail.updatedAt) }}</span></p>
            <button @click="goBack"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Voltar
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'TaskDetail',
    data() {
        return {
            loading: true,
            task: {}
        };
    },
    computed: {
        ...mapGetters("user", {
            taskDetail: "taskDetail"
        }),
    },
    methods: {
        ...mapActions("user", {
            getTaskById: "getTaskById"
        }),
        formatDate(dateString) {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat("pt-br", {
                dateStyle: "full",
                timeStyle: "long",
                timeZone: "America/Sao_Paulo",
            }).format(date);
        },
        async loadTask() {
            const taskId = this.$route.params.id;
            try {
                await this.getTaskById(taskId);
                console.log("Task detail:", this.taskDetail);
            } catch (error) {
                console.error('Error fetching task:', error);
            } finally {
                this.loading = false;
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    created() {
        this.loadTask();
    },
};
</script>
