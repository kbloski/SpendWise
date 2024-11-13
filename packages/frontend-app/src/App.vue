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
  scroll-behavior: smooth;
}

.btn-success {
  background-color: rgb(0, 153, 69);
  box-shadow: 0 0 4px green;
  border: 1px solid green;
  color: white;
  padding: .3rem 1rem;
  border-radius: 0.2rem;
  margin: 0.5rem;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
}

.btn-success:hover {
  background-color: rgb(0, 180, 81);
}
html, body {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  /* background-color: var(--background-color-dark); */
  background: linear-gradient( to left top, rgb(0, 68, 0), black );
  color: white;
}

#app {
  display: flex;
  min-height: 100vh;
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


.card-route-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.card-route-enter-active {
  transition: all 0.3s ease-in;
}
.card-route-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.card-route-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.card-route-leave-active {
  transition: all 0.3s ease-out;
}
.card-route-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


@media screen and (max-width: 800px){
  #app {
    display: block;
  }
}
</style>