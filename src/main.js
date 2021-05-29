import {createApp} from 'vue'
import App from './App.vue'
import {router} from "./router";
import {store} from "./store";
import './theme.css';

import AppLoader from "./components/AppLoader.vue";

const app = createApp(App)

app
  .use(router)
  .use(store)
  .mount('#app')

app.component('app-loader', AppLoader)


