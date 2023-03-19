<template>
    <div v-if="isLoggedIn">
        <Navbar />
    </div>
    <router-view @message="setLoggedIn" />
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
    name: "App",
    data() {
        return {
            isLoggedIn: false,
        };
    },
    components: {
        Navbar,
    },
    methods: {
        setLoggedIn(login_status) {
            this.isLoggedIn = login_status;
        },
    },
};
</script>

<style scoped></style>
