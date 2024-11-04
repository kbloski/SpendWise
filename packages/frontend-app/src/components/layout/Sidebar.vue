<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <h2>Hello {{ username }}!</h2>
        <the-navigation></the-navigation>
        <button @click="logOut">Log out</button>
    </div>
</template>

<script>
import { appTitle } from '../../config/config.js';
import TheNavigation from './TheNavigation.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, watch, ref } from 'vue';

export default {
    components: {
        TheNavigation
    },
    setup(props) {
        const router = useRouter()
        const store = useStore();
        const title = appTitle;

        const username = ref('test');
        // watch( username, () => console.log( username.value) )

        async function getUser(){
            const u = await store.getters['auth/getUser'];
            console.log( u )
            username.value = u.username;
        }
        getUser()

        function logOut(){
            store.dispatch('auth/logOut')
            router.push('/auth')
        }

        return {
            title,
            logOut,
            username
        }
    }
}
</script>

<style scoped>
.container {
    width: 20vw;
    height: 100vh;
    padding: 0rem 0 0 2rem;
    padding-top: 2rem;
    position: relative;
}

h1 {
    border-bottom: 2px solid var(--background-color-light);
    margin-bottom: 3rem;
}

button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
}
</style>