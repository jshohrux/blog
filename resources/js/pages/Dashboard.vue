<template>
  <div id="backend-view">
    <div class="logout"><a href="#" @click="logoutHandler">Log out</a></div>
    <h1 class="heading">Dashboard</h1>
    <span>Hi {{ user.name }}!</span>
    <div class="links">
      <ul>
        <li>
          <router-link :to="{ user: 'CreatePosts' }">Create Posts</router-link>
        </li>
        <li>
          <router-link :to="{ user: 'DashboardPostsList' }"
            >Posts List</router-link
          >
        </li>
        <li>
          <router-link :to="{ user: 'CreateCategories' }"
            >Create Categories</router-link
          >
        </li>
        <li>
          <router-link :to="{ user: 'CategoriesList' }"
            >Categories List</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'
export default {

  data() {
    return {
      user: "",
    };
  },
  mounted() {

  },

  methods: {
    ...mapActions(useStoreData, { logout: 'logout'}),
    logoutHandler() {
        this.logout();
        this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* dashboard */
#backend-view {
  text-align: center;
  background-color: #f3f4f6;
  height: 100vh;
  padding-top: 15vh;
}

.logout {
  position: absolute;
  top: 30px;
  right: 40px;
}
.heading {
  margin-bottom: 5px;
}
.links {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background: #ffffff;
  max-width: 500px;
  padding: 15px;
  border-radius: 15px;
}
.links ul {
  list-style: none;
}
.links a {
  all: revert;
  font-size: 26px;
  display: inline-block;
  margin: 10px 0;
}
</style>
