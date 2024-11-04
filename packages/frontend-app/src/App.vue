<template>
    <sidebar v-if="isAuthorized"></sidebar>
    <router-view></router-view>
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
</style>