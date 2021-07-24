import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { format } from 'date-fns';

const app = createApp(App);

app.config.globalProperties.$format = format;

app.mount('#app');

// app.config.globalProperties.$http = () => {}