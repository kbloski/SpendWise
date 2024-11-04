<template>
    <the-header v-if="isAuthorized"></the-header>
    <router-view></router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  data(){
    return {
      isAuthorized : false
    }
  },
  computed:{
    isAuthorized(){
      return this.$store.getters['auth/isLoggedIn'];
    }
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

html, body {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

}
</style>