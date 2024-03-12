<template>
    <div id="wrapper">
        <!-- sidebar -->
        <div class="sidebar" :class="{ showOverlay: overlayVisibility }">
            <span class="closeButton" @click="hideOverlay">&times;</span>
            <p class="brand-title"><a href="">Alphayo Blog</a></p>

            <div class="side-links">
                <ul>
                    <li>
                        <router-link @click="hideOverlay" :to="{ name: 'Home' }">Home</router-link>
                    </li>
                    <li>
                        <router-link @click="hideOverlay" :to="{ name: 'Blog' }">Blog</router-link>
                    </li>
                    <li>
                        <router-link @click="hideOverlay" :to="{ name: 'About' }">About</router-link>
                    </li>
                    <li>
                        <router-link @click="hideOverlay" :to="{ name: 'Contact' }">Contact</router-link>
                    </li>
                    <li v-if="!store.isLogedIn">
                        <router-link @click="hideOverlay" :to="{ name: 'Register' }">Register</router-link>
                    </li>
                    <!-- <p>{{ store.isLogedIn }}</p> -->
                    <li v-if="!store.isLogedIn">
                        <router-link @click="hideOverlay" :to="{ name: 'Login' }">Login</router-link>
                    </li>
                    <li v-if="store.isLogedIn && store.user.role.name == 'Saler'">
                        <router-link @click="hideOverlay" :to="{ name: 'Dashboard' }">Dashboard</router-link>
                    </li>
                    <li v-if="store.isLogedIn && store.user.role.name == 'Saler'">
                        <router-link @click="hideOverlay" :to="{ name: 'Chat' }">Chat</router-link>
                    </li>
                    <li v-if="store.isLogedIn">
                        <router-link @click="logoutHandler()" :to="{ name: 'Login' }">Logout</router-link>
                    </li>
                </ul>
            </div>

            <!-- sidebar footer -->
            <footer class="sidebar-footer">
                <div>
                    <a href=""><i class="fab fa-facebook-f"></i></a>
                    <a href=""><i class="fab fa-instagram"></i></a>
                    <a href=""><i class="fab fa-twitter"></i></a>
                </div>
            </footer>
        </div>
        <!-- Menu Button -->
        <div class="menuButton" @click="ShowOverlay">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <!-- main -->
        <main class="container w-full">
            <!-- render components depending on the page visited -->

            <router-view @update-sidebar="updateSidebar" @show-edit-success="showEditSuccess" :editSuccess="editSuccess"
                :key="$route.path"></router-view>
        </main>

        <!-- Main footer -->
    </div>
</template>
<script setup>
import { useStoreData } from '@/stores/store';

const store = useStoreData();
const isloggedIn = store.isLogedIn;
</script>
<script>
import { mapActions, mapState } from 'pinia'
export default {
    data() {
        return {
            overlayVisibility: false,
            loggedIn: false,
            editSuccess: false,
        };
    },
    computed: {
        ...mapActions(useStoreData, { users: 'users' }),
        currentRouteName() {
            return this.$route.name;
        },
    },
    methods: {
        ...mapActions(useStoreData, { logout: 'logout' }),
        logoutHandler() {
            this.logout();
            this.$router.push("/login");
        },
        ShowOverlay() {
            this.overlayVisibility = true;
        },

        hideOverlay() {
            this.overlayVisibility = false;
        },

        updateSidebar() {
            this.loggedIn = !this.loggedIn;
        },

        showEditSuccess() {
            this.editSuccess = true;
        },
    },

    async mounted() {
        await this.users;
    },
};
</script>
<style scoped>
.showOverlay {
    width: 100%;
    z-index: 5;
}
</style>
