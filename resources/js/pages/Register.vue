<template>
    <div id="backend-view">
        <form @submit.prevent="submit" class="form-control">
            <h3>Sign Up Here</h3>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="fields.name" />
            <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>

            <label for="email">Email</label>
            <input type="text" id="email" v-model="fields.email" />
            <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>

            <label for="password">Password</label>
            <input type="password" id="password" v-model="fields.password" />
            <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>

            <label for="password_confirmation">Confirm password</label>
            <input type="password" id="password_confirmation" v-model="fields.password_confirmation" />
            <label for="">Select </label>
            <select class="form-control" v-model="fields.role" v-if="roles != null">
                <option value="">Select</option>
                <option :value="ro['id']" v-for="ro in roles['data']">{{ ro['name'] }}</option>
            </select>
            <button type="submit">Sign Up</button>
            <span>Have an account?<a href=""> Log in</a></span>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useStoreData } from '@/stores/store'
import axios from 'axios';


export default {
    data() {
        return {
            fields: {},
            errors: {},
            roles: null,
        };
    },
    methods: {
        ...mapActions(useStoreData, { register: "register" }),

        submit() {
            this.register(this.fields)
                .then((user) => {
                    this.$router.push({ name: "Dashboard" });
                })
                .catch((err) => console.log("error", err));

        },
    },
    mounted() {
        axios
            .get("roles")
            .then((response) => {
                this.roles = response.data;roles = response.data;
                // console.log("response", response);
                // this.store.postsData.meta.links = response.data.meta.links;
                // this.store.postsData.data = response.data.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
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
    margin-top: 20px;
}

a {
    color: rgba(0, 46, 173, 0.8);
}

.loader {
    text-align: center;
    margin-bottom: 15px;
}
</style>
