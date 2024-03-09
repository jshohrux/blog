<template>
  <div id="backend-view">
    <form @submit.prevent="submit">
      <h3>Login Here</h3>
        <span v-if="errors" class="error">{{ errors[0] }}</span>
      <label for="email">Email</label>
      <input type="text" id="email" v-model="fields.email" />
      <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>

      <label for="password">Password</label>
      <input type="password" id="password" v-model="fields.password" />
      <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>

      <button type="submit">Log In</button>
      <span>Don't have an account? <a href="">Sign up</a></span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: {},
      errors: {},
        error_message: null
    };
  },
  methods: {
    submit() {
      const response = axios.post("/api/v1/auth/login", this.fields)
        .then((response ) => {
            this.$router.push({ name: "Dashboard" });
            console.log(response)
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem('user',jsonStingfy(response.data.user))
            this.$emit("updateSidebar");
        })
        .catch((error) => {
          this.errors = error.response.data.message;
          console.log(this.errors);
        });
    },
  },
};
</script>

<style scoped>
#backend-view {
  height: 100vh;
  background-color: #f3f4f6;
  display: grid;
  align-items: center;
}
form {
  width: 400px;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 50px 35px;
}
form * {
  letter-spacing: 0.5px;
  outline: none;
}

label {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 16px;
  font-weight: 300;
}

button {
  margin-top: 50px;
  width: 100%;
  background-color: rgba(0, 46, 173, 0.7);
  color: #ffffff;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
form span {
  display: block;
  margin-top: 35px;
}
a {
  color: rgba(0, 46, 173, 0.8);
}
</style>
