<template>
    <div class="container">
        <auth-form :register="!!register"></auth-form>
        <span :class="{
                'second-background':true,
                register: !!register
            }"></span>
    </div>
</template>

<script>
import AuthForm from '../components/forms/AuthForm.vue';
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

export default {
    components: {
        AuthForm
    },
    setup(){
        const route = useRoute();
        const register = computed(()=>{
            return route.query?.register
        });

        return {
            register
        }
    }
}
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
      background: linear-gradient(to right top, #000000, #1d1d1d 60%, #000000);
}

.second-background {
    position: absolute;
    background: linear-gradient(to right , #004147 , #00C9D9 40% );
    border-left: 2px solid #00C9D9;
    z-index: 1;
    width: 100%;
    height: 100%;
    right: -60%;
    top: 0;
    transform: skewX(40deg);
} 

.register.second-background {
    position: absolute;
    background: linear-gradient(to right , #004147 , #00d936 40% );
    border-left: 2px solid #00d936;
    z-index: 1;
    width: 100%;
    height: 100%;
    right: -60%;
    top: 0;
    transform: skewX(40deg);
}

</style>