<template>
    <transition name="slide">
        <teleport to="body" v-if="isVisibleModal">
                <div class="backdrop" @click="closeModal">
                    <div class="container" @click="none">
                        <header>
                            <slot name="header"></slot>
                        </header>
                        <div class="container-body">
                            <slot></slot>
                        </div>
                        <button @click="closeModal" class="close-button">Close</button>
                    </div>
                </div>
        </teleport>
    </transition>
</template>

<script>
export default {
    emits: ['close'],
    data(){
        return {
            isVisibleModal: true
        }
    },
    methods: {
        closeModal(){
            this.isVisibleModal = false;
            this.$emit('close')
        },
        openModal(){
            this.isVisibleModal = true;
            this.$emit('open')
        },
        none(event){
            event.stopPropagation()
        }
    }
}
</script>

<style scoped>

.backdrop {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.8);
    z-index: 100;
}

.container {
    background-color: var(--background-color-light);
    color: black;
    border-radius: 1rem;
    box-shadow: inset  0 0 10px black;
    padding: 1rem;
    position: relative;
    min-width: 30vw;
}

.close-button {
    box-shadow: 0 0 4px black;
    background: transparent;
    border: 0;
    border-radius: 1rem;
    cursor: pointer;
    margin: 0;
    margin-left: 100%;
    margin-bottom: 1rem;
    transform: translateX(-100%);
    padding: 0.3rem;

}
.close-button:hover {
    background-color:rgb(255, 178, 194);
}

header {
    border-bottom: 2px solid black;
    box-shadow: inset 0 0 4px black;
    padding: 1rem;
    
    margin-bottom: 1rem;
}

.slide-enter-from{
    opacity: 0;
    scale: 1.2;
}
.slide-enter-active{
    transition: all 0.3s ease;
}
.slide-enter-to{
    opacity: 1;
    scale: 1;
}
.slide-leave-from{
    opacity: 1;
    scale: 1;
}
.slide-leave-active{
    transition: all 0.3s ease;
}
.slide-leave-to{
    opacity: 0;
    scale: 1.2;
}


</style>