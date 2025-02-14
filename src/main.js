import './assets/main.css'
import {createApp, markRaw} from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import createPersistedState from 'pinia-plugin-persistedstate'
import Swal from 'sweetalert2/dist/sweetalert2.js';

const app = createApp(App)
const pinia = createPinia()
pinia.use(({store}) =>{
    store.router = markRaw(router)
})
pinia.use(createPersistedState)

app.use(router)
app.use(pinia);

app.mount('#app')



