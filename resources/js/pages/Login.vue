<template>
    <div id="backend-view">
        <form @submit.prevent="submit" method="post">
            <h3>Login Here</h3>

            <span v-if="errors" class="error">{{ errors[0]}}</span>
            <label for="email">Email</label>
            <input type="text" id="email" v-model="fields.email" class="border" />
            <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>

            <label for="password">Password</label>
            <input type="password" id="password" v-model="fields.password" class="border" />
            <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>

            <button type="submit">Log In</button>
            <span>Don't have an account? <router-link :to="{ name: 'Register' }">Sign up</router-link></span>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'
export default {
    data() {
        return {
            fields: {},
            errors: {},
            error_message: null
        };
    },
    methods: {
        ...mapActions(useStoreData, { login: "login" }),
        submit() {
            this.login(this.fields)
                .then((user) => {
                    this.$router.push({ name: "Home" });
                    this.$emit("updateSidebar");
                })
                .catch((err) => {
                    console.log("error", err)
                    this.errors = err.message;
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
