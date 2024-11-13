<template>
    <div class="container-authpage">
        <span :class="background"></span>
        
        <div class="content-side">
            <div class="form-auth">
                <auth-form :register="!!register"></auth-form>
            </div>
            <div class="info-start">
                <h1 v-if="!register">WELCOME <br/> BACK!</h1>
                <h1 v-if="register"> NICE TO MEET YOU!</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
        </div>
    </div>
</template>

<script>
import AuthForm from '../components/forms/AuthForm.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
    components: {
        AuthForm
    },
    setup(){
        const route = useRoute();
        const register = computed(()=>{
            return route.query?.register
        });
        const background = computed( () => {
            return {
                    'second-background': true,
                    register: !!register.value
            }
        }
        )

        return {
            register,
            background
        }
    }
}
</script>

<style scoped>
.container-authpage {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background: linear-gradient(to right top, #000000, var(--background-color-dark) 60%, #000000);
}

.second-background {
    position: absolute;
    background: linear-gradient(to right , #004147 , #00C9D9 40% );
    border-left: 2px solid #00C9D9;
    border-right: 2px solid #00C9D9;
    z-index: 0;
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
    border-right: 2px solid #00d936;
    z-index: 0;
    width: 100%;
    height: 100%;
    right: -60%;
    top: 0;
    transform: skewX(40deg);
}


.info-start, .content-side { 
    z-index: 1;
}

.content-side {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    position: relative;
}

.form-auth {
    max-width: 250px
}

.info-start {
    /* transform: translateX(100%); */
    position: absolute;
    max-width: 250px;
    right: 0;
    
}

.info-start > p {
    text-wrap: wrap;
}

@media screen and (min-width: 0px) and (max-width: 425px) {
    .info-start{
        display: none;
    }
}

@media screen and (max-width: 780px){
    .content-side {
        justify-content: space-evenly;
    }

    .info-start {
        position: inherit;
        margin-left: 20px;
    }
}
 
        /* 
@media screen and (max-width: 780px){
    .info-start {
        transform: translateX(0);
        margin-left: 3rem;
    }
} */

</style>