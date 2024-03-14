import './bootstrap';
import { createApp } from 'vue';
import App from '../js/App.vue'
import '../css/app.css'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';
import { createPinia } from 'pinia'

// import axios from 'axios';
// // Set up axios globally:
// window.axios = axios;
// // Configure the default headers for axios:
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// // Define the base URL for all axios requests:
// // axios.defaults.baseURL = 'http://127.0.0.1:8000';
// // If there's a token in the localStorage, set it as the default Authorization header:
// if (localStorage.getItem('token')) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
// }

// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Remove the token from local storage:
//             localStorage.removeItem('token');
//             // Reset the axios Authorization header:
//             axios.defaults.headers.common['Authorization'] = 'Bearer';
//             // Redirect the user to the login page:
//             router.push({ name: 'login' });
//         }
//         return Promise.reject(error);
//     }
// );






const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
