import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@vueform/slider/themes/default.css'


const app = createApp(App)
app.use(createPinia()) // <- esto activa Pinia
app.use(router)
app.mount('#app')
