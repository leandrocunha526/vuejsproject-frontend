<template>
    <div>
        <TaskDetail />
    </div>
</template>

<script>
import TaskDetail from "../components/TaskDetail.vue";

export default {
    name: "TaskDetailView",
    components: {
        TaskDetail
    },
    created() {
        this.$emit("message", true);
    },
}
</script>

<style scoped></style>
