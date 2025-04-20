import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')


// console.log("Starting Vue app...")

// createApp(App).use(router).mount('#app')