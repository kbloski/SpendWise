<template>
    <sidebar v-if="isAuthorized"></sidebar>
      <!-- Authorized -->
      <base-card v-if="isAuthorized" >
        <router-view v-slot="slotProps">
          <transition name="change-side" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </base-card>
      
      <!-- Unauthorize -->
      <div v-else>
        <router-view v-slot="slotProps" >
          <transition name="change-side" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </div>
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
  --background-color-dark:#1f1f1f ;
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
  /* background-color: var(--background-color-dark); */
  background: linear-gradient( to left top, rgb(0, 68, 0), black );
  color: white;
}

#app {
  display: flex;
}

.change-side-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.change-side-enter-active {
  transition: all 0.3s ease-in;
}
.change-side-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.change-side-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.change-side-leave-active {
  transition: all 0.3s ease-out;
}
.change-side-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>