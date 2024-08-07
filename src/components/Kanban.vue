<template>
    <div class="flex overflow-x-auto p-4 space-x-4">
        <!-- Indicador de carregamento -->
        <div v-if="loading" class="flex items-center justify-center w-full">
            <i class="fas fa-spinner fa-spin h-12 w-12 text-blue-500"></i>
        </div>

        <!-- Kanban Columns -->
        <div v-else class="flex overflow-x-auto space-x-4">
            <div v-for="status in statuses" :key="status" :class="{
                'bg-red-200 text-red-800': status === 'Pendente',
                'bg-yellow-100 border-yellow-300': status === 'Em andamento',
                'bg-green-100 border-green-300': status === 'Concluído',
            }" class="w-full min-w-[250px] border rounded-lg p-4 flex flex-col space-y-4">
                <h2 class="text-lg font-semibold mb-4 flex items-center">
                    <i :class="getStatusIcon(status) + ' mr-2'"></i>
                    {{ status }}
                </h2>
                <div class="flex flex-col space-y-4">
                    <div v-for="task in filteredTasks(status)" :key="task.id"
                        class="bg-white border border-gray-300 rounded-lg p-4 shadow-sm cursor-pointer"
                        @click="goToTaskDetail(task.id)">
                        <h3 class="text-md font-medium text-gray-800">{{ task.title }}</h3>
                        <p class="text-sm text-gray-600">{{ task.description }}</p>
                        <span class="block mt-2 text-xs text-gray-500">
                            Data de conclusão: {{ formatDate(task.duedate) || 'Não definida' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'KanbanComponent',
    data() {
        return {
            statuses: ['Pendente', 'Em andamento', 'Concluído'], // Estados das tarefas
            loading: false, // Variável de estado para carregamento
        };
    },
    computed: {
        ...mapGetters('kanban', ['tasks']),
        filteredTasks() {
            return (status) => {
                return this.tasks.filter(task => task.status === status);
            };
        },
    },
    methods: {
        ...mapActions('kanban', ['getTasks']),
        formatDate(date) {
            if (!date) return '';
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo', // Ajuste o fuso horário conforme necessário
            };
            return new Date(date).toLocaleDateString('pt-BR', options);
        },
        goToTaskDetail(taskId) {
            this.$router.push({ name: 'TaskDetailView', params: { id: taskId } });
        },
        getStatusIcon(status) {
            switch (status) {
                case 'Pendente':
                    return 'fas fa-hourglass-half animate-spin';
                case 'Em andamento':
                    return 'fas fa-spinner fa-spin';
                case 'Concluído':
                    return 'fas fa-check-circle animate-bounce';
                default:
                    return 'fas fa-question-circle';
            }
        },
    },
    async mounted() {
        this.loading = true; // Inicia o carregamento
        await this.getTasks();
        this.loading = false; // Termina o carregamento
    },
};
</script>

<style scoped>
.kanban {
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    padding: 1rem;
}

.kanban-column {
    width: 30%;
    min-width: 250px;
    margin-right: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
}

.kanban-tasks {
    display: flex;
    flex-direction: column;
}

.kanban-task {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-date {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #666;
}

svg {
    margin: auto;
}
</style>
