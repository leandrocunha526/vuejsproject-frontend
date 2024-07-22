<template>
    <div>
        <KanbanComponent />
    </div>
</template>

<script>
import KanbanComponent from "../components/Kanban.vue";

export default {
    name: "KanbanView",
    components: {
        KanbanComponent
    },
    created() {
        this.$emit("message", true);
    },
}
</script>

<style scoped></style>
