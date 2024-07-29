<template>
    <div>
        <ProfileComponent />
    </div>
</template>

<script>
import ProfileComponent from "../components/Profile.vue";

export default {
    name: "UserView",
    components: {
        ProfileComponent
    },
    created() {
        this.$emit("message", true);
    },
}
</script>

<style scoped></style>
