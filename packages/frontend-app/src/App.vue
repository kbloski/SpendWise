<template>
    <sidebar v-if="isAuthorized"></sidebar>
      <router-view v-slot="slotProps">
        <transition name="change-side" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
</template>

<script>
import Sidebar from './components/layout/Sidebar.vue'

export default {
  components: {
    Sidebar
  },
  computed:{
    isAuthorized(){
      return this.$store.getters['auth/isLoggedIn'];
    }
  },
}
</script>

<style>
:root {
  --background-color-light: #f4f3f7;
  --background-color-dark:#1A1728 ;
}

* {
  box-sizing: border-box;
}

html, body {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: var(--background-color-dark);
  color: white;
}

#app {
  display: flex;
}

/* .change-side-enter-from {
  color: white;
}
.change-side-enter-active {
  transition: all 0.15s ease-in;
}
.change-side-enter-to {
  color: black;
}
.change-side-leave-from {
  color: bla;
}
.change-side-leave-active {
  transition: all 0.15s ease-out;
}
.change-side-leave-to {
  color: white;
} */
</style>