<template>
    <div>
        <DashboardComponent />
    </div>
</template>

<script>
import DashboardComponent from "../components/Dashboard.vue";

export default {
    name: "DashboardView",
    components: {
        DashboardComponent
    },
    created() {
        this.$emit("message", true);
    },
}
</script>

<style scoped></style>
