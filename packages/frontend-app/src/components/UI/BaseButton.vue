<template>
    <button :class="{
        'button-danger' : !!(mode === 'danger')
    }">
        <slot></slot>
    </button>
</template>

<script>
export default { 
    props: ['mode'],
    data(){
    },
    computed: {
        mode(){
            return this.$props.mode ?? 'normal'
        }
    }
}
</script>

<style scoped>
button {
    margin: 0.3rem;
    background-color: #1A1728;
    color: white;
    padding: 1rem;
}

button:hover{
    background-color: #35297c;
}

button:active{
    background-color: #13065a;
}

.button-danger {
    background-color: rgb(83, 0, 0);
    outline: rgb(50, 0, 0);
}

.button-danger:hover {
    background-color: rgb(129, 28, 28);
}

.button-danger:active {
    background-color: rgb(124, 1, 1);
}

</style>