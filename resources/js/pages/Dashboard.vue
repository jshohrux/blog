<template>
  <div id="backend-view">
    <div class="logout"><a href="#" @click="logout">Log out</a></div>
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
export default {
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    axios
      .get("/api/me",{
          headers: {
              Authorization: "Bearer " + localStorage.getItem('token'),
              Accept: 'application/json'
          },
      })
      .then((response) => {(this.user = response.data.user)
            console.log(response.data.user)
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.$emit("updateSidebar");
          localStorage.removeItem("authenticated");
          this.$router.push({ user: "Login" });
        }
      });
  },

  methods: {
    logout() {
      axios
        .post("/api/v1/auth/logout")
        .then((response) => {
          this.$router.push({ name: "Home" });
          localStorage.removeItem("authenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
          this.$emit("updateSidebar");
        })
        .catch((error) => console.log(error));
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
