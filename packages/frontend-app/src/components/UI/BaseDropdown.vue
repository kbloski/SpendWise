<template>
    <div>
        <button class="btn-success btn-dropdown" @click="toggleVisible"> {{ title ?? "More..." }}</button>
        <div class="dropdown-box" v-if="isVisible">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: ['title'],
    setup(){
        const isVisible = ref(false);
        function toggleVisible(){
            isVisible.value = !isVisible.value;
        }

        return {
            isVisible,
            toggleVisible
        }
    }
}
</script>

<style scoped>
.btn-dropdown {
    background-color: rgb(226, 226, 0);
    border: 2px solid rgb(214, 214, 0);
    box-shadow: 0 0 4px yellow;
    color: black;
}
</style>