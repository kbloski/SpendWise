import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
const BaseCard = defineAsyncComponent(() => import('./components/UI/BaseCard.vue'))
const BaseLink = defineAsyncComponent(() => import('./components/UI/BaseLink.vue'))
const BaseButton = defineAsyncComponent(() => import('./components/UI/BaseButton.vue'))


const app = createApp(App)

app.component('base-card', BaseCard);
app.component('base-link', BaseLink);
app.component('base-button', BaseButton);

app.use( store )
app.use( router )
app.mount('#app')
