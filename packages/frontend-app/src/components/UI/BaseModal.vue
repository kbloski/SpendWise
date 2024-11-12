<template>
    <transition name="slide">
        <teleport to="body" v-if="isVisibleModal">
                <div class="backdrop" @click="closeModal">
                    <div class="container" @click="none">
                        <header v-if="$slots.header">
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
    props: ['visible'],
    emits: ['close', 'open'],
    data(){
        return {
            isVisibleModal : true
        }
    },
    beforeMount(){
        this.isVisibleModal = this.$props.visible ?? true
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
    height: 110vh;
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
    max-width: 90vw;
}

.close-button {
    position: absolute;
    width: auto;
    right: 1rem;
    bottom: 5px;
    box-shadow: 0 0 4px black;
    background: transparent;
    border: 0;
    border-radius: 1rem;
    cursor: pointer;
    margin: 0;
    margin-bottom: 1rem;
    padding: 0.3rem;
    z-index: 100;


}
.close-button:hover {
    background-color:rgba(255, 0, 0, 0.719);
}

header {
    box-shadow: inset 0 0 4px rgb(0, 0, 0);
    border-radius: 1rem 1rem 0 0;
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