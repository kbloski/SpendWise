<template>
    <header>
        <button @click="logOut">LogOut</button>
    </header>
</template>

<script>
import { useStore } from 'vuex';

export default {
    setup(){
        const store = useStore();
        function logOut(){
            store.dispatch('auth/logOut')
        }

        return {
            logOut
        }
    }
}

</script>