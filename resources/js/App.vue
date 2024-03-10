<template>
  <div id="wrapper">
    <!-- sidebar -->
    <div class="sidebar" :class="{ showOverlay: overlayVisibility }">
      <span class="closeButton" @click="hideOverlay">&times;</span>
      <p class="brand-title"><a href="">Alphayo Blog</a></p>

      <div class="side-links">
        <ul>
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'Blog' }"
              >Blog</router-link
            >
          </li>
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'About' }"
              >About</router-link
            >
          </li>
          <li>
            <router-link @click="hideOverlay" :to="{ name: 'Contact' }"
              >Contact</router-link
            >
          </li>
          <li v-if="!loggedIn">
            <router-link @click="hideOverlay" :to="{ name: 'Register' }"
              >Register</router-link
            >
          </li>
          <li v-if="!loggedIn">
            <router-link @click="hideOverlay" :to="{ name: 'Login' }"
              >Login</router-link
            >
          </li>
          <li v-if="loggedIn">
            <router-link @click="hideOverlay" :to="{ name: 'Dashboard' }">Dashboard</router-link>
          </li>
          <li v-if="loggedIn">
            <router-link @click="hideOverlay" :to="{ name: 'Chat' }">Chat</router-link>
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

      <router-view
        @update-sidebar="updateSidebar"
        @show-edit-success="showEditSuccess"
        :editSuccess="editSuccess"
        :key="$route.path"
      ></router-view>
    </main>

    <!-- Main footer -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'
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
