import './bootstrap';
import { createApp } from 'vue';
import App from '../js/App.vue'
import '../css/app.css'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

createApp(App)
    .use(router,BootstrapVue)
    .mount('#app')
