<template>
    <div v-if="isMobile" class="mobile-show-sidebar">
        <h2 class="mobile-sidebar-title">{{ title }}</h2>
        <button @click="openSidebar" class="btn-open-sidebar"> ☰ </button>
    </div>

    <transition name="sidebar-visible" mode="out-in">
        <div class="sidebar-container" v-if="isVisible">
            <h1 class="sidebar-title">{{ title }}</h1>
            <h2>Hello {{ user.username }}!</h2>
            <the-navigation></the-navigation>

            <button @click="logOut" class="sidebar-logout">Log out</button>
            <button v-if="isMobile" @click="closeSidebar" class="btn-close-sidebar">Close</button>
        </div>
    </transition>
</template>

<script>
import { appTitle } from '../../config/config.js';
import TheNavigation from './TheNavigation.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { watch,  computed, ref } from 'vue';
import useFetch from '../../hooks/useFetch.js';

export default {
    components: {
        TheNavigation
    },
    setup(props) {
        const sidebar = ref()
        const router = useRouter()
        const store = useStore();
        const title = appTitle;
        const fetchUser = useFetch("/api/users/me")
        const user = computed( () => fetchUser?.data?.value?.user ?? 'unknown' )
        
        const mobileMaxWidth = 800;
        const widthWindow = ref( screen.width )
        const isMobile = computed( () =>  widthWindow.value < mobileMaxWidth)
        const isVisible = ref( isMobile.value ? false : true)


        window.addEventListener('resize', () => {
            widthWindow.value = window.innerWidth;
            if (widthWindow.value > mobileMaxWidth) isVisible.value = true 
        })

        const refreshUserNeeded = computed( () => store.getters['refresh/isRefreshUserNeeded']);
        watch( refreshUserNeeded, ()=>{
            if (!refreshUserNeeded.value) return;
            fetchUser.refetch()
        })

        function logOut(){
            store.dispatch('auth/logOut')
            router.push('/auth')
        }

        function closeSidebar(){
            isVisible.value = false
        }
        
        function openSidebar(){
            isVisible.value = true
        }

        return {
            sidebar,
            title,
            logOut,
            user,
            isMobile,
            isVisible,
            closeSidebar,
            openSidebar
        }
    }
}
</script>

<style scoped>
.mobile-show-sidebar {
    display: flex;
    justify-content: space-between;
    align-items: last baseline;
    padding: 1rem;
    height: 10vh;
}

.mobile-sidebar-title {
    margin: 0;
    padding: 0;
}

.btn-open-sidebar {
    background-color: transparent;
    color: white;
    padding: .5rem 1.5rem;
    font-weight: bolder;
    font-size: 16px;
    
}

.btn-close-sidebar {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 1rem;
    padding: .5rem 1rem;
    border-radius: .5rem;
}


.sidebar-container {
    height: 100vh;
    padding: 0rem 0 0 2rem;
    padding-top: 2rem;
    position: relative;
    margin: 0;
    /* transition: all 3s ease; */
}

.sidebar-title {
    border-bottom: 2px solid var(--background-color-light);
}

.sidebar-logout {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
    background-color: rgba(255, 0, 0, 0.4);
    color: white;
}

.sidebar-visible-enter-from {
    transform: translateY(-100%);
}
.sidebar-visible-enter-active {
    transition: all 0.3s ease-in;
}
.sidebar-visible-enter-to {
    transform: translateY(0);
}
.sidebar-visible-leave-from {
    transform: translateY(0);
}
.sidebar-visible-leave-active {
    transition: all 0.3s ease-out;
}
.sidebar-visible-leave-to {
    transform: translateY(-100%);
}

@media screen and (max-width: 800px) {
    .sidebar-container {
        position: fixed;
        background-color: var(--background-color-dark);
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
    }

}

@media screen and (min-width: 800px) {
    .sidebar-container {
        width: 20vw;
    }
}
</style>